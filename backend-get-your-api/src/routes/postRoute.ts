import Elysia, { t } from "elysia";
import { createPost, getAllPost, getPostById } from "../controllers/postController";
import { helpRoute } from "../controllers/userController";

export const postRouter = new Elysia();

postRouter.get("/help", () => helpRoute());

postRouter.get(
	"/",
	({ query, headers }) => {
		const { limit, scope } = query;
		const authHeader = headers.authorization || "";
		return getAllPost(limit, scope, authHeader);
	},
	{
		query: t.Object({
			limit: t.Optional(t.Numeric({ default: 20 })),
			scope: t.Optional(t.String()),
		}),
	},
);
postRouter.get(
	"/:id",
	({params, headers, query }) => {
		const { id } = params;
		const {scope} = query
		const authHeader = headers.authorization || "";
		return getPostById(id, scope, authHeader);
	},
	{
		params: t.Object({
			id: t.Numeric(),
			scope: t.Optional(t.String())
		}),
	},
);

postRouter.post(
	"/create",
	({ body,headers }) => {
		const authHeader = headers.authorization || "";
		return createPost(body, authHeader);
	},
	{
		body: t.Object({
			userId: t.Numeric(),
			post_image_url: t.String(),
			content: t.String({maxLength: 500}),
		}),
	},
);