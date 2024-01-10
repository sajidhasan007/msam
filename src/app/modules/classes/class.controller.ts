import { Request, RequestHandler, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { IClasses } from './class.interface';
import { ClassService } from './class.service';

const createClass: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const result = await ClassService.crateClass(
      req.body,
      req.params.classRoomId
    );

    sendResponse<IClasses>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Class created successfully!',
      data: result,
    });
  }
);

const giveAttendance: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    await ClassService.giveAttendance(
      req.body,
      req.params.classRoomId,
      req.params.classId
    );

    sendResponse<IClasses>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Attendance submitted successfully!',
      // data: result,
    });
  }
);

export const ClassController = {
  createClass,
  giveAttendance,
};
