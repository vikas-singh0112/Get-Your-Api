import { postService } from "../services/services";

export const getAllPost = async (limit: number | undefined) => {
	return postService.getAll("posts", limit);
};
