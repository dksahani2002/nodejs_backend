import { Router } from "express";

import { TaskController } from "../../interfaceAdapters/controllers/TaskController";
import { makeTaskController } from "./task.factory";

const taskController: TaskController = makeTaskController();

const router = Router();

router.post("/", taskController.create); 
router.post("/assign/:taskId", taskController.assign); 
router.post("/complete/:taskId", taskController.complete);
router.put("/update/:taskId", taskController.update);
router.put("/update-due-date/:taskId", taskController.updateDueDate);
router.delete("/cancel/:taskId", taskController.cancel);    

export default router;