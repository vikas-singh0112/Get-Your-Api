import { PgColumn, PgTable } from "drizzle-orm/pg-core";
import { db } from "../db";
import { eq, ilike, or } from "drizzle-orm";
import { ApiError } from "./ApiError";
import { ApiResponse } from "./response";

type Props = {
	Model: PgTable;
	idColumn: PgColumn;
	queryColumn?: PgColumn[];
};

const factory = ({ Model, idColumn, queryColumn }: Props) => {
	return {
		getAll: async (title: string, limit: number) => {
			const data = await db
				.select()
				.from(Model)
				.limit(limit);
			if (!data || data.length === 0) {
				throw new ApiError(404, `${title}  not found`);
			}
			const response = ApiResponse({
				data: data,
				message: `${title} fetched successfully`,
				statusCode: 200,
			});
			return response;
		},

		getById: async (id: number) => {
			return await db.select().from(Model).where(eq(idColumn, id));
		},

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
	};
};

export default factory;
