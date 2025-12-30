import { TaskRepository } from "../../ports/repositories/TaskRepository";
import { TaskScheduler } from "../../ports/repositories/TaskScheduler";
import { AuditRepository } from "../../ports/repositories/AuditRepository";
import { TaskAudit } from "../../../domain/entities/TaskAudit";
import { TaskAuditAction } from "../../../domain/enums/enumAudittask";
export class CancelTask{
    constructor(private taskRepository: TaskRepository , private taskScheduler: TaskScheduler,private auditRepository:AuditRepository) {}

    async execute(taskId:string,assigneeId:string):Promise<void>{
        const task=await this.taskRepository.findById(taskId);
        if(!task){
            throw new Error("Task not found");  
        }
        task.cancel();
        const taskAudit=new TaskAudit(
            null,
            taskId,
            TaskAuditAction.TASK_CANCELLED,
            assigneeId,
            new Date()
        )
        await this.auditRepository.save(taskAudit) 
        await this.taskRepository.update(task);
        await this.taskScheduler.cancelTaskJobs(taskId);
    }
}