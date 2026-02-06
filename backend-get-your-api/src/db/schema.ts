import { SQL, sql } from "drizzle-orm";
import {
	integer,
	pgTable,
	varchar,
	timestamp,
	numeric,
	pgEnum,
	text,
	boolean,
	uuid,
	date,
} from "drizzle-orm/pg-core";

// these are actual users of our website
export const consumers = pgTable("consumers", {
	id: integer().primaryKey().generatedAlwaysAsIdentity(),

	firstName: varchar({ length: 30 }).notNull(),
	lastName: varchar({ length: 30 }).notNull(),
	email: varchar({ length: 30 }).notNull().unique(),
	clerkId: varchar().notNull().unique(),
	createdAt: timestamp("created_at").defaultNow().notNull(),
	updatedAt: timestamp("updated_at")
		.defaultNow()
		.$onUpdate(() => new Date())
		.notNull(),
});

export const users = pgTable("users", {
	id: integer().primaryKey().generatedAlwaysAsIdentity(),
	firstName: varchar({ length: 30 }).notNull(),
	lastName: varchar({ length: 30 }).notNull(),
	fullName: varchar({ length: 61 }).generatedAlwaysAs(
		(): SQL => sql`${users.firstName} || ' ' || ${users.lastName}`,
	),
	email: varchar({ length: 30 }).notNull().unique(),
	phoneNumber: varchar({ length: 20 }).notNull(),
	role: varchar({ length: 10 }).notNull(),
	birthDate: date("birth_date").notNull(),
	address: text().notNull(),
	city: varchar({ length: 30 }).notNull(),
	state: varchar({ length: 30 }).notNull(),
	country: varchar({ length: 30 }).notNull(),
	zipCode: varchar({ length: 6 }).notNull(),
	timezone: varchar({ length: 50 }).default("UTC"),
	createdAt: timestamp("created_at").defaultNow().notNull(),
	updatedAt: timestamp("updated_at")
		.defaultNow()
		.$onUpdate(() => new Date())
		.notNull(),
});

export const continentEnum = pgEnum("continent", [
	"Africa",
	"Antarctica",
	"Asia",
	"Europe",
	"North America",
	"Australia",
	"South America",
]);
export const countries = pgTable("countries", {
	id: integer().primaryKey().generatedAlwaysAsIdentity(),
	name: varchar({ length: 50 }).notNull(),
	capital: varchar({ length: 50 }).notNull(),
	continentId: integer("continent_id")
		.references(() => continents.id, { onDelete: "cascade" })
		.notNull(),
	createdAt: timestamp("created_at").defaultNow().notNull(),
	updatedAt: timestamp("updated_at")
		.defaultNow()
		.$onUpdate(() => new Date())
		.notNull(),
});

export const continents = pgTable("continents", {
	id: integer().primaryKey().generatedAlwaysAsIdentity(),
	name: continentEnum().notNull(),
	createdAt: timestamp("created_at").defaultNow().notNull(),
	updatedAt: timestamp("updated_at")
		.defaultNow()
		.$onUpdate(() => new Date())
		.notNull(),
});

export const planetEnum = pgEnum("planet", [
	"Mercury",
	"Venus",
	"Earth",
	"Mars",
	"Jupiter",
	"Saturn",
	"Uranus",
	"Neptune",
]);

export const planets = pgTable("planets", {
	id: integer().primaryKey().generatedAlwaysAsIdentity(),
	name: planetEnum().notNull(),
	distance_from_sun: varchar({ length: 50 }).notNull(),
	no_of_moons: varchar({ length: 50 }).notNull(),
	createdAt: timestamp("created_at").defaultNow().notNull(),
	updatedAt: timestamp("updated_at")
		.defaultNow()
		.$onUpdate(() => new Date())
		.notNull(),
});

export const categoryEnum = pgEnum("category", [
	"Electronics",
	"Clothing",
	"Home & Kitchen",
	"Books",
	"Beauty",
	"Sports",
]);

