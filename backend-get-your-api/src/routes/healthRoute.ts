import Elysia from "elysia";
import { healthCheck } from "../controllers/healthCheckController";

export const healthRouter = new Elysia();

healthRouter.get("/health", () => healthCheck());
