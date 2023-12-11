import { Request, RequestHandler, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { IClassRoom } from './classRoom.interface';
import { ClassRoomService } from './classRoom.service';

const createClassRoom: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    //   const { student, ...userData } = req.body;
    const result = await ClassRoomService.crateClassRoom(req.body);
    sendResponse<IClassRoom>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Class room created successfully!',
      data: result,
    });
  }
);

// const getAllFloor: RequestHandler = catchAsync(
//   async (req: Request, res: Response) => {
//     const result = await FloorService.getAllFloor();

//     sendResponse<IClassRoom[]>(res, {
//       statusCode: httpStatus.OK,
//       success: true,
//       message: 'Floor get successfully!',
//       data: result.data,
//     });
//   }
// );

export const ClassRoomController = {
  createClassRoom,
};
