import httpStatus from 'http-status';
import mongoose, { Types } from 'mongoose';
import config from '../../../config/index';
import ApiError from '../../../errors/ApiError';
import { IAdmin } from '../admin/admin.interface';
import { Admin } from '../admin/admin.model';
import { IStudent } from '../student/student.interface';
import { Student } from '../student/student.model';
import { ITeacher } from '../teacher/teacher.interface';
import { Teacher } from '../teacher/teacher.model';
import { IUser } from './user.interface';
import { User } from './user.model';
import { generateAdminId } from './user.utils';

const regStudent = async (
  student: IStudent,
  user: IUser
): Promise<IUser | null> => {
  let newUserAllData = null;
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    // generate student id
    // set custom id into both  student & user

    // Create student using sesssin
    student.email = user.email;

    const newStudent = await Student.create([student], { session });

    if (!newStudent.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create student');
    }

    // set student _id (reference) into user.student
    user.email = student.email;
    user.student = newStudent[0]._id as Types.ObjectId;

    const newUser = await User.create([user], { session });

    if (!newUser.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create user');
    }
    newUserAllData = newUser[0];

    await session.commitTransaction();
    await session.endSession();
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw error;
  }

  if (newUserAllData) {
    newUserAllData = await User.findOne({ _id: newUserAllData._id }).populate({
      path: 'student',
    });
    // .populate({
    //   path: 'student',
    //   populate: [
    //     {
    //       path: 'academicSemester',
    //     },
    //     {
    //       path: 'academicDepartment',
    //     },
    //     {
    //       path: 'academicFaculty',
    //     },
    //   ],
    // });
  }

  // if (newUserAllData) {
  //   await RedisClient.publish(
  //     EVENT_STUDENT_CREATED,
  //     JSON.stringify(newUserAllData.student)
  //   );
  // }

  return newUserAllData;
};

const createTeacher = async (
  teacher: ITeacher,
  user: IUser
): Promise<IUser | null> => {
  let newUserAllData = null;
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    // generate student id
    // set custom id into both  student & user

    // Create student using sesssin
    teacher.email = user.email;

    const newTeacher: ITeacher[] = await Teacher.create([teacher], { session });

    if (!newTeacher.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create teacher');
    }

    // set student _id (reference) into user.student
    user.email = teacher.email;
    user.teacher = newTeacher[0]._id as Types.ObjectId;

    console.log('my teacher user is = ', user);

    const newUser = await User.create([user], { session });

    if (!newUser.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create user');
    }

    newUserAllData = newUser[0];

    await session.commitTransaction();
    await session.endSession();
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw error;
  }

  if (newUserAllData) {
    newUserAllData = await User.findOne({ _id: newUserAllData._id }).populate({
      path: 'teacher',
    });
  }

  // if (newUserAllData) {
  //   await RedisClient.publish(
  //     EVENT_STUDENT_CREATED,
  //     JSON.stringify(newUserAllData.student)
  //   );
  // }

  return newUserAllData;
};

const createAdmin = async (
  admin: IAdmin,
  user: IUser
): Promise<IUser | null> => {
  // If password is not given,set default password
  if (!user.password) {
    user.password = config.default_admin_pass as string;
  }
  // set role
  user.role = 'admin';

  let newUserAllData = null;
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    // generate admin id
    const id = await generateAdminId();
    user.email = id;
    admin.id = id;

    const newAdmin = await Admin.create([admin], { session });

    if (!newAdmin.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create faculty ');
    }

    user.admin = newAdmin[0]._id;

    const newUser = await User.create([user], { session });

    if (!newUser.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create admin');
    }
    newUserAllData = newUser[0];

    await session.commitTransaction();
    await session.endSession();
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw error;
  }

  if (newUserAllData) {
    newUserAllData = await User.findOne({ id: newUserAllData.id }).populate({
      path: 'admin',
      populate: [
        {
          path: 'managementDepartment',
        },
      ],
    });
  }

  return newUserAllData;
};

export const UserService = {
  regStudent,
  createTeacher,
  createAdmin,
};
