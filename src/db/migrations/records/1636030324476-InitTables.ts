import { MigrationInterface, QueryRunner } from "typeorm";

export class InitTables1636030324476 implements MigrationInterface {

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query("CREATE TABLE IF NOT EXISTS `customer` (`id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, `first_name` varchar(255) NOT NULL, `last_name` varchar(255) NOT NULL, `gender` varchar(50) NOT NULL, `date_of_birth` date NOT NULL, `contact_number` varchar(50) NOT NULL, `email` varchar(255) NOT NULL, `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, PRIMARY KEY (`id`));");
		await queryRunner.query("CREATE TABLE IF NOT EXISTS `purchase_transaction` (`id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, `customer_id` bigint(20) UNSIGNED NOT NULL, `total_spent` decimal(10,2) NOT NULL, `total_saving` decimal(10,2) NOT NULL, `transaction_at` timestamp NOT NULL, PRIMARY KEY (`id`));");
		await queryRunner.query("CREATE TABLE IF NOT EXISTS `voucher` (`id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, `code` varchar(55) NOT NULL, `locked_at` timestamp NULL, `is_allocated` boolean NOT NULL DEFAULT false, `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, `customer_id` bigint(20) UNSIGNED NULL, PRIMARY KEY (`id`), UNIQUE `code_UNIQUE` (`code`), UNIQUE `customer_id_UNIQUE` (`customer_id`));");
		await queryRunner.query("ALTER TABLE `purchase_transaction` ADD CONSTRAINT `FK_5a8c1cb885e0bd9bfc482dd5b2d` FOREIGN KEY (`customer_id`) REFERENCES `customer`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION");
		await queryRunner.query("ALTER TABLE `voucher` ADD CONSTRAINT `FK_0f98b932a78ca56361df7c49241` FOREIGN KEY (`customer_id`) REFERENCES `customer`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION");
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`ALTER TABLE "voucher" DROP CONSTRAINT "FK_0f98b932a78ca56361df7c49241"`);
		await queryRunner.query(`ALTER TABLE "purchase_transaction" DROP CONSTRAINT "FK_5a8c1cb885e0bd9bfc482dd5b2d"`);
		await queryRunner.query(`DROP TABLE "voucher"`);
		await queryRunner.query(`DROP TABLE "purchase_transaction"`);
		await queryRunner.query(`DROP TABLE "customer"`);
	}

}
