import Elysia from "elysia";
import { healthRouter } from "./routes/healthRoute";
import { userRouter } from "./routes/userRoutes";
import { ApiError } from "./utils/ApiError";
import { postRouter } from "./routes/postRoute";

const app = new Elysia();

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
		};
	});

// health
app.group("/api", (app) => app.use(healthRouter));

// users
app.group("/api/users", (app) => app.use(userRouter));

// posts
app.group("/api/posts", (app) => app.use(postRouter));

export { app };
