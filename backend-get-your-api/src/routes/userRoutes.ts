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
	"/:id",
	({ params }) => {
		const { id } = params;
		return getUserById(id);
	},
	{
		params: t.Object({
			id: t.Numeric(),
		}),
	},
);

userRouter.get(
	"/search",
	({ query }) => {
		const { user, limit } = query;
		return searchUser(user, limit);
	},
	{
		query: t.Object({
			user: t.String(),
			limit: t.Optional(t.Numeric({ default: 10 })),
		}),
	},
);

userRouter.post(
	"/create",
	({ body,headers }) => {
		console.log("headers here",headers)
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
