export class TaskAudit {
  constructor(
    public id: string | null,
    public  taskId: string,
    public  action: string,
    public  performedBy: string, // userId | SYSTEM
    public  createdAt: Date
  ) {}
    setId(id: string) {
        if (this.id) {
        throw new Error("Task Audit ID already set");
        }
        this.id = id;
    }

    getId(): string {
        if (!this.id) {
        throw new Error("Task Audit ID is not set");
        }
        return this.id;
    }
}