export const products = pgTable("products", {
	id: integer().primaryKey().generatedAlwaysAsIdentity(),
	productNo: varchar({ length: 50 }).notNull().unique(),
	name: varchar({ length: 50 }).notNull(),
	slug: varchar({ length: 50 }).notNull().unique(), // URL-friendly name (e.g., 'blue-t-shirt')
	description: text().notNull(),
	price: numeric({ precision: 10, scale: 2 }).notNull().default("0.00"),
	categoryId: integer("category_id")
		.references(() => productsCategories.id, { onDelete: "cascade" })
		.notNull(),
	stockQuantity: integer().default(0).notNull(),
	imageUrl: varchar({ length: 255 }).notNull(),
	createdAt: timestamp("created_at").defaultNow().notNull(),
	updatedAt: timestamp("updated_at")
		.defaultNow()
		.$onUpdate(() => new Date())
		.notNull(),
});

export const productsCategories = pgTable("productsCategories", {
	id: integer().primaryKey().generatedAlwaysAsIdentity(),
	productCategoryId: varchar({ length: 50 }).notNull().unique(),
	name: categoryEnum().notNull(),
	createdAt: timestamp("created_at").defaultNow().notNull(),
	updatedAt: timestamp("updated_at")
		.defaultNow()
		.$onUpdate(() => new Date())
		.notNull(),
});
export const clothes = pgTable("clothes", {
	id: integer().primaryKey().generatedAlwaysAsIdentity(),
	productNo: varchar({ length: 50 }).notNull().unique(),
	name: varchar({ length: 50 }).notNull(),
	description: text().notNull(),
	price: numeric({ precision: 10, scale: 2 }).notNull().default("0.00"),
	category: varchar({ length: 50 }).notNull(),
	stockQuantity: integer().default(0).notNull(),
	imageUrl: varchar({ length: 255 }).notNull(),
	createdAt: timestamp("created_at").defaultNow().notNull(),
	updatedAt: timestamp("updated_at")
		.defaultNow()
		.$onUpdate(() => new Date())
		.notNull(),
});

export const posts = pgTable("posts", {
	id: integer().primaryKey().generatedAlwaysAsIdentity(),
	userId: integer().notNull(),
	post_image_url: varchar({ length: 255 }).notNull(),
	content: text().notNull(),
	createdAt: timestamp("created_at").defaultNow().notNull(),
	updatedAt: timestamp("updated_at")
		.defaultNow()
		.$onUpdate(() => new Date())
		.notNull(),
});
export const comments = pgTable("comments", {
	id: integer().primaryKey().generatedAlwaysAsIdentity(),
	postId: integer("post_id")
		.references(() => posts.id, { onDelete: "cascade" })
		.notNull(),
	userId: integer("user_id")
		.references(() => users.id, { onDelete: "cascade" })
		.notNull(),
	content: text("content").notNull(),
	createdAt: timestamp("created_at").defaultNow().notNull(),
	updatedAt: timestamp("updated_at")
		.defaultNow()
		.$onUpdate(() => new Date())
		.notNull(),
});

export const likes = pgTable("likes", {
	id: integer().primaryKey().generatedAlwaysAsIdentity(),
	userId: integer("user_id")
		.references(() => users.id, { onDelete: "cascade" })
		.notNull(),
	postId: integer("post_id")
		.references(() => posts.id, { onDelete: "cascade" })
		.notNull(),
	createdAt: timestamp("created_at").defaultNow().notNull(),
});
export const conversations = pgTable("conversations", {
	id: integer().primaryKey().generatedAlwaysAsIdentity(),
	createdAt: timestamp("created_at").defaultNow().notNull(),
	updatedAt: timestamp("updated_at")
		.defaultNow()
		.$onUpdate(() => new Date())
		.notNull(),
});

