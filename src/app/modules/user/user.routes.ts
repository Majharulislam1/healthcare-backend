import { Router } from "express";
import { UserControllers } from "./user.controllers";


export const userRoute = Router();

userRoute.post('/create-patient', UserControllers.createUserControllers);

