import { NextFunction, Request, Response, Router } from "express";
import { UserControllers } from "./user.controllers";
import { fileUploder } from "../../helpers/fileUploader";
import { UserValidation } from "./user.validation";
import { auth } from "../../middlewares/auth";
import { UserRole } from "../../../../prisma/generated/prisma/client";


export const userRoute = Router();


userRoute.get('/',auth(UserRole.ADMIN),UserControllers.getallUserControllers);


userRoute.post('/create-patient',
    fileUploder.upload.single('file'),

    (req:Request,res:Response,next:NextFunction)=>{
       req.body = UserValidation.createPatientValidationSchema.parse(JSON.parse(req.body.data))
       return  UserControllers.createUserControllers(req,res,next)
    },
);


userRoute.post(
    "/create-admin",
    // auth(UserRole.ADMIN),
    fileUploder.upload.single('file'),
    (req: Request, res: Response, next: NextFunction) => {
        req.body = UserValidation.createAdminValidationSchema.parse(JSON.parse(req.body.data))
        return UserControllers.createAdminControllers(req, res, next)
    }
);

userRoute.post(
    "/create-doctor",
    auth(UserRole.ADMIN),
    fileUploder.upload.single('file'),
    (req: Request, res: Response, next: NextFunction) => {
        console.log(JSON.parse(req.body.data))
        req.body = UserValidation.createDoctorValidationSchema.parse(JSON.parse(req.body.data))
        return UserControllers.createDoctorControllers(req, res, next)
    }
);

