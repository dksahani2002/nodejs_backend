class TodoController {
  constructor(todoService) {
    this.todoService = todoService;
  }

  create = (req, res) => {
    try {
      const todo = this.todoService.createTodo(req.body);
      res.status(201).json(todo);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  };

  getAll = (req, res) => {
    res.json(this.todoService.getTodos());
  };

  update = (req, res) => {
    const todo = this.todoService.updateTodo(req.params.id, req.body);
    if (!todo) return res.status(404).json({ error: "Not found" });
    res.json(todo);
  };

  delete = (req, res) => {
    const success = this.todoService.deleteTodo(req.params.id);
    if (!success) return res.status(404).json({ error: "Not found" });
    res.json({ message: "Deleted" });
  };
}

module.exports = TodoController;
