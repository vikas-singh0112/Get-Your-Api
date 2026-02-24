import { and, eq } from "drizzle-orm";
import { posts } from "../db/schema";
import { postService } from "../services/services";
import { ApiError } from "../utils/ApiError";
import { ICreatePostBody } from "../utils/interface";
import { ApiResponse } from "../utils/response";
import { db } from "../db";
import { verifyToken } from "@clerk/backend";

export const helpRoute = async () => {
	return postService.help();
};
export const getAllPost = async (limit: number = 10,scope:string = "global", authHeader:string) => {
	return postService.getAll(limit,scope , authHeader);
};

export const getPostById = async (id: number, scope:string = "global",authHeader: string) => {
	return postService.getById(id, scope, authHeader);
};

export const createPost = async (body: ICreatePostBody, authHeader:string) => {
	// return postService.create(body, unique, authHeader);

	let authFailError;
		if (authHeader && authHeader.startsWith("Bearer ")) {
			try {
				const token = authHeader.replace("Bearer ", "");
				const { sub: userId } = await verifyToken(token, {
					secretKey: process.env.CLERK_SECRET_KEY,
				});
	
				const alreadyCreated = await db
					.select()
					.from(posts)
					.where(and(eq(posts.developerId, userId)));
	
				if (alreadyCreated.length >= 10) {
					throw new ApiError(400, `already create 10 ${posts}`);
				}
				// body.userId = Number(userId);
				const createDataArray = await db
					.insert(posts)
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
					message: "post created successfully",
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
			return new ApiError(500, "unable to create post");
		}
		const response = ApiResponse({
			data: createData,
			message: `${authHeader && authFailError} -- dummy post created successfully`,
			statusCode: 201,
		});
		return response;
};