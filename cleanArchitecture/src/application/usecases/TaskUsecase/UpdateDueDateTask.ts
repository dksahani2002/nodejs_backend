import { TaskRepository } from "../../ports/repositories/TaskRepository";
import { TaskScheduler } from "../../ports/repositories/TaskScheduler";
import { AuditRepository } from "../../ports/repositories/AuditRepository";
import { TaskAudit } from "../../../domain/entities/TaskAudit";
import { TaskAuditAction } from "../../../domain/enums/enumAudittask";
export class UpdateDueDateTask{

    constructor(private taskRepository: TaskRepository , private taskScheduler: TaskScheduler,private auditRepository:AuditRepository) {}

    async execute(taskId:string,newDueAt:Date,requestBy:string):Promise<void>{
        const task=await this.taskRepository.findById(taskId);
        if(!task){
            throw new Error("Task not found");  
        }
        //domain rule
        task.updateDueDate(newDueAt);
        //persist task first
        await this.taskRepository.update(task);

        
        await this.taskScheduler.cancelTaskJobs(taskId);
         if(task.dueAt) {
            await this.taskScheduler.scheduleDueReminder(taskId, task.dueAt);
            await this.taskScheduler.scheduleOverdueCheck(taskId, task.dueAt);
        }
        await this.taskScheduler.scheduleAutoClose(taskId);  

        const taskAudit=new TaskAudit(
            null,
            taskId,
            TaskAuditAction.TASK_DUEDATE_UPDATED,
            requestBy,
            new Date()
        )
        await this.auditRepository.save(taskAudit)
    }
}