import { UserRole } from "./User";

export type PermissionSet<Permission extends string> = {
    [key in UserRole]: Permission[];
};
