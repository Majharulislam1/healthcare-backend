import { Request, Response } from "express";
import catchAsync from "../../shared/catchAsync";
import { userService } from "./user.service";
import sendResponse from "../../shared/sendResponse";




const createUserControllers = catchAsync(async (req: Request, res: Response) => {
    const result = await userService.createPaeitentService(req);

    sendResponse(res, {
        statusCode: 201,
        success: true,
        message: 'Paeitent create successfully',
        data: result
    })

})


const getallUserControllers = catchAsync(async (req: Request, res: Response) => {

    const limit = req.query.limit;
    const page = req.query.page;


    const result = await userService.getallUserService({limit:Number(limit),page:Number(page)});




    sendResponse(res, {
        statusCode: 201,
        success: true,
        message: 'User riterive successfully',
        data: result
    })

})




export const UserControllers = {
    createUserControllers,
    getallUserControllers
}