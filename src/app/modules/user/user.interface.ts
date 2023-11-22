/* eslint-disable no-unused-vars */
import { Model, Types } from 'mongoose';
import { IAdmin } from '../admin/admin.interface';
import { IStudent } from '../student/student.interface';

export type IUser = {
  email: string;
  role: string;
  password: string;
  student?: Types.ObjectId | IStudent;
  admin?: Types.ObjectId | IAdmin;
};

export type UserModel = {
  isUserExist(
    email: string
  ): Promise<Pick<IUser, 'email' | 'password' | 'role'>>;
  isPasswordMatched(
    givenPassword: string,
    savedPassword: string
  ): Promise<boolean>;
} & Model<IUser>;
