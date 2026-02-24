import { Request, Response } from "express";
import catchAsync from "../../shared/catchAsync";




const createUserControllers = catchAsync(async (req: Request, res: Response) => {
    console.log("test api:", req.body);
})




export const UserControllers = {
    createUserControllers,
}