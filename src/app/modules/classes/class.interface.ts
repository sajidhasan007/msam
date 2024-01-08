/* eslint-disable @typescript-eslint/no-explicit-any */
import { Model, Types } from 'mongoose';
import { IStudent } from '../student/student.interface';

export type IClasses = {
  _id?: string;
  title: string;
  isDone?: boolean;
  description?: string;
  dateTime?: Date;
  students?: Types.ObjectId[] | IStudent[];
  // file?: string;
};

export type ClassesModel = Model<IClasses, Record<string, unknown>>;
