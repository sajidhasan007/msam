import { Schema, model } from 'mongoose';
import { FloorModel, IFloor } from './floor.interface';

export const FloorSchema = new Schema<IFloor, FloorModel>({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  totalFloat: {
    type: Number,
    required: true,
  },
});

export const Floor = model<IFloor, FloorModel>('Floor', FloorSchema);
