import { LocalDateTime } from "@js-joda/core";
import axios from "axios";
import { IsNull, UpdateResult } from "typeorm";
import { config } from "../config/app-config";
import { Customer, Voucher } from "../entities";
import { Errors, PhotoValidityResponseData } from "../types";

export class AIChatService {
	public constructor() { }

	public async getEligibility(customer_id: string): Promise<boolean> {
		const eligibleTransactions = await Customer.createQueryBuilder("cust")
			.select("SUM(purchaseTxns.total_spent)", "sum")
			.addSelect("COUNT(*)", "count")
			.innerJoin("cust.purchaseTransactions", "purchaseTxns")
			.where("cust.id = :customer_id", { customer_id })
			.andWhere("purchaseTxns.transaction_at >= DATE_SUB(CURDATE(), INTERVAL 29 DAY)")
			.groupBy("cust.id")
			.getRawOne();

		if (!(eligibleTransactions?.sum >= 100 && eligibleTransactions?.count >= 3)) {
			return false;
		}

		const ownVoucher = await Voucher.findOne({ where: { customer_id } });

		if (ownVoucher?.is_allocated) {
			throw Errors.VoucherTaken;
		}
		if (!ownVoucher) {
			const lockResult = await this.tryLockOneVoucher(customer_id);
			return !!lockResult.affected;
		}

		const updateOwnVoucherResult = await Voucher.update(
			{ customer_id: BigInt(customer_id) },
			{ locked_at: LocalDateTime.now() }
		);

		let lockResult: UpdateResult;

		// If fail to update due to voucher chopped by someone else
		if (!updateOwnVoucherResult.affected) {
			lockResult = await this.tryLockOneVoucher(customer_id);
		}

		return !!updateOwnVoucherResult.affected || !!lockResult.affected;
	}

	public async submitPhoto(customer_id: string, photoPath: string): Promise<string> {
		const now = LocalDateTime.now();
		let ownVoucher = await Voucher.findOne({ where: { customer_id } });

		if (!ownVoucher) {
			throw Errors.VoucherTakenByOther;
		}
		if (ownVoucher.is_allocated) {
			return ownVoucher.code;
		}

		const validatePhotoResult: PhotoValidityResponseData = await (
			await axios.post(`${config.imageRecognitionBaseUrl}/photo/validity`, { photoPath })
		).data;

		if (!validatePhotoResult.isValid) {
			await this.unlockedOwnVoucher(customer_id)
			throw Errors.InvalidImage;
		}
		if (ownVoucher.locked_at < now.minusMinutes(10)) {
			await this.unlockedOwnVoucher(customer_id)
			throw Errors.VoucherUnlocked;
		}

		const allocateVoucherResult = await Voucher.update(
			{ customer_id: BigInt(customer_id) },
			{ is_allocated: true }
		);

		if (!allocateVoucherResult.affected) {
			throw Errors.VoucherTakenByOther;
		}

		return ownVoucher.code;
	}

	/**
	 * Try to lock 1 voucher (either non-locked/from another person which is over 10 minutes non-allocated)
	 */
	private async tryLockOneVoucher(customer_id: string) {
		return await Voucher.createQueryBuilder("voucher")
			.where("`voucher`.`customer_id` IS NULL")
			.orWhere("(`voucher`.`is_allocated` IS FALSE AND `voucher`.`locked_at` < DATE_SUB(NOW(), INTERVAL 10 MINUTE))")
			.update({ customer_id: BigInt(customer_id), locked_at: LocalDateTime.now() })
			.limit(1)
			.execute();
	}

	private async unlockedOwnVoucher(customer_id: string) {
		await Voucher.update(
			{ customer_id: BigInt(customer_id), is_allocated: false },
			{ customer_id: null }
		);
	}
}
