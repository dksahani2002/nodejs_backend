import {todo} from './model.js';
export const fetchTodos = (req, res) => {
    // Logic to fetch todos
    console.log("Fetching todos");
    return res.status(200).json(todo);
}
export const createTodos = (req, res) => {
    const todoItem = {
        id: new Date().getTime().toString(),
        title: req.body.title,
        description: req.body.description,
        completed: false
    };  
    todo.push(todoItem);
    return res.status(201).json(todoItem);
}
export const updateTodos = (req, res) => {
    const id = req.params.id;
    const todoIndex = todo.findIndex(item => item.id === id);
    if (todoIndex !== -1) {
        todo[todoIndex] = { ...todo[todoIndex], ...req.body };
        return res.status(200).json(todo[todoIndex]);
    }
    return res.status(404).json({ message: "Todo not found" });
}
export const deleteTodos = (req, res) => {
    const id = req.params.id;
    const todoIndex = todo.findIndex(item => item.id === id);
    if (todoIndex !== -1) {
        todo.splice(todoIndex, 1);
        return res.status(200).json({ message: "Todo deleted successfully" });
    }
    return res.status(404).json({ message: "Todo not found" });
}