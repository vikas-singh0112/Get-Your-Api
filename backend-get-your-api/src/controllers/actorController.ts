import { actorService } from "../services/services";
import { ApiError } from "../utils/ApiError";
import { ICreateActorBody } from "../utils/interface";

export const helpRoute = async () => {
	return actorService.help();
};

export const getAllActors = async (limit: number = 50) => {
	return actorService.getAll(limit);
};

export const getActorById = async (id: number) => {
	return actorService.getById(id);
};

export const searchActor = async (q: string, limit: number = 10) => {
	if (!actorService.search) {
		throw new ApiError(400, "Search not available for this service");
	}
	return actorService.search(q, limit);
};

export const createActor = async (body: ICreateActorBody, unique: string) => {
	return actorService.create(body, unique);
};
