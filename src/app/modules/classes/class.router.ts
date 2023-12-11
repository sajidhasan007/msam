import express from 'express';
import { ClassController } from './class.controller';
const router = express.Router();

router.post(
  '/:classRoomId',
  // validateRequest(ClassValidation.classesZodSchema),
  ClassController.createClass
);
// router.get('/', ClassController.getAllFloor);

export const ClassRoutes = router;
