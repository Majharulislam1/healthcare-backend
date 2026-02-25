import { prisma } from "../../shared/prisma";
import { createPaeitent } from "./user.interface"
import bcrypt from "bcryptjs";



const createPaeitentService = async(payload:createPaeitent)=>{
    
     const hashPassword = await bcrypt.hash(payload.password,10);

      const result = await prisma.$transaction(async (tnx)=>{
          await tnx.user.create({
             data:{
                 email:payload.email,
                 password:hashPassword
             }
         });

       return  await tnx.patient.create({
              data:{
                 name:payload.name,
                 email:payload.email
              }
         })
      })

    return result
}


export const userService = {
     createPaeitentService
}