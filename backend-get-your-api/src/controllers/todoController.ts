import { and, eq } from "drizzle-orm";
import { db } from "../db";
import { todos, users } from "../db/schema";
import { todoService } from "../services/services";
import { ApiError } from "../utils/ApiError";
import { ICreateTodoBody } from "../utils/interface";
import { verifyToken } from "@clerk/backend";
import { ApiResponse } from "../utils/response";

export const helpRoute = async () => {
	return todoService.help();
};

export const getAlltodos = async (
	limit: number = 50,
	scope: string = "global",
	authHeader: string,
) => {
	return todoService.getAll(limit, scope, authHeader);
};

export const getTodoById = async (
	id: number,
	scope: string = "global",
	authHeader: string,
) => {
	return todoService.getById(id, scope, authHeader);
};

export const getTodoByUserId = async (
	uId: number,
	scope: string = "global",
	authHeader: string,
) => {
	if (!todoService.getByUserId) {
		throw new ApiError(400, "GetByUserId not available for this service");
	}
	return todoService.getByUserId(uId, scope, authHeader);
};

export const searchTodo = async (
	title: string,
	limit: number = 10,
	scope: string = "global",
	authHeader: string,
) => {
	if (!todoService.search) {
		throw new ApiError(400, "Search not available for this service");
	}
	return todoService.search(title, limit, scope, authHeader);
};

export const createTodo = async (body: ICreateTodoBody, authHeader: string) => {
	body = {
		...body,
		title: body.title.toLocaleLowerCase(),
	};
	// return userService.create(body, unique, authHeader);

	let authFailError;
	if (authHeader && authHeader.startsWith("Bearer ")) {
		try {
			const token = authHeader.replace("Bearer ", "");
			const { sub: userId } = await verifyToken(token, {
				secretKey: process.env.CLERK_SECRET_KEY,
			});

			const alreadyCreated = await db
				.select()
				.from(todos)
				.where(and(eq(todos.developerId, userId)));

			if (alreadyCreated.length >= 10) {
				throw new ApiError(400, `already create 10 ${todos}`);
			}
			const createDataArray = await db
				.insert(todos)
				.values({
					...body,
                    userId: body.uId,
					developerId: userId,
					isGlobal: false,
					expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
				})
				.returning();
			const createData = createDataArray[0];

			if (!createData) {
				throw new ApiError(500, "unable to create");
			}
			const { developerId, isGlobal, expiresAt, ...safeData } = createData;

			const response = ApiResponse({
				data: safeData,
				message: "todo created successfully",
				statusCode: 201,
			});
			return response;
		} catch (error) {
			console.error("Auth failed, falling back to mock mode");
			authFailError = "Auth failed, falling back to mock mode";
		}
	}
	// if auth failed dummy data creation
	const createData = body;
	if (!createData) {
		return new ApiError(500, "unable to create todo");
	}
	const response = ApiResponse({
		data: createData,
		message: `${authHeader && authFailError} -- dummy todo created successfully`,
		statusCode: 201,
	});
	return response;
};
