export interface AuthUser {
    id: string;
    email: string;
    provider: string;
    avatarURL: string;
}

export type UserRole = "owner" | "admin" | "user";
export const userRoles: UserRole[] = ["owner", "admin", "user"];
export const defaultUserRole = "user";

export interface CustomUser {
    username: string;
    role: UserRole;
}

export type User = AuthUser & CustomUser;
