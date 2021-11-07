import { LocalDateTime } from "@js-joda/core";
import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from "typeorm";
import { ICustomer, IVoucher } from "../types/entityTypes";
import { LocalDateTimeTransformer } from "./transformers";

@Entity("voucher")
@Unique(["code"])
// Might not be able to set unique on nullable column in some database(s)
@Unique(["customer_id"])
export class Voucher extends BaseEntity implements IVoucher {
	@PrimaryGeneratedColumn({ type: "bigint", unsigned: true, name: "id" })
	public id!: bigint;

	@Column({ type: "varchar", length: 55 })
	public code!: string;

	@Column({
		type: "timestamp",
		nullable: true,
		transformer: LocalDateTimeTransformer,
	})
	public locked_at?: LocalDateTime;

	@Column({ default: false })
	public is_allocated!: boolean;

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

	@Column({ type: "bigint", nullable: true })
	public customer_id?: bigint;

	@ManyToOne("customer", "voucher", {
		onDelete: "CASCADE",
		nullable: true,
	})
	@JoinColumn({ name: "customer_id" })
	public customer?: ICustomer;
}
