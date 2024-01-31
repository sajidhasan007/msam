import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import { FileUploadHelper } from '../../../helpers/fileUploadHelper';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { ClassController } from './class.controller';
import { ClassValidation } from './class.validation';
const router = express.Router();

router.post(
  '/:classRoomId',
  FileUploadHelper.upload.array('files'),
  auth(ENUM_USER_ROLE.TEACHER),
  ClassController.createClass
);
router.post(
  '/attendance/class-room/:classRoomId/class/:classId',
  validateRequest(ClassValidation.attendanceZodSchema),
  auth(ENUM_USER_ROLE.TEACHER),
  ClassController.giveAttendance
);

router.get(
  '/class-room/:classRoomId/class/:classId',
  auth(ENUM_USER_ROLE.TEACHER),
  ClassController.getSingleClass
);
// router.get('/', ClassController.);

export const ClassRoutes = router;
