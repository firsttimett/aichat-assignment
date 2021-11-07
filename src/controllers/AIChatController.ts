import { StatusCodes } from "http-status-codes";
import { Controller, Example, Get, Header, Post, Res, Response, Route, SuccessResponse, Tags, TsoaResponse, UploadedFile } from "tsoa";
import { AIChatService } from "../service/AIChatService";
import { Errors } from "../types";

@Route("voucher")
@Tags("APIs for Company ABC")
export class AIChatController extends Controller {
	constructor(private readonly aiChatService = new AIChatService()) {
		super();
	}

	/**
	 * @summary Get customer eligibility for campaign voucher
	 */
	@SuccessResponse(StatusCodes.OK, "OK")
	@Response(400)
	@Response(500, "ERR04: Server Generic Error")
	@Example({ eligibility: true })
	@Get("eligibility")
	public async getEligibility(
		@Header() customer_id: string,
		@Res() voucherTakenError: TsoaResponse<400, { message: string }>,
		@Res() genericError: TsoaResponse<500, { message: string }>
	) {
		try {
			const eligibility = await this.aiChatService.getEligibility(customer_id);
			return { eligibility };
		} catch (error) {
			if (error instanceof Errors.VoucherTakenError) {
				return voucherTakenError(error.httpStatusCode, { message: error.message });
			}

			console.log("GENERIC ERROR: ", error);
			return genericError(Errors.Generic.httpStatusCode, { message: Errors.Generic.message });
		}
	}

	/**
	 * @summary Submit a photo to win the voucher
	 */
	@SuccessResponse(StatusCodes.OK, "OK")
	@Response(400)
	@Response(500, "ERR04: Server Generic Error")
	@Example({ voucherCode: "longgggg voucherrr code" })
	@Post("submit")
	public async submitPhoto(
		@Header() customer_id: string,
		@UploadedFile() file: Express.Multer.File,
		@Res() voucherTakenByOtherError: TsoaResponse<400, { message: string }>,
		@Res() invalidImageError: TsoaResponse<400, { message: string }>,
		@Res() voucherUnlockedError: TsoaResponse<400, { message: string }>,
		@Res() genericError: TsoaResponse<500, { message: string }>,
	) {
		try {
			const voucherCode = await this.aiChatService.submitPhoto(customer_id, file.path);
			return { voucherCode };
		} catch (error) {
			if (error instanceof Errors.VoucherTakenByOtherError) {
				return voucherTakenByOtherError(error.httpStatusCode, { message: error.message });
			}
			if (error instanceof Errors.InvalidImageError) {
				return invalidImageError(error.httpStatusCode, { message: error.message });
			}
			if (error instanceof Errors.VoucherUnlockedError) {
				return voucherUnlockedError(error.httpStatusCode, { message: error.message });
			}

			console.log("GENERIC ERROR: ", error);
			return genericError(Errors.Generic.httpStatusCode, { message: Errors.Generic.message });
		}
	}
}
