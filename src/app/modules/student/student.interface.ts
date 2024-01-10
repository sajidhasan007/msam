import { Model } from 'mongoose';

export type IStudent = {
  fullName: string;
  phoneNumber: string;
  email: string;
  fatherName: string;
  fatherContactNo: string;
  motherName: string;
  presentAddress: string;
  permanentAddress: string;
  rollNo: string;
  dhakaUniversityRegNo: string;
  session: string;
  sscYear: number;
  sscGpa: number;
  hscYear: number;
  hscGpa: number;
  gender: 'male' | 'female' | 'others';
};

export type StudentModel = Model<IStudent, Record<string, unknown>>;

export type IStudentFilters = {
  searchTerm?: string;
  gender?: string;
  session?: string;
  sscYear?: number;
  hscYear?: number;
};
