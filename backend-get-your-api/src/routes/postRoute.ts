import Elysia from "elysia";
import { getAllPost } from "../controllers/postController";

export const postRouter = new Elysia();

postRouter.get("/getAll", () => getAllPost());
