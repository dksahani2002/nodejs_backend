// const todoModel = require("../models/todo.modelmongo");
import todoModel from "../models/todo.modelmongo.js";
class TodoRepositoryMongo{

    async create(todo) {
        // Implementation for MongoDB to create a new todo
        const created=await todoModel.create(todo);
        return {
            id: created._id.toString(),
            title: created.title,
            description: created.description,
            completed: created.completed
     };
    }
    async getAll() {
        // Implementation for MongoDB to get all todos
        return await todoModel.find({});
    }
    async getById(id) {
        // Implementation for MongoDB to get a todo by ID
        return await todoModel.findOne({ id: id });       
    }
    async update(id, data) {
        // Implementation for MongoDB to update a todo by ID
        return await todoModel.findByIdAndUpdate(id, data, { new: true });
    }
    async delete(id) {
        // Implementation for MongoDB to delete a todo by ID
        return await todoModel.findByIdAndDelete(id);
    }           
}
export default TodoRepositoryMongo;
// route->controller ->service->repositoryMongo->mongoDB->service->controller->route