import Elysia, { t } from "elysia";
import {
	createAuthor,
	getAllAuthors,
	getAuthorById,
	helpRoute,
	searchAuthors,
} from "../controllers/authorController";

export const authorRouter = new Elysia();

authorRouter.get("/help", () => helpRoute());

authorRouter.get(
	"/",
	({ query }) => {
		const { limit } = query;
		return getAllAuthors(limit);
	},
	{
		query: t.Object({
			limit: t.Optional(t.Numeric({ default: 50 })),
		}),
	},
);

authorRouter.get(
	"/:id",
	({ params }) => {
		const { id } = params;
		return getAuthorById(id);
	},
	{
		params: t.Object({
			id: t.Numeric(),
		}),
	},
);

authorRouter.get(
	"/search",
	({ query }) => {
		const { q, limit } = query;
		return searchAuthors(q, limit);
	},
	{
		query: t.Object({
			q: t.String(),
			limit: t.Optional(t.Numeric({ default: 10 })),
		}),
	},
);

authorRouter.post(
	"/create",
	({ body }) => {
		return createAuthor(body, body.name);
	},
	{
		body: t.Object({
			name: t.String({ minLength: 2, maxLength: 30 }),
			bio: t.String({ minLength: 2, maxLength: 30 }),
			nationality: t.String({ minLength: 2, maxLength: 30 }),
			birthDate: t.Numeric({ minimum: 1, maximum: 31 }),
			birthMonth: t.Numeric({ minimum: 1, maximum: 12 }),
			birthYear: t.Numeric({
				minimum: 0,
				maximum: new Date().getFullYear(),
			}),
		}),
	},
);
