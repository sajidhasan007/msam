import express, { NextFunction, Request, Response } from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import { FileUploadHelper } from '../../../helpers/fileUploadHelper';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { UserController } from './user.controller';
import { UserValidation } from './user.validation';
const router = express.Router();

router.post(
  '/student-reg',
  FileUploadHelper.upload.single('profileImage'),
  validateRequest(UserValidation.regStudentZodSchema),
  (req: Request, res: Response, next: NextFunction) => {
    // req.body = UserValidation.createStudent.parse(JSON.parse(req.body.data))
    return UserController.regStudent(req, res, next);
  }
  // validateRequest(UserValidation.regStudentZodSchema),
  // auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
);

router.post(
  '/create-teacher',
  // validateRequest(UserValidation.regStudentZodSchema),
  // auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  UserController.createTeacher
);

router.post(
  '/create-admin',
  validateRequest(UserValidation.createAdminZodSchema),
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  UserController.createAdmin
);

export const UserRoutes = router;
