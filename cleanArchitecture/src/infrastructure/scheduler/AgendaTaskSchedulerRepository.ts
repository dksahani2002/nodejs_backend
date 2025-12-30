import { TaskScheduler } from "../../application/ports/repositories/TaskScheduler";
import { agenda } from "./agenda";
import { AgendaJobs } from "./agendaJobs";
import { env } from "../../config/env";
export class AgendaTaskScheduler implements TaskScheduler {
  async scheduleDueReminder(taskId: string, dueAt: Date): Promise<void> {
    const offsetMs = env.task.reminderOffsetMinutes * 60 * 1000;
    const reminderAt = new Date(dueAt.getTime() - offsetMs);
    if(dueAt <= new Date()) {
      throw new Error("Due date must be in the future to schedule a reminder.");
    }
    await agenda.schedule(reminderAt, AgendaJobs.TASK_DUE_REMINDER, { taskId });
  }

  async scheduleOverdueCheck(taskId: string, dueAt: Date): Promise<void> {
    const overdueAt = new Date(dueAt.getTime() + env.task.reminderOverdueHours * 60 * 60 * 1000); // reminderOverdueHours later
    await agenda.schedule(overdueAt, AgendaJobs.TASK_OVERDUE_ESCALATION, { taskId });
  }

  async scheduleAutoClose(taskId: string): Promise<void> {
    const autoCloseAt = new Date(Date.now() + env.task.autoCloseDays * 24 * 60 * 60 * 1000); // autoCloseDays later
    await agenda.schedule(autoCloseAt, AgendaJobs.TASK_AUTO_CLOSE, { taskId });
  }

  async cancelTaskJobs(taskId: string): Promise<void> {
    await agenda.cancel({ 'data.taskId': taskId });
  }
}