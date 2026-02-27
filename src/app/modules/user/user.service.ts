import { Request } from "express";
import { prisma } from "../../shared/prisma";
import { createPaeitent } from "./user.interface"
import bcrypt from "bcryptjs";
import { fileUploder } from "../../helpers/fileUploader";



const createPaeitentService = async (req: Request) => {

    if (req.file) {
        const uploadResult = await fileUploder.uploadToCloudinary(req.file);
        req.body.patient.profilePhoto = uploadResult?.secure_url;


    }

    const hashPassword = await bcrypt.hash(req.body.password, 10);

    const result = await prisma.$transaction(async (tnx) => {
        await tnx.user.create({
            data: {
                email: req.body.patient.email,
                password: hashPassword
            }
        });

        return await tnx.patient.create({
            data: req.body.patient
        })
    })

    return result

}




const getallUserService = async ({limit,page}:{limit:number,page:number}) => {

    const skip = (page -1 ) * limit;
    
     const allUser = await prisma.user.findMany(
        {
             skip,
             take:limit
        }
     );
     
     return allUser

}


export const userService = {
    createPaeitentService,
    getallUserService
}