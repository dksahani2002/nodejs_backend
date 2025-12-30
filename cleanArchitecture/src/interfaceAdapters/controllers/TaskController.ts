import {Request, Response} from "express";
import { AssignTask } from "../../application/usecases/TaskUsecase/AssignTask";
import { CreateTask } from "../../application/usecases/TaskUsecase/CreateTask"; 
import { CreateTaskDTO } from "../../application/dto/taskDto/CreateTaskDTO";
import { CompleteTask } from "../../application/usecases/TaskUsecase/CompleteTask";
import { UpdateDueDateTask } from "../../application/usecases/TaskUsecase/UpdateDueDateTask";
import { UpdateTask } from "../../application/usecases/TaskUsecase/UpdateTask";
import { CancelTask } from "../../application/usecases/TaskUsecase/CancelTask";

export class TaskController {
    constructor(
        private createTask: CreateTask,
        private assignTask: AssignTask,
        private completeTask: CompleteTask,
        private updateTask: UpdateTask,
        private cancelTask: CancelTask,
        private updateDueDateTask: UpdateDueDateTask
    ) {}
         
    async create(req: Request, res: Response): Promise<void> {
        const { title, description, priority, dueAt } = req.body;
        const {userId}=req.params;
        const taskInput: CreateTaskDTO = {
            title,
            description,
            priority,
            dueAt
        };
        await this.createTask.execute(taskInput,userId);
        res.status(201).send({ message: "Task created successfully" });
    }
    async assign(req: Request, res: Response): Promise<void> {
        const {taskId}=req.params;
        const { assigneeId } = req.body;
        await this.assignTask.execute(taskId, assigneeId);
        res.status(200).send({ message: "Task assigned successfully" });
    }
    async complete(req: Request, res: Response): Promise<void> {
        const {taskId}=req.params;
        const {requestBy}=req.body;
        await this.completeTask.execute(taskId,requestBy);
        res.status(200).send({ message: "Task completed successfully" });
    }
    async update(req: Request, res: Response): Promise<void> {
        const {taskId}=req.params;
        const {userId}=req.body;
        const { title, description, priority } = req.body;
        await this.updateTask.execute(taskId, { title, description, priority },userId);
        res.status(200).send({ message: "Task updated successfully" });
    }
    async updateDueDate(req: Request, res: Response): Promise<void> {
        const {taskId}=req.params;
        const { userId, newDueAt } = req.body;
        await this.updateDueDateTask.execute(taskId, new Date(newDueAt),userId);
        res.status(200).send({ message: "Task due date updated successfully" });
    }   
    async cancel(req: Request, res: Response): Promise<void> {
        const {taskId}=req.params;
        const {assigneeId}=req.body;
        await this.cancelTask.execute(taskId,assigneeId);
        res.status(200).send({ message: "Task canceled successfully" });
    }   
}