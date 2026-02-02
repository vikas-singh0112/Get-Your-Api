import { userService } from "../services/services";
import { ApiError } from "../utils/ApiError";

export const getAllUsers = async (limit: number = 50) => {
	return userService.getAll("users", limit);
};

export const getUserById = async () => {};

export const searchUser = async (q: string, limit:number = 10) => {
	if (!userService.search) {
		throw new ApiError(400, "Search not available for this service");
	}
	return userService.search(q, limit);
};
