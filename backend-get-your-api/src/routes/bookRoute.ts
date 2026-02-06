import Elysia, { t } from "elysia";

import {
	createBook,
	getAllBooks,
	getBookById,
	helpRoute,
	searchBooks,
} from "../controllers/bookController";
import { date } from "drizzle-orm/pg-core";

export const bookRouter = new Elysia();

bookRouter.get("/help", () => helpRoute());

bookRouter.get(
	"/",
	({ query }) => {
		const { limit } = query;
		return getAllBooks(limit);
	},
	{
		query: t.Object({
			limit: t.Optional(t.Numeric({ default: 50 })),
		}),
	},
);

bookRouter.get(
	"/:id",
	({ params }) => {
		const { id } = params;
		return getBookById(id);
	},
	{
		params: t.Object({
			id: t.Numeric(),
		}),
	},
);

bookRouter.get(
	"/search",
	({ query }) => {
		const { q, limit } = query;
		return searchBooks(q, limit);
	},
	{
		query: t.Object({
			q: t.String(),
			limit: t.Optional(t.Numeric({ default: 10 })),
		}),
	},
);

bookRouter.post(
	"/create",
	({ body }) => {
		return createBook(body, body.title);
	},
	{
		body: t.Object({
			title: t.String({ minLength: 2, maxLength: 30 }),
			description: t.String({ minLength: 2, maxLength: 30 }),
			isbn: t.String({ maxLength: 13 }),
			publishDate: t.String(),
		}),
	},
);
