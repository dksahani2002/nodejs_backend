import { Task } from "../../../domain/entities/Task";
import { TaskRepository } from "../../ports/repositories/TaskRepository";
import { TaskScheduler } from "../../ports/repositories/TaskScheduler";
import { CreateTaskDTO } from "../../dto/taskDto/CreateTaskDTO";
import { AuditRepository } from "../../ports/repositories/AuditRepository";
import { TaskAudit } from "../../../domain/entities/TaskAudit";
import { TaskAuditAction } from "../../../domain/enums/enumAudittask";
export class CreateTask {
    constructor(private taskRepository: TaskRepository, private taskScheduler: TaskScheduler,private auditRepository:AuditRepository) {}
    async execute(input: CreateTaskDTO,requestBy:string): Promise<void> {
        const task = new Task(
          null,
          input.title,
          input.description,
          input.priority,
          input.dueAt,
          input.assigneeId
        );
        await this.taskRepository.create(task);
        const taskId = task.getId();
        const taskAudit=new TaskAudit(
            null,
            taskId,
            TaskAuditAction.TASK_CREATED,
            requestBy,
            new Date()
        )
        await this.auditRepository.save(taskAudit) 
        if(task.dueAt) {
            await this.taskScheduler.scheduleDueReminder(taskId, task.dueAt);
            await this.taskScheduler.scheduleOverdueCheck(taskId, task.dueAt);
        }
        await this.taskScheduler.scheduleAutoClose(taskId); 
    }
       

}
