import express from "express";
import {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
  getTaskById,
  toggleTaskStatus,
} from "../Controllers/Taskcontroller.js";
import { protect } from "../Middleware/middleware.js";

const router = express.Router();

router.post("/createtask", protect, createTask);
router.get("/gettasks", protect, getTasks);
router.put("/updatetask/:id", protect, updateTask);
router.delete("/deletetask/:id", protect, deleteTask);
router.get("/gettask/:id", protect, getTaskById);
router.put("/toggletask/:id", protect, toggleTaskStatus);

export default router;
