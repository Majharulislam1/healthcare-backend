import { Request, Response } from "express";
import catchAsync from "../../shared/catchAsync";
import { userService } from "./user.service";
import sendResponse from "../../shared/sendResponse";




const createUserControllers = catchAsync(async (req: Request, res: Response) => {
       const result = await userService.createPaeitentService(req.body);
       
       sendResponse(res,{
             statusCode:201,
             success:true,
             message:'Paeitent create successfully',
             data:result
       })

})




export const UserControllers = {
    createUserControllers,
}