import { PgColumn, PgTable } from "drizzle-orm/pg-core";
import { db } from "../db";
import { and, eq, ilike, or } from "drizzle-orm";
import { ApiError } from "./ApiError";
import { ApiResponse } from "./response";
import { app } from "../App";
import { ICreateUserBody } from "./interface";
import { verifyToken } from "@clerk/backend";

type Props = {
	Model: PgTable;
	idColumn: PgColumn;
	queryColumn?: PgColumn[];
	unique?: PgColumn;
	modelName: string;
	developerId: PgColumn;
	isGlobal: PgColumn;
};

const factory = ({
	Model,
	modelName,
	idColumn,
	queryColumn,
	unique,
	developerId,
	isGlobal,
}: Props) => {
	return {
		help: async () => {
			const data = [
				{
					help: `localhost:1111/${modelName}/help`,
					Get_all: `localHost:1111/${modelName}/`,
					Get_all_with_limit: `localHost:1111/${modelName}?limit=50`,
					Get_by_id: `localHost:1111/${modelName}/123`,
					...(queryColumn && {
						Search: `localHost:1111/${modelName}/search?q=adam`,
						Search_with_limit: `localHost:1111/${modelName}/search?q=adam&limit=10`,
					}),
				},
			];
			const response = ApiResponse({
				data,
				message: "usages",
				statusCode: 200,
			});
			return response;
		},

		getAll: async (limit: number, scope: string, authHeader: string) => {
			let data;
			if (scope === "me") {
				if (!authHeader || !authHeader.startsWith("Bearer ")) {
					throw new ApiError(401, "Authentication required for private scope");
				}

				try {
					const token = authHeader.replace("Bearer ", "");
					const { sub: userId } = await verifyToken(token, {
						secretKey: process.env.CLERK_SECRET_KEY,
					});

					// Fetch only records belonging to this developer
					data = await db
						.select()
						.from(Model)
						.where(eq(developerId, userId))
						.limit(limit);
				} catch (error) {
					throw new ApiError(401, "Invalid token for private scope");
				}
			} else {
				data = await db.select().from(Model).limit(limit);
			}

			if (!data || data.length === 0) {
				throw new ApiError(404, `${modelName}  not found`);
			}
			const safeData = data.map((item) => {
				const { developerId, isGlobal, expiresAt, ...rest } = item;
				return rest;
			});
			const response = ApiResponse({
				data: safeData,
				message: `${modelName} fetched successfully`,
				statusCode: 200,
			});
			return response;
		},

		getById: async (id: number, scope: string, authHeader: string) => {
			let data;
			if (scope === "me") {
				if (!authHeader || !authHeader.startsWith("Bearer ")) {
					throw new ApiError(401, "Authentication required for private scope");
				}
				try {
					const token = authHeader.replace("Bearer ", "");
					const { sub: userId } = await verifyToken(token, {
						secretKey: process.env.CLERK_SECRET_KEY,
					});

					data = await db
						.select()
						.from(Model)
						.where(and(eq(developerId, userId), eq(idColumn, id)));
				} catch (error) {
					throw new ApiError(401, "Invalid token for private scope");
				}
			} else {
				data = await db
					.select()
					.from(Model)
					.where(and(eq(isGlobal, true), eq(idColumn, id)));
			}
			if (!data || data.length === 0) {
				throw new ApiError(404, `${id} not found`);
			}
			const safeData = data.map((item) => {
				const { developerId, isGlobal, expiresAt, ...rest } = item;
				return rest;
			});
			const response = ApiResponse({
				data: safeData,
				message: `${id} fetched successfully`,
				statusCode: 200,
			});
			return response;
		},

		// search
		...(queryColumn &&
			queryColumn.length > 0 && {
				search: async (
					q: string,
					limit: number,
					scope: string,
					authHeader: string,
				) => {
					const conditions = queryColumn.map((col) => ilike(col, `%${q}%`));
					// console.log(q);
					let data;
					if (scope === "me") {
						if (!authHeader || !authHeader.startsWith("Bearer ")) {
							throw new ApiError(
								401,
								"Authentication required for private scope",
							);
						}
						try {
							const token = authHeader.replace("Bearer ", "");
							const { sub: userId } = await verifyToken(token, {
								secretKey: process.env.CLERK_SECRET_KEY,
							});

							data = await db
								.select()
								.from(Model)
								.where(and(eq(developerId, userId), or(...conditions)));
						} catch (error) {
							throw new ApiError(401, "Invalid token for private scope");
						}
					} else {
						data = await db
							.select()
							.from(Model)
							.limit(limit)
							.where(and(eq(isGlobal, true), or(...conditions)));
					}

					console.log(data);
					if (!data || data.length === 0) {
						throw new ApiError(404, `${q}  not found`);
					}
					const safeData = data.map((item) => {
						const { developerId, isGlobal, expiresAt, ...rest } = item;
						return rest;
					});
					const response = ApiResponse({
						data: safeData,
						message: `${q} fetched successfully`,
						statusCode: 200,
					});
					return response;
				},
			}),

		create: async <T>(
			body: T,
			uniqueIdentifier: string,
			authHeader: string,
		) => {
			if (unique) {
				const existingData = await db
					.select()
					.from(Model)
					.where(eq(unique, uniqueIdentifier))
					.limit(1);

				if (existingData.length > 0) {
					throw new ApiError(
						400,
						`${unique.name} ${uniqueIdentifier} already exists`,
					);
				}
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
						.from(Model)
						.where(and(eq(developerId, userId)));

					if (alreadyCreated.length >= 10) {
						throw new ApiError(400, `already create 10 ${Model}`);
					}
					const createDataArray = await db
						.insert(Model)
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
					const devId = developerId.name;
					const { [devId]: _, isGlobal, expiresAt, ...safeData } = createData;

					const response = ApiResponse({
						data: safeData,
						message: `${modelName.slice(0, -1)} created successfully`,
						statusCode: 201,
					});
					return response;
				} catch (error) {
					console.error("Auth failed, falling back to mock mode");
					authFailError = "Auth failed, falling back to mock mode";
				}
			}
			// if auth failed fake data
			const createData = body;
			if (!createData) {
				return new ApiError(500, `unable to create ${modelName.slice(0, -1)}`);
			}
			const response = ApiResponse({
				data: createData,
				message: `${authHeader && authFailError} -- ${modelName.slice(0, -1)} created successfully`,
				statusCode: 201,
			});
			return response;
		},
	};
};

export default factory;
