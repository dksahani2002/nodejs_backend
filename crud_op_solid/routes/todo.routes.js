const express = require("express");
const TodoRepository = require("../repositories/todo.repository");
const TodoService = require("../services/todo.service");
const TodoController = require("../controllers/todo.controller");

const router = express.Router();

const repo = new TodoRepository();
const service = new TodoService(repo);
const controller = new TodoController(service);

router.post("/", controller.create);
router.get("/", controller.getAll);
router.put("/:id", controller.update);
router.delete("/:id", controller.delete);

module.exports = router;
