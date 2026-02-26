import { NextFunction, Request, Response, Router } from "express";
import { UserControllers } from "./user.controllers";
import { fileUploder } from "../../helpers/fileUploader";
import { UserValidation } from "./user.validation";


export const userRoute = Router();

userRoute.post('/create-patient',
    fileUploder.upload.single('file'),

    (req:Request,res:Response,next:NextFunction)=>{
       req.body = UserValidation.createPatientValidationSchema.parse(JSON.parse(req.body.data))
       return  UserControllers.createUserControllers(req,res,next)
    },

   
);

