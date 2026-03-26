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

const schedulesForDoctor = catchAsync(async (req: Request, res: Response) => {
    const options = pick(req.query, ["page", "limit", "sortBy", "sortOrder"]);
    const fillters = pick(req.query, ["startDateTime", "endDateTime"]);

    const user = req.user;
    const result = await scheduleService.schedulesForDoctorService(user as IJWTPayload, fillters, options);

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Schedule fetched successfully!",
        meta: result.meta,
        data: result.data
    })
})


const deleteScheduleFromDB = catchAsync(async (req: Request, res: Response) => {
    const result = await scheduleService.deleteScheduleFromDB(req.params.id as string);

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Schedule deleted successfully!",
        data: result
    })
})



export const scheduleController = {
    createDoctorControllers,
    schedulesForDoctor,
    deleteScheduleFromDB
}