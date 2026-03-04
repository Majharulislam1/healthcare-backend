import { Request, Response } from "express";
import catchAsync from "../../shared/catchAsync";
import { userService } from "./user.service";
import sendResponse from "../../shared/sendResponse";
 
import { userFilterableFields } from "./user.constant";
import pick from "../../helpers/pick";




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

    const filters = pick(req.query, userFilterableFields);
    const options = pick(req.query, ["page", "limit", "sortBy", "sortOrder"])



    const result = await userService.getallUserService(filters,options);




    sendResponse(res, {
        statusCode: 201,
        success: true,
        message: 'User riterive successfully',
        meta:result.meta,
        data: result.data
    })

})




export const UserControllers = {
    createUserControllers,
    getallUserControllers
}