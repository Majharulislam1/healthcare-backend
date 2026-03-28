import { UserRole } from "../../../prisma/generated/prisma/client";

 

export type IJWTPayload = {
    email: string;
    role: UserRole;
}