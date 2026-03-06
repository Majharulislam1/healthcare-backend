import { Request, Response } from "express"
import { scheduleService } from "./schedule.service";
import sendResponse from "../../shared/sendResponse";



const createDoctorControllers = async(req:Request,res:Response)=>{
       
        const result = await scheduleService.createDoctorScheduleService(req.body);

    sendResponse(res, {
        statusCode: 201,
        success: true,
        message: "Schedule created successfully!",
        data: result
    })


}





export const scheduleController ={
    createDoctorControllers
}