import { Router } from "express";
import {fetchTodos,createTodos,updateTodos,deleteTodos} from './controller.js';

const route=Router();
route.get('/todos',fetchTodos);
route.post('/todos',createTodos);
route.put('/todos/:id',updateTodos);
route.delete('/todos/:id',deleteTodos);

export default route;
