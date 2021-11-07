import * as dotenv from "dotenv";
import * as packageJSON from "../../package.json";

dotenv.config();

export const config = {
	serviceName: packageJSON.name,
	version: packageJSON.version,
	port: Number(process.env.PORT),
	db: {
		host: process.env.DB_HOST,
		port: Number(process.env.DB_PORT),
		username: process.env.DB_USERNAME,
		password: process.env.DB_PASSWORD,
		name: process.env.DB_NAME,
	},
	imageRecognitionBaseUrl: process.env.IMAGE_RECOGNITION_BASE_URL
};
