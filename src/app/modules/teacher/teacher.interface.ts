import { Model, Types } from 'mongoose';

export type ITeacher = {
  _id?: Types.ObjectId;
  fullName: string;
  phoneNumber: string;
  email: string;
  designation: string;
  gender: 'male' | 'female' | 'others';
};

export type TeacherModel = Model<ITeacher, Record<string, unknown>>;

export type ITeacherFilters = {
  searchTerm?: string;
};
