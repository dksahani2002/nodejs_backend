import { MongoTaskRepository } from "../../infrastructure/db/repositories/MongoTaskRepository";
import { TaskController } from "../../interfaceAdapters/controllers/TaskController";
import { CreateTask } from "../../application/usecases/TaskUsecase/CreateTask";
import { AgendaTaskScheduler } from "../../infrastructure/scheduler/AgendaTaskSchedulerRepository";
import { AssignTask } from "../../application/usecases/TaskUsecase/AssignTask";
import { CompleteTask } from "../../application/usecases/TaskUsecase/CompleteTask";
import { UpdateTask } from "../../application/usecases/TaskUsecase/UpdateTask";
import { UpdateDueDateTask } from "../../application/usecases/TaskUsecase/UpdateDueDateTask";
import { CancelTask } from "../../application/usecases/TaskUsecase/CancelTask";
import { MongoTaskAuditRepository } from "../../infrastructure/db/repositories/MongoTaskAuditRepository";

export function makeTaskController(): TaskController {
    const taskRepo=new MongoTaskRepository();
    const schedulerRepo=new AgendaTaskScheduler();
    const auditRepo=new MongoTaskAuditRepository();
    const assignTask=new AssignTask(taskRepo,auditRepo);
    const cancelTask=new CancelTask(taskRepo, schedulerRepo,auditRepo);
    const completeTask= new CompleteTask(taskRepo,auditRepo);
    const createTask= new CreateTask(taskRepo, schedulerRepo,auditRepo);
    const updateDueDateTask=new UpdateDueDateTask(taskRepo, schedulerRepo,auditRepo);
    const updateTask=new UpdateTask(taskRepo,auditRepo);
    return new TaskController(createTask, assignTask, completeTask, updateTask, cancelTask, updateDueDateTask);
}