/* eslint-disable @typescript-eslint/no-explicit-any */
import { Model, Types } from 'mongoose';
import { IClasses } from '../classes/class.interface';
import { IStudent } from '../student/student.interface';

export type IClassRoom = {
  _id?: string;
  title: string;
  classCode: string;
  description?: string;
  students?: Types.ObjectId[] | IStudent[];
  classes?: Types.ObjectId[] | IClasses[];
};

export type ClassModel = Model<IClassRoom, Record<string, unknown>>;
