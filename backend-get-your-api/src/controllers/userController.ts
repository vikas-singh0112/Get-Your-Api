import { userService } from "../services/services";
import { ApiError } from "../utils/ApiError";
import { ICreateUserBody } from "../utils/interface";

export const helpRoute = async () => {
	return userService.help();
};

export const getAllUsers = async (limit: number = 50) => {
	return userService.getAll(limit);
};

export const getUserById = async (id: number) => {
	return userService.getById(id);
};

export const searchUser = async (q: string, limit: number = 10) => {
	if (!userService.search) {
		throw new ApiError(400, "Search not available for this service");
	}
	return userService.search(q, limit);
};

export const createUser = async (body: ICreateUserBody, unique: string) => {
	return userService.create(body, unique);
};
