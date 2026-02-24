import Elysia, { t } from "elysia";

import { contact } from "../controllers/contactController";

export const contactRouter = new Elysia();

contactRouter.post("/contact", ({body}) => {
    return contact(body);
}, {
    body: t.Object({
        name: t.String(),
        email: t.String(),
        subject: t.String(),
        message: t.String()
    })
});
