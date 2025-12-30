import { AuditRepository } from "../../../application/ports/repositories/AuditRepository";
import { TaskAudit } from "../../../domain/entities/TaskAudit";
import { TaskAuditModel } from "../model/AuditModel";
export class MongoTaskAuditRepository implements AuditRepository {

    async save(audit: TaskAudit): Promise<void> {
       const doc =await TaskAuditModel.create({
                    taskId: audit.taskId,
                    action: audit.action,
                    performedBy: audit.performedBy,
                    createdAt: audit.createdAt
               })
               audit.setId(doc._id.toString());
    }

    async findByTaskId(taskId: string): Promise<TaskAudit[]> {
       const docs = await TaskAuditModel
    .find({ taskId })
    .sort({ createdAt: 1 });

  return docs.map(doc => {
    const audit = new TaskAudit(
        null,
        doc.taskId,
        doc.action,
        doc.performedBy,
        doc.createdAt
    );

    audit.setId(doc._id.toString());
    return audit;
  });
}
}