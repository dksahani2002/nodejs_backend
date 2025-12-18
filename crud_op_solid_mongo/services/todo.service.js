// const Todo = require("../models/todo.model");

class TodoService {
  constructor(todoRepository) {
    this.todoRepository = todoRepository;
  }

  async createTodo(data) {
    if (!data.title) {
      throw new Error("Title is required");
    }
    // const todo = new Todo(Date.now().toString(), data.title, data.description);
    return await this.todoRepository.create(data);
  }

  async getTodos() {
    return await this.todoRepository.getAll();
  }

  async updateTodo(id, data) {
    return await this.todoRepository.update(id, data);
  }

  async deleteTodo(id) {
    return await this.todoRepository.delete(id);
  }
}
export default TodoService;
