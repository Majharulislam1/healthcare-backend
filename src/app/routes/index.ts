import express from 'express';
import { userRoute } from '../modules/user/user.routes';
import { authRoutes } from '../modules/auth/auth.routes';
import { scheduleRouter } from '../modules/schedule/schedule.routes';


const router = express.Router();

const moduleRoutes = [
    {
        path: '/user',
        route: userRoute
    },
    {
         path:'/auth',
         route:authRoutes
    },
    {
        path:'/schedule',
        route:scheduleRouter
    }

];

moduleRoutes.forEach(route => router.use(route.path, route.route))

export default router;