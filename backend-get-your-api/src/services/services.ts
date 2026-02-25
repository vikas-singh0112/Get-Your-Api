import {
	actors,
	authors,
	books,
	clothes,
	continents,
	conversations,
	countries,
	events,
	messages,
	movies,
	planets,
	posts,
	products,
	shows,
	todos,
	transactions,
	users,
} from "../db/schema";
import factory from "../utils/createFactory";


export const actorService = factory({
	Model: actors,
	modelName: "actors",
	idColumn: actors.id,
	queryColumn: [actors.name],
	developerId: actors.developerId,
	isGlobal: actors.isGlobal
});
export const authorService = factory({
	Model: authors,
	modelName: "authors",
	idColumn: authors.id,
	queryColumn: [authors.name],
	developerId: authors.developerId,
	isGlobal: authors.isGlobal
});
export const bookService = factory({
	Model: books,
	modelName: "books",
	idColumn: books.id,
	queryColumn: [books.title, books.isbn, books.publishDate],
	// unique: books.title,
	developerId: books.developerId,
	isGlobal: books.isGlobal
});
export const clothService = factory({
	Model: clothes,
	modelName: "clothes",
	idColumn: clothes.id,
	queryColumn: [clothes.name, clothes.productNo],
	// unique: clothes.productNo,
	developerId: clothes.developerId,
	isGlobal: clothes.isGlobal
});
export const continentService = factory({
	Model: continents,
	modelName: "continents",
	idColumn: continents.id,
	queryColumn: [continents.name],
	developerId: continents.developerId,
	isGlobal: continents.isGlobal
});

export const conversationService = factory({
	Model: conversations,
	modelName: "conversations",
	idColumn: conversations.id,
	// leave unique for now
	developerId: conversations.developerId,
	isGlobal: conversations.isGlobal
});
export const countryService = factory({
	Model: countries,
	modelName: "countries",
	idColumn: countries.id,
	queryColumn: [countries.name],
	developerId: countries.developerId,
	isGlobal: countries.isGlobal
});
export const eventService = factory({
	Model: events,
	modelName: "events",
	idColumn: events.id,
	queryColumn: [events.title],
	// unique: events.title,
	developerId: events.developerId,
	isGlobal: events.isGlobal
});

export const messageService = factory({
	Model: messages,
	modelName: "messages",
	idColumn: messages.id,
	queryColumn: [messages.senderId, messages.conversationId],
	// leave unique for now
	developerId: messages.developerId,
	isGlobal: messages.isGlobal
});
export const movieService = factory({
	Model: movies,
	modelName: "movies",
	idColumn: movies.id,
	queryColumn: [movies.title],
	// unique: movies.title,
	developerId: movies.developerId,
	isGlobal: movies.isGlobal
});
export const planetService = factory({
	Model: planets,
	modelName: "planets",
	idColumn: planets.id,
	queryColumn: [planets.name],
	developerId: planets.developerId,
	isGlobal: planets.isGlobal
});

export const postService = factory({
	Model: posts,
	modelName: "posts",
	idColumn: posts.id,
	developerId: posts.developerId,
	isGlobal: posts.isGlobal
});

export const productService = factory({
	Model: products,
	modelName: "products",
	idColumn: products.id,
	queryColumn: [products.name, products.productNo],
	// unique: products.productNo,
	developerId: products.developerId,
	isGlobal: products.isGlobal
});
export const showService = factory({
	Model: shows,
	modelName: "shows",
	idColumn: shows.id,
	queryColumn: [shows.title],
	// unique: shows.title,
	developerId: shows.developerId,
	isGlobal: shows.isGlobal
});
export const todoService = factory({
	Model: todos,
	modelName: "todos",
	idColumn: todos.id,
	userIdColumn: todos.userId,
	queryColumn: [todos.title],
	// unique: todos.title,
	developerId: todos.developerId,
	isGlobal: todos.isGlobal
});

export const transactionService = factory({
	Model: transactions,
	modelName: "transactions",
	idColumn: transactions.id,
	// unique: transactions.transactionNo,
	developerId: transactions.developerId,
	isGlobal: transactions.isGlobal
});

export const userService = factory({
	Model: users,
	modelName: "users",
	idColumn: users.id,
	queryColumn: [users.fullName, users.firstName, users.lastName],
	// unique: users.email,
	developerId: users.developerId,
	isGlobal: users.isGlobal
});
