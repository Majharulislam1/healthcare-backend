import { z } from "zod";  

const createPatientValidationSchema = z.object({
    password: z.string().min(1, "Password is required"),
    patient: z.object({
        name: z.string().min(1, "Name is required"),
        email: z.string().min(1, "Email is required"),
        address: z.string().optional()
    })
});

export const UserValidation = {
    createPatientValidationSchema
}