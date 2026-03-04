import { Request } from "express";
import { prisma } from "../../shared/prisma";
import { createPaeitent } from "./user.interface"
import bcrypt from "bcryptjs";
import { fileUploder } from "../../helpers/fileUploader";
import { IOptions, paginationHelper } from "../../helpers/paginationHelper";
import { Prisma } from "../../../../prisma/generated/prisma/client";
import { userSearchableFields } from "./user.constant";



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




const getallUserService = async (params: any, options: IOptions) => {


    const { page, limit, skip, sortBy, sortOrder } = paginationHelper.calculatePagination(options);

    const { searchTerm, ...filterData } = params;

    const andConditions: Prisma.UserWhereInput[] = [];

    if (searchTerm) {
        andConditions.push({
            OR: userSearchableFields.map(field => ({
                [field]: {
                    contains: searchTerm,
                    mode: "insensitive"
                }
            }))
        })
    }

    if (Object.keys(filterData).length > 0) {
        andConditions.push({
            AND: Object.keys(filterData).map(key => ({
                [key]: {
                    equals: (filterData as any)[key]
                }
            }))
        })
    }

    const whereConditions: Prisma.UserWhereInput = andConditions.length > 0 ? {
        AND: andConditions
    } : {}


    const allUser = await prisma.user.findMany(
        {
            skip,
            take: limit,

            where: whereConditions,
            orderBy: {
                [sortBy]: sortOrder
            }

        }
    );

    const total = await prisma.user.count({
        where: whereConditions
    });
    return {
        meta: {
            page,
            limit,
            total
        },
        data: allUser
    };

}


export const userService = {
    createPaeitentService,
    getallUserService
}