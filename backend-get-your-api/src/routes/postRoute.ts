import Elysia, { t } from "elysia";
import { getAllPost, getPostById } from "../controllers/postController";
import { helpRoute } from "../controllers/userController";

export const postRouter = new Elysia();

postRouter.get("/help", () => helpRoute());

postRouter.get(
	"/",
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
postRouter.get(
	"/:id",
	({ params }) => {
		const { id } = params;
		return getPostById(id);
	},
	{
		params: t.Object({
			id: t.Numeric(),
		}),
	},
);
