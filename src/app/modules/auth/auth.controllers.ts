import { Request, Response } from "express";
import catchAsync from "../../shared/catchAsync";
 
import sendResponse from "../../shared/sendResponse";
import { authService } from "./auth.serverice";




const  userLoginControllers = catchAsync(async (req: Request, res: Response) => {
       const result = await authService.userLonginService(req.body);

       const {accessToken,refreshToken,needPasswordChange} = result

       res.cookie("accessToken", accessToken, {
        secure: true,
        httpOnly: true,
        sameSite: "none",
        maxAge: 1000 * 60 * 60
    })
    res.cookie("refreshToken", refreshToken, {
        secure: true,
        httpOnly: true,
        sameSite: "none",
        maxAge: 1000 * 60 * 60 * 24 * 90
    })
       
       sendResponse(res,{
             statusCode:201,
             success:true,
             message:'User Login successfully',
             data: {
                  needPasswordChange
             }
       })

})




export const authControllers = {
     userLoginControllers
}