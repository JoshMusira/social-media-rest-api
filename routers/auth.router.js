import { Router } from "express";
import { LoginUser, RegisterUser } from "../controllers/auth.controller.js";

export const authRouter = Router();

authRouter.post("/auth/register", RegisterUser);
authRouter.post("/auth/login", LoginUser)