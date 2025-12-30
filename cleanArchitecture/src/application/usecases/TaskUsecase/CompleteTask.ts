import { TaskRepository } from "../../ports/repositories/TaskRepository";
import { AuditRepository } from "../../ports/repositories/AuditRepository";
import { TaskAudit } from "../../../domain/entities/TaskAudit";
import { TaskAuditAction } from "../../../domain/enums/enumAudittask";
export class CompleteTask{
    constructor (private taskRepository: TaskRepository,private auditRepository:AuditRepository) {}

    async execute(taskId:string,requestBy:string):Promise<void>{
        const task=await this.taskRepository.findById(taskId);
        if(!task){
            throw new Error("Task not found");  
        }
        task.complete(requestBy);
        const taskAudit=new TaskAudit(
            null,
            taskId,
            TaskAuditAction.TASK_COMPLETED,
            requestBy,
            new Date()
        )
        await this.auditRepository.save(taskAudit) 
        await this.taskRepository.update(task);
    }
}