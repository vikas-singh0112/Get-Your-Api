import Elysia from "elysia";
import { healthRouter } from "./routes/healthRoute";

const app = new Elysia();

app.group("/api", (app) => app.use(healthRouter));

export { app };
