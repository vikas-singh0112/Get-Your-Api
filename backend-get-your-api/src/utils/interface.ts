import { PgDate } from "drizzle-orm/pg-core";

export interface ICreateUserBody {
	firstName: string;
	lastName: string;
	email: string;
	phoneNumber: string;
	role: string;
	birthDate: string;
	address: string;
	city: string;
	state: string;
	country: string;
	zipCode: string;
}

export interface ICreatePostBody {
	userId: number;
	post_image_url: string;
	content: string;
}
export interface ICreateActorBody {
	name: string;
	bio: string;
	nationality: string;
	birthDate: number;
	birthMonth: number;
	birthYear: number;
}
export interface ICreateAuthorBody {
	name: string;
	bio: string;
	nationality: string;
	birthDate: number;
	birthMonth: number;
	birthYear: number;
}
export interface ICreateBookBody {
	title: string;
	isbn: string;
	description: string;
	publishDate: string;
}
export interface ICreateClothesBody {}
export interface ICreateEventBody {}
export interface ICreateMessageBody {}
export interface ICreateMovieBody {}
export interface ICreateProductBody {}
export interface ICreateReviewBody {}
export interface ICreateShowBody {}
export interface ICreateTodoBody {
	uId: number;
	title: string;
	content: string;
	completed: boolean;
}
export interface ICreateTransactionBody {}
export interface ICreateConversationBody {}
