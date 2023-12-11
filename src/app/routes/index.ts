import express from 'express';
import { AdminRoutes } from '../modules/admin/admin.route';
import { AuthRoutes } from '../modules/auth/auth.route';

import { ClassRoutes } from '../modules/classes/class.router';
import { FloorRoutes } from '../modules/floor/floor.router';
import { StudentRoutes } from '../modules/student/student.route';
import { UserRoutes } from '../modules/user/user.route';
import { ClassRoomRoutes } from '../modules/class-room/classRoom.router';

const router = express.Router();

const moduleRoutes = [
  {
    path: '/students',
    route: StudentRoutes,
  },
  {
    path: '/admins',
    route: AdminRoutes,
  },
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/floor',
    route: FloorRoutes,
  },
  {
    path: '/class',
    route: ClassRoutes,
  },
  {
    path: '/class-room',
    route: ClassRoomRoutes,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));
export default router;
