import { posts, users } from "../db/schema";
import factory from "../utils/createFactory";

export const userService = factory(users, users.id);

export const postService = factory(posts, posts.id);
