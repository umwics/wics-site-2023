import { AuthUser } from "../interfaces";

export const mapProviderUser = (rawUser?: Record<string, any>): AuthUser | never => {
    if (!rawUser) throw new Error("Raw user is not defined");

    return {
        id: rawUser.uid || rawUser.sub,
        username: rawUser.displayName || rawUser.name || "",
        email: rawUser.email || "",
        provider: rawUser.firebase?.sign_in_provider || rawUser.providerId || "",
        avatarURL: rawUser.picture || rawUser.photoURL || ""
    };
};
