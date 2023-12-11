import express from 'express';
import { ClassRoomController } from './classRoom.controller';
const router = express.Router();

router.post('/', ClassRoomController.createClassRoom);
// router.get('/', FloorController.getAllFloor);

export const ClassRoomRoutes = router;