export const participants = pgTable("participants", {
	id: integer().primaryKey().generatedAlwaysAsIdentity(),
	conversationId: integer("conversation_id")
		.references(() => conversations.id, { onDelete: "cascade" })
		.notNull(),
	userId: integer("user_id")
		.references(() => users.id, { onDelete: "cascade" })
		.notNull(),
	joinedAt: timestamp("joined_at").defaultNow().notNull(),
});

export const messages = pgTable("messages", {
	id: integer().primaryKey().generatedAlwaysAsIdentity(),
	conversationId: integer("conversation_id")
		.references(() => conversations.id, { onDelete: "cascade" })
		.notNull(),
	senderId: integer("sender_id")
		.references(() => users.id, { onDelete: "cascade" })
		.notNull(),
	content: text().notNull(),
	isRead: boolean("is_read").default(false).notNull(),
	createdAt: timestamp("created_at").defaultNow().notNull(),
});
export const reviews = pgTable("reviews", {
	id: integer().primaryKey().generatedAlwaysAsIdentity(),
	stars: integer().notNull().default(0),
	comment: text().notNull(),
	createdAt: timestamp("created_at").defaultNow().notNull(),
	updatedAt: timestamp("updated_at")
		.defaultNow()
		.$onUpdate(() => new Date())
		.notNull(),
});
export const todos = pgTable("todos", {
	id: integer().primaryKey().generatedAlwaysAsIdentity(),
	userId: integer().notNull(),
	title: varchar({ length: 255 }).notNull(),
	content: text().notNull(),
	completed: boolean().default(false).notNull(),
	createdAt: timestamp("created_at").defaultNow().notNull(),
	updatedAt: timestamp("updated_at")
		.defaultNow()
		.$onUpdate(() => new Date())
		.notNull(),
});

export const eventModeEnum = pgEnum("event_mode", [
	"In-Person",
	"Virtual",
	"Hybrid",
]);
export const events = pgTable("events", {
	id: integer().primaryKey().generatedAlwaysAsIdentity(),
	userId: integer().notNull(),
	title: varchar({ length: 50 }).notNull(),
	mode: eventModeEnum().notNull(),
	description: text().notNull(),
	venue: text().notNull(),
	duration: varchar({ length: 50 }).notNull(),
	time: varchar({ length: 50 }).notNull(),
	createdAt: timestamp("created_at").defaultNow().notNull(),
	updatedAt: timestamp("updated_at")
		.defaultNow()
		.$onUpdate(() => new Date())
		.notNull(),
});

export const transactionStatusEnum = pgEnum("transaction_status", [
	"Pending",
	"Completed",
	"Failed",
	"Refunded",
]);

export const paymentMethodEnum = pgEnum("payment_method", [
	"Credit Card",
	"PayPal",
	"Stripe",
	"Bank Transfer",
	"Crypto",
]);

export const transactionTypeEnum = pgEnum("transaction_type", [
	"Income", // Money received (e.g., a sale or top-up)
	"Expense", // Money spent (e.g., buying a product or paying a fee)
	"Transfer", // Moving money between accounts (optional but useful)
]);

export const transactions = pgTable("transactions", {
	id: integer().primaryKey().generatedAlwaysAsIdentity(),
	transactionNo: uuid().unique(),
	userId: integer("user_id")
		.references(() => users.id)
		.notNull(),
	type: transactionTypeEnum().notNull(),
	amount: numeric({ precision: 12, scale: 2 }).notNull(),
	status: transactionStatusEnum().default("Pending").notNull(),
	description: text().notNull(),
	createdAt: timestamp("created_at").defaultNow().notNull(),
	updatedAt: timestamp("updated_at")
		.defaultNow()
		.$onUpdate(() => new Date())
		.notNull(),
});

