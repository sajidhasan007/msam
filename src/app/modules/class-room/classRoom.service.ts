import { Request } from 'express';
import httpStatus from 'http-status';
import mongoose, { Types } from 'mongoose';
import ApiError from '../../../errors/ApiError';
import { FileUploadHelper } from '../../../helpers/fileUploadHelper';
import { IUploadFile } from '../../../interfaces/file';
import { idEqualtyCheck } from '../../../shared/idEqualtyCheck';
import { IClassRoom } from './classRoom.interface';
import { ClassRoom } from './classRoom.model';

const createClassRoom = async (req: Request): Promise<IClassRoom | null> => {
  const data: IClassRoom = req.body;

  if (req.file) {
    // data.classImage = req.file
  }
  if (req.file) {
    const file = req.file as IUploadFile;
    const uploadedImage = await FileUploadHelper.uploadToCloudinary(file);
    data.classImage = uploadedImage?.secure_url || null;
  } else {
    data.classImage = null;
  }
  console.log('my class room data is = ', data);
  const newClassRoom = await ClassRoom.create(data);
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
  const result = await ClassRoom.findOne({ _id })
    .populate({
      path: 'classes',
      select: 'title isDone dateTime',
    })
    .populate({
      path: 'students',
      select: 'fullName email rollNo',
    });
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

  return result;
};

const enrollInClassRoom = async (
  classCode: string,
  studentId: string
): Promise<void> => {
  // check if the faculty is exist

  const classRoom = await ClassRoom.findOne({ classCode });

  if (!classRoom) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Class room not found !');
  }

  if (
    idEqualtyCheck(classRoom?.students as Types.ObjectId[])?.includes(studentId)
  ) {
    throw new ApiError(
      httpStatus.NOT_FOUND,
      'You have already enrolled this class !'
    );
  }

  const updateClassRoom = await ClassRoom.updateOne(
    { _id: classRoom?._id },
    { $push: { students: studentId } }
  );
  console.log('update result is = ', updateClassRoom);
  // const session = await mongoose.startSession();

  // try {
  //   session.startTransaction();
  //   //delete student first
  //   const student = await Admin.findOneAndDelete({ id }, { session });
  //   if (!student) {
  //     throw new ApiError(404, 'Failed to delete student');
  //   }
  //   //delete user
  //   await User.deleteOne({ id });
  //   session.commitTransaction();
  //   session.endSession();

  //   return student;
  // } catch (error) {
  //   session.abortTransaction();
  //   throw error;
  // }

  // return ;
};

export const ClassRoomService = {
  createClassRoom,
  getAllClassRoom,
  getSingleClassRoom,
  enrollInClassRoom,
};
