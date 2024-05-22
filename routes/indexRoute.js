import { Router } from "express";
import authRoutes from "./authRoute.js"
// import postRoutes from "./postRoute.js"
// import commentRoutes from "./commentRoute.js"

const router = Router()

router.use('/api/auth', authRoutes)
// router.use('/api/post', postRoutes)
// router.use('/api/comment', commentRoutes)

export default router