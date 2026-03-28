

import { Router } from "express";
import { scheduleController } from "./schedule.controllers";
import { auth } from "../../middlewares/auth";
import { UserRole } from "../../../../prisma/generated/prisma/client";
 


export const scheduleRouter = Router();

scheduleRouter.get('/',auth(UserRole.DOCTOR,UserRole.ADMIN), scheduleController.schedulesForDoctor);
scheduleRouter.post("/",scheduleController.createDoctorControllers);
scheduleRouter.delete("/:id",scheduleController.deleteScheduleFromDB);