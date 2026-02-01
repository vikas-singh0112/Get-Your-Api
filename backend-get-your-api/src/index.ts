import "dotenv/config";
import { app } from "./App";
import { sql } from "./db/index";

(async () => {
	await sql`SELECT 1`;
	console.log("Successfully connected to Neon DB.");

	app.listen(1111, () => {
		console.log(
			`🦊 Elysia server  is running at ${app.server?.hostname}:${app.server?.port}`,
		);
	});
})()
	.then(() => {
		console.log("connection: true");
	})
	.catch((error) => {
		console.log("connection: false -", error);
		process.exit(1);
	});
