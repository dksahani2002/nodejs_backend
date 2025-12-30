import { TaskRepository } from "../../../application/ports/repositories/TaskRepository";
import { Task } from "../../../domain/entities/Task";
import { TaskModel } from "../model/TaskModel";
import { TaskPriority, TaskStatus } from "../../../domain/enums/enumTask";

export class MongoTaskRepository implements TaskRepository {
    // Implementation details...
    async create(task:Task): Promise<void> {
        // MongoDB create logic here
        const doc =await TaskModel.create({
             title: task.title,
                description: task.description,
            
                priority:  task.priority,

                dueAt: task.dueAt,

                assigneeId: task.assigneeId,
                status:  task.status || TaskStatus.OPEN,
            
                createdAt: task.getCreatedAt(),
                completedAt: task.getCompletedAt(),
                reminderSentAt: task.getReminderSentAt(),
                overdueEscalatedAt: task.getOverdueEscalatedAt()
        })
        task.setId(doc._id.toString());
    }
    async findById(id: string): Promise<Task | null> {
        // MongoDB findById logic here
        const taskDoc=await TaskModel.findById(id);
        if(!taskDoc){
            return null;
        }
       
        return new Task(
            taskDoc._id.toString(),
            taskDoc.title,
            taskDoc.description,
            taskDoc.priority as TaskPriority,
            taskDoc.dueAt,
            taskDoc.assigneeId,
            taskDoc.status as TaskStatus,
            taskDoc.createdAt,
            taskDoc.completedAt,
            taskDoc.reminderSentAt,
            taskDoc.overdueEscalatedAt
        );   
    }
    async update(task: Task): Promise<void> {
        const taskId = task.getId();  

        await TaskModel.updateOne(
            { _id: taskId },
            {
            $set: {
                title: task.title,
                description: task.description,
                priority: task.priority,
                dueAt: task.dueAt,
                assigneeId: task.assigneeId,
                status: task.status,
                completedAt: task.getCompletedAt(),
                reminderSentAt: task.getReminderSentAt(),
                overdueEscalatedAt: task.getOverdueEscalatedAt(),
            },
            }
        );
    }
}