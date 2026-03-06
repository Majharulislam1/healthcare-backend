import { Request, Response } from "express"
import { scheduleService } from "./schedule.service";
import sendResponse from "../../shared/sendResponse";
import catchAsync from "../../shared/catchAsync";
import pick from "../../helpers/pick";
 



const createDoctorControllers = async (req: Request, res: Response) => {

    const result = await scheduleService.createDoctorScheduleService(req.body);

     

    sendResponse(res, {
        statusCode: 201,
        success: true,
        message: "Schedule created successfully!",
        data: result
    })


}

  const schedulesForDoctor = catchAsync(async(req:Request,res:Response)=>{
         const options = pick(req.query,["page","limit","sortBy","sortOrder"]);
         const fillters = pick(req.query,["startDateTime","endDateTime"]);

         const result = await 
  })






export const scheduleController = {
    createDoctorControllers
}