import { Request, RequestHandler, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { IClasses } from './class.interface';
import { ClassService } from './class.service';

const createClass: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    console.log('hello');
    console.log('my request is = ', req.params.classRoomId);
    // const { student, ...userData } = req.body;
    const result = await ClassService.crateClass(req.body);

    sendResponse<IClasses>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Class created successfully!',
      data: result,
    });
  }
);

export const ClassController = {
  createClass,
};
