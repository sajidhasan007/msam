/* eslint-disable no-unused-vars */
import { Model, Types } from 'mongoose';
import { IAdmin } from '../admin/admin.interface';
import { IStudent } from '../student/student.interface';
import { ITeacher } from '../teacher/teacher.interface';

export type IUser = {
  _id?: Types.ObjectId;
  email: string;
  role: string;
  password: string;
  student?: Types.ObjectId | IStudent;
  teacher?: Types.ObjectId | ITeacher;
  admin?: Types.ObjectId | IAdmin;
};

export type UserModel = {
  isUserExist(
    email: string
  ): Promise<Pick<IUser, 'email' | 'password' | 'role' | '_id'>>;
  isPasswordMatched(
    givenPassword: string,
    savedPassword: string
  ): Promise<boolean>;
} & Model<IUser>;
