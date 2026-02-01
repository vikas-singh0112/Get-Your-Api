import { postService } from "../services/services";
import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/response";

export const getAllPost = async () => {
	const posts = await postService.getAll();
	if (!posts || posts.length === 0) {
		throw new ApiError(404, "posts not found");
	}
	const response = ApiResponse({
		data: posts,
		message: "posts fetched successfully",
		statusCode: 200,
	});

	return response;
};
