/* eslint-disable @typescript-eslint/no-explicit-any */
import { Model, Types } from 'mongoose';

export type IFloor = {
  _id?: string;
  title: string;
  totalFloat: number;
  flats?: Types.ObjectId;
  renter?: Types.ObjectId;
};

export type FloorModel = Model<IFloor, Record<string, unknown>>;
