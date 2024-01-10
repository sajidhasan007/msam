import httpStatus from 'http-status';
import mongoose from 'mongoose';
import ApiError from '../../../errors/ApiError';
import { ClassRoom } from '../class-room/classRoom.model';
import { IClasses } from './class.interface';
import { Class } from './class.model';

const crateClass = async (
  payload: IClasses,
  classRoomId: string
): Promise<IClasses | null> => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const isClassRoomExist = await ClassRoom.findOne({
      _id: classRoomId,
    }).session(session);
    if (!isClassRoomExist) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Classroom not found');
    }

    const newClass: IClasses[] = await Class.create([payload], { session }); // Using session for create

    await ClassRoom.updateOne(
      { _id: classRoomId },
      { $push: { classes: newClass[0]._id } }
    ).session(session);

    await session.commitTransaction();
    session.endSession();

    return newClass[0];
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
};

// const getAllFloor = async () => {
//   const allFloor = await Class.find();
//   return {
//     meta: {
//       page: 1,
//       limit: 10,
//       total: 10,
//     },
//     data: allFloor,
//   };
// };

export const ClassService = {
  crateClass,
  // getAllFloor,
};
