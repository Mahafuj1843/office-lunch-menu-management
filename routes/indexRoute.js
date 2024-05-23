import { Router } from "express";
import authRoutes from "./authRoute.js"
import menuRoutes from "./menuRoute.js"
// import commentRoutes from "./commentRoute.js"

const router = Router()

router.use('/api/auth', authRoutes)
router.use('/api/menu', menuRoutes)
// router.use('/api/comment', commentRoutes)

export default router