import {todo} from './model.js';
import { ErrorResponse } from '../utils/ErrorResponse.js';

export const fetchTodos=async (req,res)=>{
    console.log("fetching todos");
    if(!Array.isArray(todo)){
        throw new ErrorResponse("Todo store unavailable",500);
    }
    return res.status(200).json({success: true, data: todo});
}
export const createTodos =async (req, res) => {
    const {title, description} = req.body;
    const todoItem = {
        id: new Date().getTime().toString(),
        title,
        description,
        completed: false
    };  
    todo.push(todoItem);
    return res.status(201).json({success:true,data:todoItem});
}
export const updateTodos = async(req, res) => {
    const id = req.params.id;
     
    const todoIndex = todo.findIndex(item => item.id === id);
    if(todoIndex===-1){
        throw new ErrorResponse("Todo not found",404);
    }
    // Joi validation already ran as middleware; merge sanitized req.body
    todo[todoIndex] = { ...todo[todoIndex], ...req.body };
    return res.status(200).json({success:true,data:todo[todoIndex]});
}
export const deleteTodos = async(req, res) => {
    const id = req.params.id;
    const todoIndex = todo.findIndex(item => item.id === id);
    if(todoIndex===-1){
        throw new ErrorResponse("Todo not found",404);
    }
 
    todo.splice(todoIndex, 1);
    return res.status(200).json({success:true, data: null });
    
}