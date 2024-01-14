import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import { ClassController } from './class.controller';
const router = express.Router();

router.post(
  '/:classRoomId',
  auth(ENUM_USER_ROLE.TEACHER),
  ClassController.createClass
);
router.post(
  '/attendance/class-room/:classRoomId/class/:classId',
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
