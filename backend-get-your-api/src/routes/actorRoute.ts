import Elysia, { t } from "elysia";

import {
	createActor,
	getActorById,
	getAllActors,
	helpRoute,
	searchActor,
} from "../controllers/actorController";

export const acotorRouter = new Elysia();

acotorRouter.get("/help", () => helpRoute());

acotorRouter.get(
	"/",
	({ query }) => {
		const { limit } = query;
		return getAllActors(limit);
	},
	{
		query: t.Object({
			limit: t.Optional(t.Numeric({ default: 50 })),
		}),
	},
);

acotorRouter.get(
	"/:id",
	({ params }) => {
		const { id } = params;
		return getActorById(id);
	},
	{
		params: t.Object({
			id: t.Numeric(),
		}),
	},
);

acotorRouter.get(
	"/search",
	({ query }) => {
		const { q, limit } = query;
		return searchActor(q, limit);
	},
	{
		query: t.Object({
			q: t.String(),
			limit: t.Optional(t.Numeric({ default: 10 })),
		}),
	},
);

acotorRouter.post(
	"/create",
	({ body }) => {
		return createActor(body, body.name);
	},
	{
		body: t.Object({
			name: t.String({ minLength: 2, maxLength: 30 }),
			bio: t.String({ minLength: 2, maxLength: 30 }),
			nationality: t.String({ minLength: 2, maxLength: 30 }),
			birthDate: t.Numeric({ minimum: 1, maximum: 31 }),
			birthMonth: t.Numeric({ minimum: 1, maximum: 12 }),
			birthYear: t.Numeric({
				minimum: 1900,
				maximum: new Date().getFullYear(),
			}),
		}),
	},
);
