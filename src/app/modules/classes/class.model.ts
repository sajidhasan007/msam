import { Schema, model } from 'mongoose';
import { ClassesModel, IClasses } from './class.interface';

export const ClassSchema = new Schema<IClasses, ClassesModel>({
  title: {
    type: String,
    required: true,
  },
  isDone: {
    type: Boolean,
    default: false,
  },
  description: {
    type: String,
  },
  dateTime: {
    type: Date,
  },
  students: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Student',
    },
  ],
  // file: {
  //   type: String,
  // },
});

export const Class = model<IClasses, ClassesModel>('Class', ClassSchema);
