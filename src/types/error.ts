export namespace Errors {

	export class CustomError extends Error { }

	export class VoucherTakenError extends CustomError {
		public httpStatusCode: 400 = 400;
		public message = "ERR01: Sorry, only 1 voucher is redeemable for each customer.";
	}

	export class VoucherTakenByOtherError extends CustomError {
		public httpStatusCode: 400 = 400;
		public message = "ERR02: Sorry, please check eligibility again because you took more than 10 minutes.";
	}

	export class InvalidImageError extends CustomError {
		public httpStatusCode: 400 = 400;
		public message = "ERR03: Invalid image, please submit another.";
	}

	export class VoucherUnlockedError extends CustomError {
		public httpStatusCode: 400 = 400;
		public message = "ERR04: Sorry, please check eligibility again because you took more than 10 minutes.";
	}

	export class GenericError extends CustomError {
		public httpStatusCode: 500 = 500;
		public message = "ERR05: Server Generic Error";
	}

	export const VoucherTaken = new VoucherTakenError();
	export const VoucherTakenByOther = new VoucherTakenByOtherError();
	export const InvalidImage = new InvalidImageError();
	export const VoucherUnlocked = new VoucherUnlockedError();
	export const Generic = new GenericError();
};

