import { conversationService } from "../services/services";
import { ApiError } from "../utils/ApiError";
import { ICreateConversationBody, ICreateUserBody } from "../utils/interface";

export const helpRoute = async () => {
    return conversationService.help();
};

export const getAllConversations = async (limit: number = 50) => {
    return conversationService.getAll(limit);
};

export const getConversationById = async (id: number) => {
    return conversationService.getById(id);
};

export const createUser = async (body: ICreateConversationBody, unique: string, authHeader:string) => {
    return conversationService.create(body, unique, authHeader);
};
