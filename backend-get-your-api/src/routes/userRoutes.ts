import Elysia from "elysia";
import { getAllUsers } from "../controllers/userController";

 export const userRouter = new Elysia();
 
 userRouter.get("/getAll", () => getAllUsers());