import Elysia, { t } from "elysia";
import { getAllUsers, searchUser } from "../controllers/userController";

export const userRouter = new Elysia();

userRouter.get(
	"/getAll",
	({ query }) => {
		const { limit } = query;
		return getAllUsers(limit);
	},
	{
		query: t.Object({
			limit: t.Optional(t.Numeric({ default: 50 })),
		}),
	},
);
userRouter.get(
	"/search",
	({ query }) => {
		const { q, limit } = query;
		return searchUser(q, limit);
	},
	{
		query: t.Object({
			q: t.String(),
			limit: t.Optional(t.Numeric({ default: 10 })),
		}),
	},
);
