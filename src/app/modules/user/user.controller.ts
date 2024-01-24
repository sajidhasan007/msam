import { Request, Response } from 'express';
import { RequestHandler } from 'express-serve-static-core';
import httpStatus from 'http-status';
import { ENUM_USER_ROLE } from '../../../enums/user';
import ApiError from '../../../errors/ApiError';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { IUser } from './user.interface';
import { UserService } from './user.service';

const regStudent: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    // console.log('my request file is = ', req.body);
    // return;
    // const { email, password, confirmPassword, ...student } = req.body;
    // if (password !== confirmPassword) {
    //   throw new ApiError(httpStatus.BAD_REQUEST, 'Password does not match');
    // }
    // const user: IUser = {
    //   email,
    //   role: 'student',
    //   password,
    // };

    // const result = await UserService.regStudent(student, user);
    const result = await UserService.regStudent(req);

    sendResponse<IUser>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Student created successfully!',
      data: result,
    });
  }
);

const createTeacher: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { email, password, confirmPassword, ...teacher } = req.body;
    if (password !== confirmPassword) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Password does not match');
    }
    const user: IUser = {
      email,
      role: ENUM_USER_ROLE.TEACHER,
      password,
    };

    const result = await UserService.createTeacher(teacher, user);

    sendResponse<IUser>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Teacher created successfully!',
      data: result,
    });
  }
);
const createAdmin: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { admin, ...userData } = req.body;
    const result = await UserService.createAdmin(admin, userData);

    sendResponse<IUser>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Admin created successfully!',
      data: result,
    });
  }
);

export const UserController = {
  regStudent,
  createTeacher,
  createAdmin,
};
