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




const getallUserService = async ({ limit, page, searchTram, sortBy, sortOrder ,status,role }: { limit: number, page: number, searchTram?: any, sortBy: any, sortOrder: any , status:any,role:any}) => {

    const pageNumber = page || 1;
    const limitNumber = limit || 10;
    const searchTramDev = searchTram || '';




    const skip = (pageNumber - 1) * limitNumber;
 

    console.log('page:',pageNumber , "limitNumber: ", limitNumber , "searchTramDev :", searchTramDev);

    const allUser = await prisma.user.findMany(
        {
            skip,
            take: limitNumber,

            where: {
                email: {
                    contains: searchTramDev,
                    mode: 'insensitive'
                },
                status:status,
                role:role
            },
            orderBy: sortBy && sortOrder ? {
                 [sortBy]:sortOrder
            } : {
                 cratedAt:'asc'
            }
             
        }
    );

    return allUser

}


export const userService = {
    createPaeitentService,
    getallUserService
}