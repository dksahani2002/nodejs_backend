import { Router } from "express";

import { UserController } from "../../interfaceAdapters/controllers/UserController";
import { makeUserController } from "./user.factory";

const userController: UserController = makeUserController();

const router = Router();

router.post("/", userController.create);
router.put("/:id", userController.update);
router.delete("/:id", userController.delete);

export default router;