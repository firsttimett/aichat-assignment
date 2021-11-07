import { LocalDate, LocalDateTime } from "@js-joda/core";

export interface ICustomer {
	id: bigint;
	first_name: string;
	last_name: string;
	gender: string;
	date_of_birth: LocalDate;
	contact_number: string;
	email: string;
	created_at: LocalDateTime;
	updated_at: LocalDateTime;
}

export interface IPurchaseTransaction {
	id: bigint;
	total_spent: number;
	total_saving: number;
	transaction_at: LocalDateTime;
}

export interface IVoucher {
	id: bigint;
	code: string;
	locked_at?: LocalDateTime;
	is_allocated: boolean;
	created_at: LocalDateTime;
	updated_at: LocalDateTime;
}
