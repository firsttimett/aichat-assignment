import express, { Request, Response } from "express";
import { Server } from "http";
import { config } from "./config/app-config";
import { connectToMySQLDatabase } from "./db";
import { RegisterRoutes } from "./routes";
import morgan from "morgan";
import swaggerUi from "swagger-ui-express";

export async function startServer(): Promise<Server> {
	console.info("Starting server...");
	const port = config.port || 3000;

	await connectToMySQLDatabase();

	const expressServer = express()
		.use(express.urlencoded({
			extended: true,
		}))
		.use(express.json())
		.use(morgan(":method :url :status :response-time ms [:date[clf]]"))
		.use("/docs", swaggerUi.serve, async (_: Request, res: Response) => {
			return res.send(
				swaggerUi.generateHTML(await import("../dist/spec/swagger.json"))
			);
		});

	RegisterRoutes(expressServer);

	expressServer.all("*", function notFoundHandler(_: Request, res: Response) {
		res.status(404).send({
			message: "Not Found",
		})
	});

	return new Promise((resolve) => {
		const server = expressServer.listen(port, async () => {
			console.info(`${config.serviceName} started on port ${port}.`);
			resolve(server);
		});
	});
}
