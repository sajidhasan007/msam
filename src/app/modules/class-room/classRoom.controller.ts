import { Request, RequestHandler, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { IClassRoom } from './classRoom.interface';
import { ClassRoomService } from './classRoom.service';

const createClassRoom: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    req.body.teacherId = req?.user?.userId;
    const result = await ClassRoomService.createClassRoom(req.body);
    sendResponse<IClassRoom>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Class room created successfully!',
      data: result,
    });
  }
);

const getAllClassRoom: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const result = await ClassRoomService.getAllClassRoom(req?.user?.userId);

    sendResponse<IClassRoom[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Classrooms get successfully!',
      data: result.data,
    });
  }
);

export const ClassRoomController = {
  createClassRoom,
  getAllClassRoom,
};
