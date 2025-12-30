import { AuditRepository } from "../../ports/repositories/AuditRepository";

export class GetTaskAuditService {
    constructor(private auditRepository: AuditRepository) {}

    async execute(taskId: string) {
        return this.auditRepository.findByTaskId(taskId);
    }
}