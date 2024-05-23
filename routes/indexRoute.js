import { Router } from "express";
import authRoutes from "./authRoute.js"
import menuRoutes from "./menuRoute.js"
import choiceRoutes from "./choiceRoute.js"

const router = Router()

router.use('/api/auth', authRoutes)
router.use('/api/menu', menuRoutes)
router.use('/api/choice', choiceRoutes)

export default router