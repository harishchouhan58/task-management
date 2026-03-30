import { Router } from "express";
import { createTask, deleteTask, updateTask } from "../controllers/task.controller.js";
import {verifyJWT} from "../middlewares/auth.middleware.js";
const router = Router();

router.post("/task", verifyJWT, createTask);   
router.delete("/task/delete/:taskId",verifyJWT, deleteTask);
router.patch("/task/update/:taskId",verifyJWT, updateTask);

export default router;


