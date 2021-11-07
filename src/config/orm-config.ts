import { map } from "lodash";
import { ConnectionOptions } from "typeorm";
import * as Migrations from "../db/migrations";
import * as Entities from "../entities";
import { config } from "./app-config";

export const ormConfig: ConnectionOptions = {
	type: "mysql",
	host: config.db.host,
	port: config.db.port,
	username: config.db.username,
	password: config.db.password,
	database: config.db.name,
	synchronize: false,
	logging: true,
	entities: map(Entities),
	migrations: map(Migrations),
	migrationsRun: true,
	cli: {
		migrationsDir: "src/db/migrations/records"
	}
};
