import { Schema, model } from 'mongoose';
import { gender } from './teacher.constant';
import { ITeacher, TeacherModel } from './teacher.interface';

export const TeacherSchema = new Schema<ITeacher, TeacherModel>(
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
    designation: {
      type: String,
      required: true,
    },

    // profileImage: {
    //   type: String,
    // },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

export const Teacher = model<ITeacher, TeacherModel>('Teacher', TeacherSchema);
