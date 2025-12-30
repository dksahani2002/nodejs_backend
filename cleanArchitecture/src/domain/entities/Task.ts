import { TaskPriority, TaskStatus } from "../enums/enumTask";

export class Task {
  constructor(
    public id: string | null,
    public title: string,
    public description: string,
    public priority: TaskPriority = TaskPriority.LOW,
    public dueAt: Date | null = null,
    public assigneeId: string | null = null,
    public status: TaskStatus = TaskStatus.OPEN,

    private createdAt: Date = new Date(),
    private completedAt: Date | null = null,

    // ✅ Idempotency guards
    private reminderSentAt: Date | null = null,
    private overdueEscalatedAt: Date | null = null
  ) {}

  /* =======================
     Assignment
     ======================= */
  assign(userId: string) {
    if (this.isCompleted()) {
      throw new Error("Cannot assign a completed task");
    }
    if (this.status !== TaskStatus.OPEN) {
      throw new Error("Only OPEN tasks can be assigned");
    }

    this.assigneeId = userId;
    this.status = TaskStatus.ASSIGNED;
  }

  /* =======================
     User completion
     ======================= */
  complete(requestBy: string) {
    if (this.isCompleted()) {
      throw new Error("Task is already completed");
    }
    if (!this.assigneeId) {
      throw new Error("Task is not assigned to any user");
    }
    if (this.assigneeId !== requestBy) {
      throw new Error("Only the assigned user can complete the task");
    }
    if (this.status !== TaskStatus.ASSIGNED) {
      throw new Error("Only ASSIGNED tasks can be completed");
    }

    this.status = TaskStatus.COMPLETED;
    this.completedAt = new Date();
  }
  updateDetails(
    title?: string,
    description?: string,
    priority?: TaskPriority
  ) {
    if (this.isCompleted()) {
      throw new Error("Cannot update a completed task");
    }
    if (title !== undefined) this.title = title;
    if (description !== undefined) this.description = description;
    if (priority !== undefined) this.priority = priority;
  }
  updateDueDate(newDueAt: Date) {
    if (this.isCompleted()) {
      throw new Error("Cannot update due date of a completed task");
    }
    this.dueAt = newDueAt;
  }
  cancel(){
    if (this.isCompleted()) {
      throw new Error("Cannot cancel a completed task");
    }
    this.status=TaskStatus.CANCELLED;   
  }
  /* =======================
     System completion (auto-close)
     ======================= */
  completeBySystem() {
    if (this.isCompleted()) return;

    this.status = TaskStatus.COMPLETED;
    this.completedAt = new Date();
  }

  /* =======================
     Reminder (idempotent)
     ======================= */
  markReminderSent() {
    if (this.reminderSentAt) return;
    this.reminderSentAt = new Date();
  }

  isReminderSent(): boolean {
    return this.reminderSentAt !== null;
  }

  /* =======================
     Overdue escalation (idempotent)
     ======================= */
  markOverdueEscalated() {
    if (this.overdueEscalatedAt) return;
    this.overdueEscalatedAt = new Date();
  }

  isOverdueEscalated(): boolean {
    return this.overdueEscalatedAt !== null;
  }

  /* =======================
     Queries
     ======================= */
  isCompleted(): boolean {
    return this.status === TaskStatus.COMPLETED;
  }

  isOverdue(now: Date = new Date()): boolean {
    if (!this.dueAt) return false;
    return now > this.dueAt && !this.isCompleted();
  }

  /* =======================
     Identity
     ======================= */
  setId(id: string) {
    if (this.id) {
      throw new Error("Task ID already set");
    }
    this.id = id;
  }

  getId(): string {
    if (!this.id) {
      throw new Error("Task ID is not set");
    }
    return this.id;
  }

  /* =======================
     Metadata
     ======================= */
  getCreatedAt(): Date {
    return this.createdAt;
  }

  getCompletedAt(): Date | null {
    return this.completedAt;
  }

  getReminderSentAt(): Date | null {
    return this.reminderSentAt;
  }

  getOverdueEscalatedAt(): Date | null {
    return this.overdueEscalatedAt;
  }
}
