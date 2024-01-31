import { Request, RequestHandler, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { IClassRoom } from './classRoom.interface';
import { ClassRoomService } from './classRoom.service';

const createClassRoom: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    req.body.teacherId = req?.user?.userId;
    const result = await ClassRoomService.createClassRoom(req);
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

const getSingleClassRoom = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const teacherId = req?.user?.userId;
  const result = await ClassRoomService.getSingleClassRoom(id, teacherId);

  sendResponse<IClassRoom>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Class room fetched successfully !',
    data: result,
  });
});

const enrollInClassRoom = catchAsync(async (req: Request, res: Response) => {
  const classCode = req.body.classCode;
  const userId = req?.user?.userId;

  await ClassRoomService.enrollInClassRoom(classCode, userId);

  sendResponse<IClassRoom>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'You have enrolled successfully !',
    // data: result,
  });
});

export const ClassRoomController = {
  createClassRoom,
  getAllClassRoom,
  getSingleClassRoom,
  enrollInClassRoom,
};
