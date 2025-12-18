const Todo = require("../models/todo.model");

class TodoService {
  constructor(todoRepository) {
    this.todoRepository = todoRepository;
  }

  createTodo(data) {
    if (!data.title) {
      throw new Error("Title is required");
    }
    const todo = new Todo(Date.now().toString(), data.title, data.description);
    return this.todoRepository.create(todo);
  }

  getTodos() {
    return this.todoRepository.getAll();
  }

  updateTodo(id, data) {
    return this.todoRepository.update(id, data);
  }

  deleteTodo(id) {
    return this.todoRepository.delete(id);
  }
}

module.exports = TodoService;
