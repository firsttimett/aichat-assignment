import { LocalDate, LocalDateTime } from "@js-joda/core";
import { BaseEntity, Column, CreateDateColumn, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { ICustomer, IPurchaseTransaction, IVoucher } from "../types/entityTypes";
import { LocalDateTimeTransformer, LocalDateTransformer } from "./transformers";

@Entity("customer")
export class Customer extends BaseEntity implements ICustomer {
	@PrimaryGeneratedColumn({ type: "bigint", unsigned: true, name: "id" })
	public id!: bigint;

	@Column({ type: "varchar", length: 255 })
	public first_name!: string;

	@Column({ type: "varchar", length: 255 })
	public last_name!: string;

	@Column({ type: "varchar", length: 50 })
	public gender!: string;

	@Column({ type: "date", transformer: LocalDateTransformer })
	public date_of_birth!: LocalDate;

	@Column({ type: "varchar", length: 50 })
	public contact_number!: string;

	@Column({ type: "varchar", length: 255 })
	public email!: string;

	@CreateDateColumn({
		name: "created_at",
		type: "timestamp",
		transformer: LocalDateTimeTransformer,
	})
	public created_at!: LocalDateTime;

	@UpdateDateColumn({
		name: "updated_at",
		type: "timestamp",
		transformer: LocalDateTimeTransformer,
	})
	public updated_at!: LocalDateTime;

	@OneToMany("purchase_transaction", "customer", { cascade: true })
	public purchaseTransactions?: IPurchaseTransaction[];

	@OneToOne("voucher", "customer", { cascade: true })
	public voucher?: IVoucher[];
}
