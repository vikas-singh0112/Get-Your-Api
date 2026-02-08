import Elysia, { t } from "elysia";

import { createCloth, getAllClothes, getClothById, helpRoute, searchClothes } from "../controllers/clothesController";

export const clothRouter = new Elysia();

clothRouter.get("/help", () => helpRoute());

clothRouter.get(
    "/",
    ({ query }) => {
        const { limit } = query;
        return getAllClothes(limit);
    },
    {
        query: t.Object({
            limit: t.Optional(t.Numeric({ default: 50 })),
        }),
    },
);

clothRouter.get(
    "/:id",
    ({ params }) => {
        const { id } = params;
        return getClothById(id);
    },
    {
        params: t.Object({
            id: t.Numeric(),
        }),
    },
);

clothRouter.get(
    "/search",
    ({ query }) => {
        const { cloth, limit } = query;
        return searchClothes(cloth, limit);
    },
    {
        query: t.Object({
            cloth: t.String(),
            limit: t.Optional(t.Numeric({ default: 10 })),
        }),
    },
);

clothRouter.post(
    "/create",
    ({ body,headers }) => {
        console.log("headers here",headers)
        const authHeader = headers.authorization || "";
        return createCloth(body, body.email, authHeader);
    },
    {
        body: t.Object({
            firstName: t.String({ minLength: 2, maxLength: 30 }),
            lastName: t.String({ minLength: 2, maxLength: 30 }),
            email: t.String(),
            birthDate: t.String(),
            phoneNumber: t.String({ minLength: 7, maxLength: 20 }),
            role: t.String({ minLength: 4, maxLength: 10 }),
            address: t.String({ minLength: 5 }),
            city: t.String({minLength:2, maxLength:30}),
            state: t.String({ minLength: 2, maxLength: 30 }),
            country: t.String({ minLength: 4, maxLength: 30 }),
            zipCode: t.String({ minLength: 4, maxLength: 6 }),
        }),
    },
);