export const movies = pgTable("movies", {
	id: integer().primaryKey().generatedAlwaysAsIdentity(),
	title: varchar({ length: 255 }).notNull(),
	releaseYear: date("release_year").notNull(),
	genre: varchar({ length: 100 }),
	createdAt: timestamp("created_at").defaultNow().notNull(),
	updatedAt: timestamp("updated_at")
		.defaultNow()
		.$onUpdate(() => new Date())
		.notNull(),
});
export const movies_cast = pgTable("movies_cast", {
	id: integer().primaryKey().generatedAlwaysAsIdentity(),
	actorId: integer("actor_id")
		.references(() => actors.id, { onDelete: "cascade" })
		.notNull(),
	movieId: integer("movie_id")
		.references(() => movies.id, { onDelete: "cascade" })
		.notNull(),
	roleName: varchar("role_name", { length: 255 }),
	createdAt: timestamp("created_at").defaultNow().notNull(),
	updatedAt: timestamp("updated_at")
		.defaultNow()
		.$onUpdate(() => new Date())
		.notNull(),
});
export const shows = pgTable("shows", {
	id: integer().primaryKey().generatedAlwaysAsIdentity(),
	title: varchar({ length: 255 }).notNull(),
	releaseYear: date("release_year").notNull(),
	genre: varchar({ length: 100 }),
	createdAt: timestamp("created_at").defaultNow().notNull(),
	updatedAt: timestamp("updated_at")
		.defaultNow()
		.$onUpdate(() => new Date())
		.notNull(),
});

export const shows_cast = pgTable("shows_cast", {
	id: integer().primaryKey().generatedAlwaysAsIdentity(),
	actorId: integer("actor_id")
		.references(() => actors.id, { onDelete: "cascade" })
		.notNull(),
	showId: integer("show_id")
		.references(() => shows.id, { onDelete: "cascade" })
		.notNull(),
	roleName: varchar("role_name", { length: 255 }),
	createdAt: timestamp("created_at").defaultNow().notNull(),
	updatedAt: timestamp("updated_at")
		.defaultNow()
		.$onUpdate(() => new Date())
		.notNull(),
});
export const actors = pgTable("actors", {
	id: integer().primaryKey().generatedAlwaysAsIdentity(),
	name: varchar({ length: 255 }).notNull(),
	bio: text(),
	nationality: varchar({ length: 50 }),
	birthDate: date("birth_date").notNull(),
	createdAt: timestamp("created_at").defaultNow().notNull(),
	updatedAt: timestamp("updated_at")
		.defaultNow()
		.$onUpdate(() => new Date())
		.notNull(),
});
export const books = pgTable("books", {
	id: integer().primaryKey().generatedAlwaysAsIdentity(),
	title: varchar({ length: 255 }).notNull(),
	isbn: varchar({ length: 13 }).unique().notNull(),
	description: text().notNull(),
	publishDate: date("publish_date").notNull(),
	createdAt: timestamp("created_at").defaultNow().notNull(),
	updatedAt: timestamp("updated_at")
		.defaultNow()
		.$onUpdate(() => new Date())
		.notNull(),
});

export const authors = pgTable("authors", {
	id: integer().primaryKey().generatedAlwaysAsIdentity(),
	name: varchar({ length: 255 }).notNull(),
	bio: text(),
	nationality: varchar({ length: 50 }),
	birthDate: date("birth_date").notNull(),
	createdAt: timestamp("created_at").defaultNow().notNull(),
	updatedAt: timestamp("updated_at")
		.defaultNow()
		.$onUpdate(() => new Date())
		.notNull(),
});

export const booksToAuthors = pgTable("books_to_authors", {
	id: integer().primaryKey().generatedAlwaysAsIdentity(),
	bookId: integer("book_id")
		.references(() => books.id, { onDelete: "cascade" })
		.notNull(),
	authorId: integer("author_id")
		.references(() => authors.id, { onDelete: "cascade" })
		.notNull(),

	authorOrder: integer("author_order").default(1),
});
