import {createClerkClient, verifyToken} from "@clerk/backend";
import Elysia from "elysia";

const clerk = createClerkClient({secretKey: process.env.CLERK_SECRET_KEY})

export const auth = new Elysia({name: 'auth'})

auth.derive(async ({request, set}) => {
  const authHeader = request.headers.get("authorization");
  
  const token = authHeader?.replace("Bearer ", "");
  
  if (!token) {
    set.status = 401;
    throw new Error("Unauthorized: No token provided");
  }
  
  
  try {
    const session = await verifyToken(token, {
      secretKey: process.env.CLERK_SECRET_KEY,
    });
    return {
      userId: session.sub,
      session
    };
  } catch (error) {
    set.status = 401;
    throw new Error("Unauthorized: Invalid or expired token");
  }
});