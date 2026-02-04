import { postService } from "../services/services";

export const helpRoute = async () => {
	return postService.help();
};
export const getAllPost = async (limit: number = 10) => {
	return postService.getAll(limit);
};

export const getPostById = async (id: number) => {
	return postService.getById(id);
};
