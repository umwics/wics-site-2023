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
export const defaultUserRole = "user";

export interface PermissionUser {
    role: UserRole;
}

export type User = AuthUser & CustomUser & PermissionUser;
