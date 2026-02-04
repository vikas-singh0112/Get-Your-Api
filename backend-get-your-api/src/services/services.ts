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
});
export const authorService = factory({
	Model: authors,
	modelName: "authors",
	idColumn: authors.id,
	queryColumn: [authors.name],
});
export const bookService = factory({
	Model: books,
	modelName: "books",
	idColumn: books.id,
	queryColumn: [books.title],
	unique: books.title
});
export const clothService = factory({
	Model: clothes,
	modelName: "clothes",
	idColumn: clothes.id,
	queryColumn: [clothes.name, clothes.productNo],
	unique: clothes.productNo
});
export const continentService = factory({
	Model: continents,
	modelName: "continents",
	idColumn: continents.id,
	queryColumn: [continents.name],
});

export const conversationService = factory({
	Model: conversations,
	modelName: "conversations",
	idColumn: conversations.id,
	// leave unique for now
});
export const countryService = factory({
	Model: countries,
	modelName: "countries",
	idColumn: countries.id,
	queryColumn: [countries.name],
});
export const eventService = factory({
	Model: events,
	modelName: "events",
	idColumn: events.id,
	queryColumn: [events.title],
	unique: events.title,
});

export const messageService = factory({
	Model: messages,
	modelName: "messages",
	idColumn: messages.id,
	queryColumn: [messages.senderId, messages.conversationId],
	// leave unique for now
});
export const movieService = factory({
	Model: movies,
	modelName: "movies",
	idColumn: movies.id,
	queryColumn: [movies.title],
	unique: movies.title,
});
export const planetService = factory({
	Model: planets,
	modelName: "planets",
	idColumn: planets.id,
	queryColumn: [planets.name],
});

export const postService = factory({
	Model: posts,
	modelName: "posts",
	idColumn: posts.id,
});

export const productService = factory({
	Model: products,
	modelName: "products",
	idColumn: products.id,
	queryColumn: [products.name, products.productNo],
	unique: products.productNo,
});
export const showService = factory({
	Model: shows,
	modelName: "shows",
	idColumn: shows.id,
	queryColumn: [shows.title],
	unique: shows.title,
});
export const todoService = factory({
	Model: todos,
	modelName: "todos",
	idColumn: todos.id,
	queryColumn: [todos.title],
	unique: todos.title,
});

export const transactionService = factory({
	Model: transactions,
	modelName: "transactions",
	idColumn: transactions.id,
	unique: transactions.transactionNo,
});

export const userService = factory({
	Model: users,
	modelName: "users",
	idColumn: users.id,
	queryColumn: [users.fullName, users.firstName, users.lastName],
	unique: users.email,
});
