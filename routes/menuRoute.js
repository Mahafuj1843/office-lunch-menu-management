import { Router } from "express";
import { allMenus, createMenu, deleteMenu, menuList, singleMenus, updateMenu } from "../controllers/menuController.js";
import { isAdmin, verifyToken } from "../middlewares/authMiddleware.js";

const router = Router()

router.route("/create").post(isAdmin, createMenu);
router.route("/").get(allMenus);
router.route("/:id").get(verifyToken, singleMenus);
router.route("/:id").put(isAdmin, updateMenu);
router.route("/:id").delete(isAdmin, deleteMenu);
router.route("/all/list").get(isAdmin, menuList);

export default router