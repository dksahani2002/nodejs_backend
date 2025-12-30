import { TaskAudit } from "../../../domain/entities/TaskAudit";

export interface AuditRepository {
    save(audit: TaskAudit): Promise<void>;
    findByTaskId(taskId: string): Promise<TaskAudit[]>;
}