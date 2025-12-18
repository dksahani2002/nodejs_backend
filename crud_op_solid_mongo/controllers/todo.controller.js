class TodoController {
  constructor(todoService) {
    this.todoService = todoService;
  }

   create = async (req, res) => {
    try {
      const todo = await this.todoService.createTodo(req.body);
      res.status(201).json(todo);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  };

  getAll = async (req, res) => {
    res.json(await this.todoService.getTodos());
  };

  update = async (req, res) => {
    const todo = await this.todoService.updateTodo(req.params.id, req.body);
    if (!todo) return res.status(404).json({ error: "Not found" });
    res.json(todo);
  };

  delete = async (req, res) => {
    const success = await this.todoService.deleteTodo(req.params.id);
    if (!success) return res.status(404).json({ error: "Not found" });
    res.json({ message: "Deleted" });
  };
}

export default TodoController;
