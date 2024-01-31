/* eslint-disable @typescript-eslint/no-explicit-any */
import { Model, Types } from 'mongoose';
import { IStudent } from '../student/student.interface';

export type IClasses = {
  _id?: string;
  title: string;
  dateTime: Date;
  isDone?: boolean;
  description?: string;
  students?: Types.ObjectId[] | IStudent[];
  files?: string[];
};

export type ClassesModel = Model<IClasses, Record<string, unknown>>;
