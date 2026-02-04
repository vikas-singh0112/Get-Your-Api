import { bookService } from "../services/services";
import { ApiError } from "../utils/ApiError";
import { ICreateBookBody } from "../utils/interface";

export const helpRoute = async () => {
    return bookService.help();
};

export const getAllBooks = async (limit: number = 50) => {
    return bookService.getAll(limit);
};

export const getBookById = async (id: number) => {
    return bookService.getById(id);
};

export const searchBooks = async (q: string, limit: number = 10) => {
    if (!bookService.search) {
        throw new ApiError(400, "Search not available for this service");
    }
    return bookService.search(q, limit);
};

export const createBook = async (body: ICreateBookBody, unique: string) => {
    return bookService.create(body, unique);
};
