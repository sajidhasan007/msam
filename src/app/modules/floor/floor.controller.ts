import { Request, RequestHandler, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { IFloor } from './floor.interface';
import { FloorService } from './floor.service';

const createFloor: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    console.log('my request is = ', req.body);
    //   const { student, ...userData } = req.body;
    const result = await FloorService.crateFloor(req.body);

    sendResponse<IFloor>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Student created successfully!',
      data: result,
    });
  }
);

const getAllFloor: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const result = await FloorService.getAllFloor();

    sendResponse<IFloor[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Floor get successfully!',
      data: result.data,
    });
  }
);

export const FloorController = {
  createFloor,
  getAllFloor,
};
