

import { Router } from "express";
import { scheduleController } from "./schedule.controllers";
 


export const scheduleRouter = Router();

scheduleRouter.post("/",scheduleController.createDoctorControllers);
scheduleRouter.get('/',scheduleController.);
scheduleRouter.delete("/:id",scheduleController.deleteScheduleFromDB);