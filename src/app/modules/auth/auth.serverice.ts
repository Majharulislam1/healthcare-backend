import { UserStatus } from "../../../../prisma/generated/prisma/client"
import { jwtHelper } from "../../helpers/jwtToken"
import { prisma } from "../../shared/prisma"
import bcrypt from 'bcryptjs'

const userLonginService = async (payload: { email: string, password: string }) => {
    const user = await prisma.user.findUniqueOrThrow({
        where: {
            email: payload.email,
            status: UserStatus.ACTIVE
        }
    })

    const isCorrectPassword = await bcrypt.compare(payload.password, user.password);

    if (!isCorrectPassword) {
        throw new Error("Password is incorrect!")
    }



    const accessToken = jwtHelper.generateToken({ email: user.email, role: user.role }, "abcd", "1h");

    const refreshToken = jwtHelper.generateToken({ email: user.email, role: user.role }, "abcdefgh", "90d");

    return {
        accessToken,
        refreshToken,
        needPasswordChange: user.needPasswordChange
    }


}




export const authService = {
    userLonginService
}