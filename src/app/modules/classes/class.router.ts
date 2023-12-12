import express from 'express';
import { ClassController } from './class.controller';
const router = express.Router();

router.post(
  '/:classRoomId',
  // validateRequest(ClassValidation.classesZodSchema),
  ClassController.createClass
);
// router.get('/', ClassController.);

export const ClassRoutes = router;
