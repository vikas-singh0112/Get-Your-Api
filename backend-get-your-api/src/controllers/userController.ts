import { userService } from "../services/services";
import { ApiError } from "../utils/ApiError";
import { ICreateUserBody } from "../utils/interface";

export const helpRoute = async () => {
	return userService.help();
};

export const getAllUsers = async (limit: number = 50, scope:string = "global", authHeader:string) => {
	return userService.getAll(limit, scope, authHeader);
};

export const getUserById = async (id: number, scope:string = "global",authHeader: string) => {
	return userService.getById(id,scope, authHeader);
};

export const searchUser = async (user: string, limit: number = 10,scope: string = "global", authHeader:string) => {
	if (!userService.search) {
		throw new ApiError(400, "Search not available for this service");
	}
	return userService.search(user, limit,scope, authHeader);
};

export const createUser = async (body: ICreateUserBody, unique: string, authHeader:string) => {
	body = {
		firstName: body.firstName.toLocaleLowerCase(),
		lastName: body.lastName.toLocaleLowerCase(),
		email: body.email.toLocaleLowerCase(),
		birthDate: body.birthDate.toLocaleLowerCase(),
		phoneNumber: body.phoneNumber,
		role: body.role.toLocaleLowerCase(),
		address: body.address.toLocaleLowerCase(),
		city: body.city.toLocaleLowerCase(),
		state: body.state.toLocaleLowerCase(),
		country: body.country.toLocaleLowerCase(),
		zipCode: body.zipCode.toLocaleLowerCase(),
	};
	return userService.create(body, unique, authHeader);
};
