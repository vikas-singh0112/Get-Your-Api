import Elysia, { t } from "elysia";
import { getAllPost } from "../controllers/postController";

export const postRouter = new Elysia();

postRouter.get(
	"/getAll",
	({ query }) => {
		const { limit } = query;
		return getAllPost(limit);
	},
	{
		query: t.Object({
			limit: t.Optional(t.Numeric({ default: 100 })),
           
		}),
	},
);
