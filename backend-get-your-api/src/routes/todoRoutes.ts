import Elysia, { t } from "elysia";

import {
	createTodo,
	getAlltodos,
	getTodoById,
	getTodoByUserId,
	searchTodo,
	helpRoute,
} from "../controllers/todoController";

export const todoRouter = new Elysia();

todoRouter.get("/help", () => helpRoute());

todoRouter.get(
	"/",
	({ query, headers }) => {
		const { limit, scope } = query;
		const authHeader = headers.authorization || "";
		return getAlltodos(limit, scope, authHeader);
	},
	{
		query: t.Object({
			limit: t.Optional(t.Numeric({ default: 20 })),
			scope: t.Optional(t.String()),
		}),
	},
);

todoRouter.get(
	"/:id",
	({ params, headers, query }) => {
		const { id } = params;
		const { scope } = query;
		const authHeader = headers.authorization || "";
		return getTodoById(id, scope, authHeader);
	},
	{
		params: t.Object({
			id: t.Numeric(),
			scope: t.Optional(t.String()),
		}),
	},
);
todoRouter.get(
	"/userid/:id",
	({ params, headers, query }) => {
		const { id } = params;
		const { scope } = query;
		const authHeader = headers.authorization || "";
		return getTodoByUserId(id, scope, authHeader);
	},
	{
		params: t.Object({
			id: t.Numeric(),
			scope: t.Optional(t.String()),
		}),
	},
);

todoRouter.get(
	"/search",
	({ query, headers }) => {
		const { user, limit, scope } = query;
		const authHeader = headers.authorization || "";
		return searchTodo(user, limit, scope, authHeader);
	},
	{
		query: t.Object({
			user: t.String(),
			limit: t.Optional(t.Numeric({ default: 10 })),
			scope: t.Optional(t.String()),
		}),
	},
);

todoRouter.post(
	"/create",
	({ body, headers }) => {
		const authHeader = headers.authorization || "";
		return createTodo(body, authHeader);
	},
	{
		body: t.Object({
			uId: t.Numeric(),
			title: t.String(),
			content: t.String(),
			completed: t.Boolean(),
		}),
	},
);
