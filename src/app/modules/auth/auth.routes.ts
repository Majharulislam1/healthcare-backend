import { Router } from "express";
import { authControllers } from "./auth.controllers";


export const authRoutes = Router();

authRoutes.post("/login",authControllers.userLoginControllers);