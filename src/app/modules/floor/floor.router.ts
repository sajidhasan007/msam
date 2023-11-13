import express from 'express';
import { FloorController } from './floor.controller';
const router = express.Router();

router.post('/create-floor', FloorController.createFloor);
router.get('/', FloorController.getAllFloor);

export const FloorRoutes = router;
