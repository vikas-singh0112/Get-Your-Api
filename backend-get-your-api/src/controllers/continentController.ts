import { continentService } from "../services/services";
import { ApiError } from "../utils/ApiError";

export const helpRoute = async () => {
	return continentService.help();
};

export const getAllContinents = async (limit: number = 7) => {
	return continentService.getAll(limit);
};

export const getContinentById = async (id: number) => {
	return continentService.getById(id);
};

export const searchContinents = async (q: string, limit: number = 10) => {
	if (!continentService.search) {
		throw new ApiError(400, "Search not available for this service");
	}
	return continentService.search(q, limit);
};
