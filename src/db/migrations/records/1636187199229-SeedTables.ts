import { LocalDate, LocalDateTime, nativeJs } from "@js-joda/core";
import _ from "lodash";
import { MigrationInterface, QueryRunner } from "typeorm";
import faker from "faker";

export class SeedTables1636187199229 implements MigrationInterface {
	private maxNumber = 9999999999999999999;
	private numCustomers = 10;
	private numPurchaseTransactions = 50;
	private numVouchers = 3;
	// private numCustomers = 20;
	// private numPurchaseTransactions = 100;
	// private numVouchers = 10;

	private customers = [...Array(this.numCustomers)].map(() =>
	({
		id: BigInt(faker.datatype.number(this.maxNumber)),
		first_name: faker.name.findName(),
		last_name: faker.name.lastName(),
		gender: faker.name.gender(),
		date_of_birth: LocalDate.from(nativeJs(getRandomJsDate())).toString(),
		contact_number: faker.phone.phoneNumber(),
		email: faker.internet.email(),
	}));

	private purchaseTransactions = [...Array(this.numPurchaseTransactions)].map(() => {
		const todayDate = new Date();
		const twoMonthsAgo = new Date(todayDate.getFullYear(), todayDate.getMonth() - 2, todayDate.getDate());
		const transaction_at = LocalDateTime.from(nativeJs(getRandomJsDate(twoMonthsAgo, todayDate))).toString();

		return ({
			id: BigInt(faker.datatype.number(this.maxNumber)),
			customer_id: _.sample(this.customers.map((cust) => cust.id)),
			total_spent: _.random(25, 90),
			total_saving: _.sample([1, 2, 5, 10]),
			transaction_at,
		});
	});

	private vouchers = [...Array(this.numVouchers)].map(() => ({
		id: BigInt(faker.datatype.number(this.maxNumber)),
		code: faker.random.alphaNumeric(55),
	}));

	public async up(queryRunner: QueryRunner): Promise<void> {
		const customerValues = getStringFromArrayOfObject(this.customers);
		const purchaseTransactionValues = getStringFromArrayOfObject(this.purchaseTransactions);
		const voucherValues = getStringFromArrayOfObject(this.vouchers);

		await queryRunner.query(`INSERT INTO \`customer\` (\`id\`, \`first_name\`, \`last_name\`, \`gender\`, \`date_of_birth\`, \`contact_number\`, \`email\`) VALUES ${customerValues};`);
		await queryRunner.query(`INSERT INTO \`purchase_transaction\` (\`id\`, \`customer_id\`, \`total_spent\`, \`total_saving\`, \`transaction_at\`) VALUES ${purchaseTransactionValues};`);
		await queryRunner.query(`INSERT INTO \`voucher\` (\`id\`, \`code\`) VALUES ${voucherValues};`);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`SET FOREIGN_KEY_CHECKS = 0`);
		await queryRunner.query(`TRUNCATE TABLE \`voucher\``);
		await queryRunner.query(`TRUNCATE TABLE \`purchase_transaction\``);
		await queryRunner.query(`TRUNCATE TABLE \`customer\``);
		await queryRunner.query(`SET FOREIGN_KEY_CHECKS = 1`);
	}
}

function getRandomJsDate(fromJsDate: Date = new Date(1940, 0, 1), toJsDate = new Date(2010, 0, 1)) {
	const startTime = fromJsDate.getTime();
	const endTime = toJsDate.getTime();

	return new Date(startTime + Math.random() * (endTime - startTime));
}

function getStringFromArrayOfObject(array: unknown[]) {
	return array.reduce((strAccumulator, obj, index) => {
		if (index !== 0) {
			strAccumulator += ", ";
		}
		strAccumulator += StringifyValues(obj);

		return strAccumulator;
	}, "");
}

// Did not use JSON.stringify because cannot serialize BigInt
function StringifyValues(obj: unknown) {
	const arrValues = Object.values(obj);
	let result = "";

	for (let index = 0; index < arrValues.length; index++) {
		result += ((index === 0) ? "(" : ", ");
		result += `'${arrValues[index].toString().replace(/"/g, '""').replace(/'/g, "''")}'`;

		if (index === arrValues.length - 1) {
			result += ")";
		}
	}

	return result;
}
