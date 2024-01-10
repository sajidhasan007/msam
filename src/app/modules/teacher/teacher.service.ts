/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose, { SortOrder } from 'mongoose';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';

import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { User } from '../user/user.model';
import { teacherSearchableFields } from './teacher.constant';
import { ITeacher, ITeacherFilters } from './teacher.interface';
import { Teacher } from './teacher.model';

const getAllTeachers = async (
  filters: ITeacherFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<ITeacher[]>> => {
  // Extract searchTerm to implement search query
  const { searchTerm, ...filtersData } = filters;
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);

  const andConditions = [];
  // Search needs $or for searching in specified fields
  if (searchTerm) {
    andConditions.push({
      $or: teacherSearchableFields.map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    });
  }
  // Filters needs $and to fullfill all the conditions
  if (Object.keys(filtersData).length) {
    andConditions.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }

  // Dynamic  Sort needs  field to  do sorting
  const sortConditions: { [key: string]: SortOrder } = {};
  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }
  const whereConditions =
    andConditions.length > 0 ? { $and: andConditions } : {};

  const result = await Teacher.find(whereConditions)
    .populate('academicSemester')
    .populate('academicDepartment')
    .populate('academicFaculty')
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await Teacher.countDocuments(whereConditions);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getSingleTeacher = async (id: string): Promise<ITeacher | null> => {
  const result = await Teacher.findOne({ id })
    .populate('academicSemester')
    .populate('academicDepartment')
    .populate('academicFaculty');
  return result;
};

const updateTeacher = async (
  id: string,
  payload: Partial<ITeacher>
): Promise<ITeacher | null> => {
  const isExist = await Teacher.findOne({ id });

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Teacher not found !');
  }

  // const { fullName, guardian, localGuardian, ...TeacherData } = payload;

  // const updatedTeacherData: Partial<ITeacher> = { ...TeacherData };

  // if (fullName && Object.keys(fullName).length > 0) {
  //   Object.keys(fullName).forEach(key => {
  //     const nameKey = `name.${key}` as keyof Partial<ITeacher>; // `name.fisrtName`
  //     (updatedTeacherData as any)[nameKey] =
  //       fullName[key as keyof typeof fullName];
  //   });
  // }
  // if (guardian && Object.keys(guardian).length > 0) {
  //   Object.keys(guardian).forEach(key => {
  //     const guardianKey = `guardian.${key}` as keyof Partial<ITeacher>; // `guardian.fisrtguardian`
  //     (updatedTeacherData as any)[guardianKey] =
  //       guardian[key as keyof typeof guardian];
  //   });
  // }
  // if (localGuardian && Object.keys(localGuardian).length > 0) {
  //   Object.keys(localGuardian).forEach(key => {
  //     const localGuradianKey =
  //       `localGuardian.${key}` as keyof Partial<ITeacher>; // `localGuardian.fisrtName`
  //     (updatedTeacherData as any)[localGuradianKey] =
  //       localGuardian[key as keyof typeof localGuardian];
  //   });
  // }

  const result = await Teacher.findOneAndUpdate({ id }, payload, {
    new: true,
  })
    .populate('academicFaculty')
    .populate('academicDepartment')
    .populate('academicSemester');
  if (result) {
    // await RedisClient.publish(EVENT_Teacher_UPDATED, JSON.stringify(result));
  }
  return result;
};

const deleteTeacher = async (id: string): Promise<ITeacher | null> => {
  // check if the Teacher is exist
  const isExist = await Teacher.findOne({ id });

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Teacher not found !');
  }

  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    //delete Teacher first
    const teacher = await Teacher.findOneAndDelete({ id }, { session });
    if (!Teacher) {
      throw new ApiError(404, 'Failed to delete Teacher');
    }
    //delete user
    await User.deleteOne({ id });
    session.commitTransaction();
    session.endSession();

    return teacher;
  } catch (error) {
    session.abortTransaction();
    throw error;
  }
};

export const TeacherService = {
  getAllTeachers,
  getSingleTeacher,
  updateTeacher,
  deleteTeacher,
};
