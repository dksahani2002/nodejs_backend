import { agenda } from "./agenda";
import { AgendaJobs } from "./agendaJobs";
import { TaskRepository } from "../../application/ports/repositories/TaskRepository";
import { Job } from "agenda";

type ReminderJobData = {
  taskId: string;
};

 export function registerTaskJobHandlers(taskRepository: TaskRepository) {
   
    agenda.define(AgendaJobs.TASK_DUE_REMINDER, async (job:Job<ReminderJobData>) => {
        const { taskId } = job.attrs.data;
        const task = await taskRepository.findById(taskId);
        if (!task || task.isReminderSent()) {
           return;
        }
        task.markReminderSent();
        await taskRepository.update(task);
        console.log(`Reminder: Task "${task.title}" is due soon.`);
    });

    agenda.define(AgendaJobs.TASK_OVERDUE_ESCALATION, async (job:Job<ReminderJobData>) => {
        const { taskId } = job.attrs.data;
        const task = await taskRepository.findById(taskId);
        if( !task || !task.isOverdue() || task.isCompleted() || task.isOverdueEscalated()) {
            return;
        }

        task.markOverdueEscalated();
        await taskRepository.update(task);
        console.log(`Escalation: Task "${task.title}" is overdue!`);
        
    });

   agenda.define(AgendaJobs.TASK_AUTO_CLOSE, async (job: Job<ReminderJobData>) => {
        const { taskId } = job.attrs.data;
        const task = await taskRepository.findById(taskId);

        if (!task || task.isCompleted()) return;

        task.completeBySystem();  
        await taskRepository.update(task);

        console.log(`Task "${task.title}" auto-closed by system.`);
    });
}   