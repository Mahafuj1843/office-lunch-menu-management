import { Router } from "express";
import { login, logout, registration } from "../controllers/authController.js";

const router = Router()

router.route("/register").post(registration);
router.route("/login").post(login);
router.route('/logout').get(logout);

// router.route("/update/:id").put(updateProfile);
// router.route("/all").get(allUsers);
// router.route("/:id").get(singleUser);
// router.route("/:id").delete(deleteUser);

// router.route("/all/withPost").get(usersWithAllPost);
// router.route("/all/withPost/count").get(usersWithHisPostCount);

export default router