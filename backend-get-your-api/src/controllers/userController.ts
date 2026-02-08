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

export const searchUser = async (user: string, limit: number = 10) => {
	if (!userService.search) {
		throw new ApiError(400, "Search not available for this service");
	}
	return userService.search(user, limit);
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
