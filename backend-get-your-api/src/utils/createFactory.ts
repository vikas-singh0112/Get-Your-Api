import { PgColumn, PgTable } from "drizzle-orm/pg-core";
import { db } from "../db";
import { eq, ilike, or } from "drizzle-orm";
import { ApiError } from "./ApiError";
import { ApiResponse } from "./response";
import { app } from "../App";
import { ICreateUserBody } from "./interface";

type Props = {
	Model: PgTable;
	idColumn: PgColumn;
	queryColumn?: PgColumn[];
	unique?: PgColumn;
	modelName: string;
};

const factory = ({
	Model,
	modelName,
	idColumn,
	queryColumn,
	unique,
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
			console.log(data);
			return response;
		},

		getAll: async (limit: number) => {
			const data = await db.select().from(Model).limit(limit);
			if (!data || data.length === 0) {
				throw new ApiError(404, `${modelName}  not found`);
			}
			const response = ApiResponse({
				data: data,
				message: `${modelName} fetched successfully`,
				statusCode: 200,
			});
			return response;
		},

		getById: async (id: number) => {
			const data = await db.select().from(Model).where(eq(idColumn, id));
			if (!data || data.length === 0) {
				throw new ApiError(404, `${id} not found`);
			}
			const response = ApiResponse({
				data: data,
				message: `${id} fetched successfully`,
				statusCode: 200,
			});
			return response;
		},

		// search
		...(queryColumn &&
			queryColumn.length > 0 && {
				search: async (q: string, limit: number) => {
					const conditions = queryColumn.map((col) => ilike(col, `%${q}%`));
					const data = await db
						.select()
						.from(Model)
						.limit(limit)
						.where(or(...conditions));
					console.log(data);
					if (!data || data.length === 0) {
						throw new ApiError(404, `${q}  not found`);
					}
					const response = ApiResponse({
						data: data,
						message: `${q} fetched successfully`,
						statusCode: 200,
					});
					return response;
				},
			}),

		create: async (body: ICreateUserBody, uniqueIdentifier: string) => {
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
			// later for persitant data if user signin data will be stored for 24 hours for a 
			// specifc user and user can create 100 a day 

			// const createData = await db.insert(Model).values(body);
			const createData = body;
			if (!createData) {
				return new ApiError(500, `unable to create ${modelName.slice(0,-1)}`);
			}
			const response = ApiResponse({
				data: createData,
				message: `${modelName.slice(0,-1)} created successfully`,
				statusCode: 201,
			});
			return response;
		},
	};
};

export default factory;
