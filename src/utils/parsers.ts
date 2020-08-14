import { defaultUserRole, UserRole, userRoles } from "../interfaces";

export const parseUserRole = (input: string): UserRole => {
    return userRoles.find(role => role === input) || defaultUserRole;
};
