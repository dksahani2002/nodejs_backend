import { TaskRepository } from "../../ports/repositories/TaskRepository";
import {TaskAuditAction} from "../../../domain/enums/enumAudittask"
import { AuditRepository } from "../../ports/repositories/AuditRepository";
import { TaskAudit } from "../../../domain/entities/TaskAudit";
export class AssignTask{
    constructor (private taskRepository: TaskRepository,private auditRepository:AuditRepository) {}

    async execute(taskId:string , assigneeId:string):Promise<void>{
        const task=await this.taskRepository.findById(taskId);
        if(!task){
            throw new Error("Task not found");
        }
        task.assign(assigneeId);
        const taskAudit=new TaskAudit(
            null,
            taskId,
            TaskAuditAction.TASK_ASSIGNED,
            assigneeId,
            new Date()
        )
       await this.auditRepository.save(taskAudit) 

        await this.taskRepository.update(task);
    }   
}