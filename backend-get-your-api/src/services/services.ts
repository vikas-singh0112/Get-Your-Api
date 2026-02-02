import { posts, products, users } from "../db/schema";
import factory from "../utils/createFactory";

export const userService = factory({
	Model: users,
	idColumn: users.id,
	queryColumn: [users.fullName, users.firstName, users.lastName],
});

export const postService = factory({
	Model: posts,
	idColumn: posts.id,
});

export const productService = factory({
	Model: products,
	idColumn: products.id,
	queryColumn: [products.name],
});
