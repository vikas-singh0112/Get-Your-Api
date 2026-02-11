import Elysia, { t } from "elysia";
import {
	createUser,
	getAllUsers,
	getUserById,
	helpRoute,
	searchUser,
} from "../controllers/userController";

export const userRouter = new Elysia();

userRouter.get("/help", () => helpRoute());

userRouter.get(
	"/",
	({ query, headers }) => {
		const { limit, scope } = query;
		const authHeader = headers.authorization || "";
		return getAllUsers(limit, scope, authHeader);
	},
	{
		query: t.Object({
			limit: t.Optional(t.Numeric({ default: 50 })),
			scope: t.Optional(t.String())
		}),
	},
);

userRouter.get(
	"/:id",
	({ params, headers, query }) => {
		const { id } = params;
		const {scope} = query
		const authHeader = headers.authorization || "";
		return getUserById(id, scope,authHeader);
	},
	{
		params: t.Object({
			id: t.Numeric(),
			scope: t.Optional(t.String())
		}),
	},
);

userRouter.get(
	"/search",
	({ query, headers }) => {
		const { user, limit, scope } = query;
		const authHeader = headers.authorization || "";
		return searchUser(user, limit,scope, authHeader);
	},
	{
		query: t.Object({
			user: t.String(),
			limit: t.Optional(t.Numeric({ default: 10 })),
			scope: t.Optional(t.String())
		}),
	},
);

userRouter.post(
	"/create",
	({ body,headers }) => {
		const authHeader = headers.authorization || "";
		return createUser(body, body.email, authHeader);
	},
	{
		body: t.Object({
			firstName: t.String({ minLength: 2, maxLength: 30 }),
			lastName: t.String({ minLength: 2, maxLength: 30 }),
			email: t.String(),
			birthDate: t.String(),
			phoneNumber: t.String({ minLength: 7, maxLength: 20 }),
			role: t.String({ minLength: 4, maxLength: 10 }),
			address: t.String({ minLength: 5 }),
			city: t.String({minLength:2, maxLength:30}),
			state: t.String({ minLength: 2, maxLength: 30 }),
			country: t.String({ minLength: 4, maxLength: 30 }),
			zipCode: t.String({ minLength: 4, maxLength: 6 }),
		}),
	},
);
