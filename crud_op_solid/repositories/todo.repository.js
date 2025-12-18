class TodoRepository {
  constructor() {
    this.todos = [];
  }

  getAll() {
    return this.todos;
  }

  getById(id) {
    return this.todos.find(t => t.id === id);
  }

  create(todo) {
    this.todos.push(todo);
    return todo;
  }

  update(id, data) {
    const todo = this.getById(id);
    if (!todo) return null;

    Object.assign(todo, data);
    return todo;
  }

  delete(id) {
    const index = this.todos.findIndex(t => t.id === id);
    if (index === -1) return false;

    this.todos.splice(index, 1);
    return true;
  }
}

module.exports = TodoRepository;
