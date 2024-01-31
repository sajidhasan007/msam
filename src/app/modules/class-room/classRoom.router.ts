import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import { FileUploadHelper } from '../../../helpers/fileUploadHelper';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { ClassRoomController } from './classRoom.controller';
import { ClassRoomValidation } from './classRoom.validation';
const router = express.Router();

router.post(
  '/',
  FileUploadHelper.upload.single('classImage'),
  validateRequest(ClassRoomValidation.classRoomZodSchema),
  auth(ENUM_USER_ROLE.TEACHER),
  ClassRoomController.createClassRoom
);
router.get(
  '/',
  auth(ENUM_USER_ROLE.TEACHER),
  ClassRoomController.getAllClassRoom
);

router.get(
  '/:id',
  auth(ENUM_USER_ROLE.TEACHER, ENUM_USER_ROLE.SUPER_ADMIN),
  ClassRoomController.getSingleClassRoom
);

router.post(
  '/enroll',
  validateRequest(ClassRoomValidation.enrollInClassRoomZodSchema),
  auth(ENUM_USER_ROLE.STUDENT),
  ClassRoomController.enrollInClassRoom
);

export const ClassRoomRoutes = router;
