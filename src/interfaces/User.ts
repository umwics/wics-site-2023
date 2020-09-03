import { PermissionSet } from "./Permission";

export interface AuthUser {
    id: string;
    email: string;
    provider: string;
    avatarURL: string;
    username: string;
    token?: string; // Should not be included in database
}

export interface CustomUser {
    username: string;
}

export type UserRole = "owner" | "admin" | "user";
export const userRoles: UserRole[] = ["owner", "admin", "user"];
export const userRoleLabels: { [key in UserRole]: string } = {
    owner: "Owner",
    admin: "Admin",
    user: "User"
};
export const defaultUserRole: UserRole = "user";

export type UserPermission = "read" | "write" | "manage";
export const userPermissionSet: PermissionSet<UserPermission> = {
    user: ["read"],
    admin: ["read", "write"],
    owner: ["read", "write", "manage"]
};

export const hasPermission = (user: User, permission: UserPermission): boolean => {
    return userPermissionSet[user.role].includes(permission);
};

export interface PermissionUser {
    role: UserRole;
}

export type User = AuthUser & CustomUser & PermissionUser;
