import { Connection, ConnectionOptions, createConnection } from "typeorm";
import { ormConfig } from "../config/orm-config";

export const connectToMySQLDatabase = (): Promise<Connection> => {
	const config: ConnectionOptions = Object.assign({}, ormConfig);
	return createConnection(config);
};
