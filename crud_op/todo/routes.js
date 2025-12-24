import { Router } from "express";
import { fetchTodos, createTodos, updateTodos, deleteTodos } from './controller.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { validateBody, validateParamId } from '../middleware/validate.js';
import { createTodosSchema,updateTodosSchema } from "../validators/todoValidator.js";
const route = Router();
route.get('/todos', asyncHandler(fetchTodos));
route.post('/todos', validateBody(createTodosSchema), asyncHandler(createTodos));
route.put('/todos/:id',validateParamId, validateBody(updateTodosSchema), asyncHandler(updateTodos));
route.delete('/todos/:id',validateParamId, asyncHandler(deleteTodos));

export default route;
