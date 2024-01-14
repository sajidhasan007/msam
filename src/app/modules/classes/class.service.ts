import httpStatus from 'http-status';
import mongoose, { Types } from 'mongoose';
import ApiError from '../../../errors/ApiError';
import { idEqualtyCheck } from '../../../shared/idEqualtyCheck';
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

const getSingleClass = async (
  classRoomId: string,
  classId: string
): Promise<IClasses | null | undefined> => {
  const result = await ClassRoom.findOne({ _id: classRoomId }).populate(
    'classes'
  );
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Class room not found.');
  }

  const singleClass = result.classes?.find(
    (item: IClasses | Types.ObjectId) => item?._id?.toString() === classId
  );

  if (!singleClass) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Class not found.');
  }

  console.log('my classes are = ', singleClass);
  return singleClass as IClasses;
};

const giveAttendance = async (
  payload: { students: string[] },
  classRoomId: string,
  classId: string
): Promise<void> => {
  const result = await ClassRoom.findOne({ _id: classRoomId });
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Class room not found.');
  }

  if (!idEqualtyCheck(result?.classes as Types.ObjectId[])?.includes(classId)) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Class not found !');
  }

  // await Class.updateOne({ _id: classId }, { $push: { students: payload } });
  // const studentIdsString = payload.students.map((item: string) =>
  //   JSON.parse(item)
  // ); // Assuming payload.students is a string
  // const studentIds = JSON.parse(studentIdsString);

  // Now studentIds is an array of student IDs

  // console.log('my student data is = ', studentIdsString);

  await Class.updateOne(
    { _id: classId },
    {
      $set: {
        isDone: true,
        students: payload?.students,
      },
      // $push: { students: { $each: payload?.students } },
    }
  );
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
  giveAttendance,
  getSingleClass,
  // getAllFloor,
};
