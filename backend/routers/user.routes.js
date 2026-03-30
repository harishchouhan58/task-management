import { Router } from "express";
import { registerUser, loginUser, deleteUser, updateUser } from "../controllers/user.controller.js";

const router = Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/update/:userId', updateUser);
router.post('/delete/:userId', deleteUser);

export default router;