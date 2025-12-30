import { TaskRepository } from "../../ports/repositories/TaskRepository";
import { TaskPriority } from "../../../domain/enums/enumTask";
import { AuditRepository } from "../../ports/repositories/AuditRepository";
import { TaskAudit } from "../../../domain/entities/TaskAudit";
import { TaskAuditAction } from "../../../domain/enums/enumAudittask";
export class UpdateTask{
    constructor(private taskRepository: TaskRepository,private auditRepository:AuditRepository ) {}

    async execute(taskId: string, updates: { title?: string; description?: string; priority?: TaskPriority },requestBy:string):Promise<void>{
        const task=await this.taskRepository.findById(taskId);
        if(!task){
            throw new Error("Task not found");  
        }
        task.updateDetails(
            updates.title,
            updates.description,
            updates.priority
        );

        await this.taskRepository.update(task); 
        const taskAudit=new TaskAudit(
            null,
            taskId,
            TaskAuditAction.TASK_UPDATED,
            requestBy,
            new Date()
        )
        await this.auditRepository.save(taskAudit)
    }
}