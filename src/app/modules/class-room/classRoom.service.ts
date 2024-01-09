import httpStatus from 'http-status';
import mongoose from 'mongoose';
import ApiError from '../../../errors/ApiError';
import { IClassRoom } from './classRoom.interface';
import { ClassRoom } from './classRoom.model';

const createClassRoom = async (
  payload: IClassRoom
): Promise<IClassRoom | null> => {
  const newClassRoom = await ClassRoom.create(payload);
  return newClassRoom;
};

const getAllClassRoom = async (payload: string) => {
  const allClassRoom = await ClassRoom.find({ teacherId: payload }).select([
    'title',
    'classCode',
    'description',
  ]);
  return {
    meta: {
      page: 1,
      limit: 10,
      total: 10,
    },
    data: allClassRoom,
  };
};

const getSingleClassRoom = async (
  _id: string,
  teacherId: string
): Promise<IClassRoom | null> => {
  const objectId = new mongoose.Types.ObjectId(teacherId);
  const result = await ClassRoom.findOne({ _id });
  console.log('my result is ', result?.teacherId);
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Class room not found.');
  }
  const teacherIds = result?.teacherId?.toString();
  if (!teacherIds?.includes(objectId.toString())) {
    throw new ApiError(
      httpStatus.UNAUTHORIZED,
      'Teacher not authorized for this class.'
    );
  }

  // if (result?.teacherId?.includes(teacherId))
  // .populate(
  //   'managementDepartment'
  // );
  return result;
};

export const ClassRoomService = {
  createClassRoom,
  getAllClassRoom,
  getSingleClassRoom,
};
