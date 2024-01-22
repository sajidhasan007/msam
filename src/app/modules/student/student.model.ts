import { Schema, model } from 'mongoose';
import { gender } from './student.constant';
import { IStudent, StudentModel } from './student.interface';

export const StudentSchema = new Schema<IStudent, StudentModel>(
  {
    fullName: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      enum: gender,
    },

    email: {
      type: String,
      unique: true,
      required: true,
    },
    phoneNumber: {
      type: String,
      unique: true,
      required: true,
    },

    presentAddress: {
      type: String,
      required: true,
    },
    permanentAddress: {
      type: String,
      required: true,
    },
    fatherName: {
      type: String,
      required: true,
    },
    motherName: {
      type: String,
      required: true,
    },
    rollNo: {
      type: String,
      required: true,
    },
    dhakaUniversityRegNo: {
      type: String,
      required: true,
      unique: true,
    },
    session: {
      type: String,
      required: true,
    },
    sscYear: {
      type: Number,
      required: true,
    },
    sscGpa: {
      type: Number,
      required: true,
    },
    hscYear: {
      type: Number,
      required: true,
    },
    hscGpa: {
      type: Number,
      required: true,
    },

    profileImage: {
      type: String,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

export const Student = model<IStudent, StudentModel>('Student', StudentSchema);
