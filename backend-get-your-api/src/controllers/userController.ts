import { userService } from "../services/services";
import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/response";

export const getAllUsers = async () => {
	const users = await userService.getAll();
	if (!users || users.length === 0) {
		throw new ApiError(404, "users not found");
	}
	const response = ApiResponse({
		data: users,
		message: "users fetched successfully",
		statusCode: 200,
	});

	return response;
};
