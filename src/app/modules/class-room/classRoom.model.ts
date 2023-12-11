import { Schema, model } from 'mongoose';
import { ClassModel, IClassRoom } from './classRoom.interface';

export const ClassRoomSchema = new Schema<IClassRoom, ClassModel>({
  title: {
    type: String,
    required: true,
  },
  classCode: {
    type: String,
    required: true,
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
  classes: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Class',
    },
  ],
});

export const ClassRoom = model<IClassRoom, ClassModel>(
  'ClassRoom',
  ClassRoomSchema
);
