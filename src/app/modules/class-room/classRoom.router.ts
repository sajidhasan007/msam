import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { ClassRoomController } from './classRoom.controller';
import { ClassRoomValidation } from './classRoom.validation';
const router = express.Router();

router.post(
  '/',
  validateRequest(ClassRoomValidation.classRoomZodSchema),
  auth(ENUM_USER_ROLE.TEACHER),
  ClassRoomController.createClassRoom
);
router.get(
  '/',
  auth(ENUM_USER_ROLE.TEACHER),
  ClassRoomController.getAllClassRoom
);

export const ClassRoomRoutes = router;
