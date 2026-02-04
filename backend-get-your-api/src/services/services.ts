import { posts, products, users } from "../db/schema";
import factory from "../utils/createFactory";

export const userService = factory({
	Model: users,
	modelName: "users",
	idColumn: users.id,
	queryColumn: [users.fullName, users.firstName, users.lastName],
	unique: users.email,
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
	queryColumn: [products.name],
});
