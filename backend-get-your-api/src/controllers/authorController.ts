import { authorService } from "../services/services";
import { ApiError } from "../utils/ApiError";
import { ICreateAuthorBody } from "../utils/interface";

export const helpRoute = async () => {
	return authorService.help();
};

export const getAllAuthors = async (limit: number = 50) => {
	return authorService.getAll(limit);
};

export const getAuthorById = async (id: number) => {
	return authorService.getById(id);
};

export const searchAuthors = async (q: string, limit: number = 10) => {
	if (!authorService.search) {
		throw new ApiError(400, "Search not available for this service");
	}
	return authorService.search(q, limit);
};

export const createAuthor = async (body: ICreateAuthorBody, unique: string) => {
	return authorService.create(body, unique);
};
