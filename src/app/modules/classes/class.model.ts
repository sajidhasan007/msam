import { Schema, model } from 'mongoose';
import { ClassesModel, IClasses } from './class.interface';

export const ClassSchema = new Schema<IClasses, ClassesModel>(
  {
    title: {
      type: String,
      required: true,
    },
    dateTime: {
      type: Date,
      required: true,
    },
    isDone: {
      type: Boolean,
      default: false,
    },
    description: {
      type: String,
    },

    students: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Student',
      },
    ],
    files: {
      type: [String],
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

export const Class = model<IClasses, ClassesModel>('Class', ClassSchema);
