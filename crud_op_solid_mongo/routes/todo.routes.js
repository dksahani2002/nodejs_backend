// const express = require("express");
import express from "express";
// const TodoRepository = require("../repositories/todo.repository");
// const TodoService = require("../services/todo.service");
import TodoService from "../services/todo.service.js";
// const TodoController = require("../controllers/todo.controller");
import TodoController from "../controllers/todo.controller.js";
// const TodoRepositoryMongo = require("../repositories/todo.repositoryMongo");
import TodoRepositoryMongo from "../repositories/todo.repositoryMongo.js";
const router = express.Router();

// const repo = new TodoRepository();
const repo = new TodoRepositoryMongo();
const service = new TodoService(repo);
const controller = new TodoController(service);

router.post("/", controller.create);
router.get("/", controller.getAll);
router.put("/:id", controller.update);
router.delete("/:id", controller.delete);

export default router;
