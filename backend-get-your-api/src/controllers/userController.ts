import { and, eq } from "drizzle-orm";
import { db } from "../db";
import { users } from "../db/schema";
import { userService } from "../services/services";
import { ApiError } from "../utils/ApiError";
import { ICreateUserBody } from "../utils/interface";
import { verifyToken } from "@clerk/backend";
import { ApiResponse } from "../utils/response";

export const helpRoute = async () => {
	return userService.help();
};

export const getAllUsers = async (
	limit: number = 50,
	scope: string = "global",
	authHeader: string,
) => {
	return userService.getAll(limit, scope, authHeader);
};

export const getUserById = async (
	id: number,
	scope: string = "global",
	authHeader: string,
) => {
	return userService.getById(id, scope, authHeader);
};

export const searchUser = async (
	user: string,
	limit: number = 10,
	scope: string = "global",
	authHeader: string,
) => {
	if (!userService.search) {
		throw new ApiError(400, "Search not available for this service");
	}
	return userService.search(user, limit, scope, authHeader);
};

export const createUser = async (
	body: ICreateUserBody,
	authHeader: string,
) => {
	body = {
		firstName: body.firstName.toLocaleLowerCase(),
		lastName: body.lastName.toLocaleLowerCase(),
		email: body.email.toLocaleLowerCase(),
		birthDate: body.birthDate.toLocaleLowerCase(),
		phoneNumber: body.phoneNumber,
		role: body.role.toLocaleLowerCase(),
		address: body.address.toLocaleLowerCase(),
		city: body.city.toLocaleLowerCase(),
		state: body.state.toLocaleLowerCase(),
		country: body.country.toLocaleLowerCase(),
		zipCode: body.zipCode.toLocaleLowerCase(),
	};
	// return userService.create(body, unique, authHeader);

	const existingData = await db
		.select()
		.from(users)
		.where(eq(users.email, body.email))
		.limit(1);

	if (existingData.length > 0) {
		throw new ApiError(400, `User with email ${body.email} already exists`);
	}
	let authFailError;
	if (authHeader && authHeader.startsWith("Bearer ")) {
		try {
			const token = authHeader.replace("Bearer ", "");
			const { sub: userId } = await verifyToken(token, {
				secretKey: process.env.CLERK_SECRET_KEY,
			});

			const alreadyCreated = await db
				.select()
				.from(users)
				.where(and(eq(users.developerId, userId)));

			if (alreadyCreated.length >= 10) {
				throw new ApiError(400, `already create 10 ${users}`);
			}
			const createDataArray = await db
				.insert(users)
				.values({
					...body,
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
				message: "user created successfully",
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
		return new ApiError(500, "unable to create user");
	}
	const response = ApiResponse({
		data: createData,
		message: `${authHeader && authFailError} -- dummy user created successfully`,
		statusCode: 201,
	});
	return response;
};
