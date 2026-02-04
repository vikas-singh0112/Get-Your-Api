import { clothService } from "../services/services";
import { ApiError } from "../utils/ApiError";
import { ICreateClothesBody } from "../utils/interface";

export const helpRoute = async () => {
	return clothService.help();
};

export const getAllClothes = async (limit: number = 50) => {
	return clothService.getAll(limit);
};

export const getClothById = async (id: number) => {
	return clothService.getById(id);
};

export const searchClothes = async (q: string, limit: number = 10) => {
	if (!clothService.search) {
		throw new ApiError(400, "Search not available for this service");
	}
	return clothService.search(q, limit);
};

export const createCloth = async (body: ICreateClothesBody, unique: string) => {
	return clothService.create(body, unique);
};
