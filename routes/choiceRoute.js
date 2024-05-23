import { Router } from "express";
import { isAdmin, verifyToken } from "../middlewares/authMiddleware.js";
import { allChoices, createChoice, myChoices } from "../controllers/choiceController.js";

const router = Router()

router.route("/create").post(verifyToken, createChoice);
router.route("/").get(isAdmin, allChoices);
router.route("/my").get(verifyToken, myChoices);

export default router