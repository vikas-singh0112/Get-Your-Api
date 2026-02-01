import { PgColumn, PgTable } from "drizzle-orm/pg-core";
import { db } from "../db";
import { eq } from "drizzle-orm";

const factory = (Model: PgTable,  idColumn: PgColumn) => {
    return {
        getAll: async () => {
           return  await db.select().from(Model);
        },

        getById: async(id: number) => {
            return await db.select().from(Model).where(eq(idColumn, id));
        }
    }
}

export default factory;