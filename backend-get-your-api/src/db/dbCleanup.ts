import { and, isNotNull, lt } from "drizzle-orm";
import { db } from ".";
import {
	actors,
	authors,
	books,
	booksToAuthors,
	clothes,
	comments,
	continents,
	conversations,
	countries,
	events,
	likes,
	messages,
	movies,
	movies_cast,
	participants,
	planets,
	posts,
	products,
	productsCategories,
	reviews,
	shows,
	shows_cast,
	todos,
	transactions,
	users,
} from "./schema";

// Add this at the bottom of your schema file or in your cleanup utility
export const autoDeleteTables = [
	// Junction/Child tables first
	booksToAuthors,
	movies_cast,
	shows_cast,
	participants,
	messages,
	comments,
	likes,

	// Independent/Parent tables
	posts,
	todos,
	events,
	transactions,
	reviews,
	books,
	authors,
	movies,
	shows,
	actors,
	products,
	clothes,
	countries,
	planets,

	// Root tables (referenced by many others)
	productsCategories,
	continents,
	users,
];

export const cleanDatabase = async () => {
	const now = new Date();
	console.log(`cleanup started at ${now.toLocaleTimeString()}`);

	try {
		for (const table of autoDeleteTables) {
			const result = await db
				.delete(table)
				.where(and(isNotNull(table.expiresAt), lt(table.expiresAt, now)));
		}
        console.log(`✅ Database is clean.`);
	} catch (error) {
        console.error(`❌ Error during cleanup:`, error);
    }
};
