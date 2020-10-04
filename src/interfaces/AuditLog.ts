export type AuditAction = "create" | "update" | "delete";

export interface AuditLog {
    id: string;
    executorId: string;
    action: AuditAction;
    collection: string;
    timestamp: string;
}
