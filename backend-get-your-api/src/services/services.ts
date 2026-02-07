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

/* 
done tasks {
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
	}

remaining task {
	conversation message booktoauthor participants
	}

*/

export const actorService = factory({
	Model: actors,
	modelName: "actors",
	idColumn: actors.id,
	queryColumn: [actors.name],
	developerId: actors.developerId
});
export const authorService = factory({
	Model: authors,
	modelName: "authors",
	idColumn: authors.id,
	queryColumn: [authors.name],
	developerId: authors.developerId
});
export const bookService = factory({
	Model: books,
	modelName: "books",
	idColumn: books.id,
	queryColumn: [books.title, books.isbn, books.publishDate],
	unique: books.title,
	developerId: books.developerId
});
export const clothService = factory({
	Model: clothes,
	modelName: "clothes",
	idColumn: clothes.id,
	queryColumn: [clothes.name, clothes.productNo],
	unique: clothes.productNo,
	developerId: clothes.developerId
});
export const continentService = factory({
	Model: continents,
	modelName: "continents",
	idColumn: continents.id,
	queryColumn: [continents.name],
	developerId: continents.developerId
});

export const conversationService = factory({
	Model: conversations,
	modelName: "conversations",
	idColumn: conversations.id,
	// leave unique for now
	developerId: conversations.developerId
});
export const countryService = factory({
	Model: countries,
	modelName: "countries",
	idColumn: countries.id,
	queryColumn: [countries.name],
	developerId: countries.developerId
});
export const eventService = factory({
	Model: events,
	modelName: "events",
	idColumn: events.id,
	queryColumn: [events.title],
	unique: events.title,
	developerId: events.developerId
});

export const messageService = factory({
	Model: messages,
	modelName: "messages",
	idColumn: messages.id,
	queryColumn: [messages.senderId, messages.conversationId],
	// leave unique for now
	developerId: messages.developerId
});
export const movieService = factory({
	Model: movies,
	modelName: "movies",
	idColumn: movies.id,
	queryColumn: [movies.title],
	unique: movies.title,
	developerId: movies.developerId
});
export const planetService = factory({
	Model: planets,
	modelName: "planets",
	idColumn: planets.id,
	queryColumn: [planets.name],
	developerId: planets.developerId
});

export const postService = factory({
	Model: posts,
	modelName: "posts",
	idColumn: posts.id,
	developerId: posts.developerId
});

export const productService = factory({
	Model: products,
	modelName: "products",
	idColumn: products.id,
	queryColumn: [products.name, products.productNo],
	unique: products.productNo,
	developerId: products.developerId
});
export const showService = factory({
	Model: shows,
	modelName: "shows",
	idColumn: shows.id,
	queryColumn: [shows.title],
	unique: shows.title,
	developerId: shows.developerId
});
export const todoService = factory({
	Model: todos,
	modelName: "todos",
	idColumn: todos.id,
	queryColumn: [todos.title],
	unique: todos.title,
	developerId: todos.developerId
});

export const transactionService = factory({
	Model: transactions,
	modelName: "transactions",
	idColumn: transactions.id,
	unique: transactions.transactionNo,
	developerId: transactions.developerId
});

export const userService = factory({
	Model: users,
	modelName: "users",
	idColumn: users.id,
	queryColumn: [users.fullName, users.firstName, users.lastName],
	unique: users.email,
	developerId: users.developerId
});
