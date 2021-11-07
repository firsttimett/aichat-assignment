import { LocalDateTime } from "@js-joda/core";
import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { ICustomer, IPurchaseTransaction } from "../types/entityTypes";
import { LocalDateTimeTransformer } from "./transformers";

@Entity("purchase_transaction")
export class PurchaseTransaction extends BaseEntity implements IPurchaseTransaction {
	@PrimaryGeneratedColumn({ type: "bigint", unsigned: true, name: "id" })
	public id!: bigint;

	@Column({ type: "bigint", unsigned: true, nullable: false })
	public customer_id!: bigint;

	@ManyToOne("customer", "purchaseTransactions", {
		onDelete: "CASCADE",
		nullable: false,
	})
	@JoinColumn({ name: "customer_id" })
	public customer: ICustomer;

	@Column({ type: "decimal", precision: 10, scale: 2, nullable: false })
	public total_spent!: number;

	@Column({ type: "decimal", precision: 10, scale: 2, nullable: false })
	public total_saving!: number;

	@Column({
		type: "timestamp",
		nullable: false,
		transformer: LocalDateTimeTransformer,
	})
	public transaction_at!: LocalDateTime;
}
