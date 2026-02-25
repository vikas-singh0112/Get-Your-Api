import Elysia from "elysia";
import { healthRouter } from "./routes/healthRoute";
import { userRouter } from "./routes/userRoutes";
import { ApiError } from "./utils/ApiError";
import { postRouter } from "./routes/postRoute";
import { acotorRouter } from "./routes/actorRoute";
import { authorRouter } from "./routes/authorRoute";
import { bookRouter } from "./routes/bookRoute";
import { cleanDatabase } from "./db/dbCleanup";
import cors from "@elysiajs/cors";
import cron from "@elysiajs/cron";
import { contactRouter } from "./routes/contactRoute";
import { todoRouter } from "./routes/todoRoutes";

const app = new Elysia();

app.use(cors());
app.use(
	cron({
		name: "janitor",
		pattern: "0 * * * *",
		async run() {
			await cleanDatabase();
		},
	}),
);
cleanDatabase();

// errors/global erros
app
	.error({
		API_ERROR: ApiError,
	})
	.onError(({ code, error, set }) => {
		if (code === "API_ERROR") {
			set.status = error.statusCode;
			return {
				success: false,
				message: error.message,
				timestamp: new Date().toISOString(),
			};
		}

		set.status = 500;
		return {
			success: false,
			message: "Internal Server Error",
			timestamp: new Date().toISOString(),
			error,
		};
	});

// health
app.group("/api", (app) => app.use(healthRouter));

// contact
app.group("/api", (app) => app.use(contactRouter));

// users
app.group("/api/users", (app) => app.use(userRouter));

// posts
app.group("/api/posts", (app) => app.use(postRouter));

// todos
app.group("/api/todos", (app) => app.use(todoRouter));

// actor
app.group("/api/actors", (app) => app.use(acotorRouter));

// author
app.group("/api/authors", (app) => app.use(authorRouter));

// book
app.group("/api/books", (app) => app.use(bookRouter));

// secure routes
// app.group("/api/actors", (app) => app.use(auth).use(acotorRouter));
export { app };
