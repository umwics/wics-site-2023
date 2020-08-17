import { createContext, useContext, useEffect, useState } from "react";
import { CustomUser, defaultUserRole, User } from "../interfaces";
import { LoginFields } from "../pages/login";
import { RegisterFields } from "../pages/register";
import { createUser, getUser } from "./db";
import firebase, { auth } from "./firebase";

type AuthContextInstance =
    | {
          user: User | null;
          loading: boolean;
          createEmailPasswordUser: (
              registerInfo: RegisterFields
          ) => Promise<User | null> | undefined;
          signinWithEmailPassword: (loginInfo: LoginFields) => Promise<User | null> | undefined;
          signinWithGitHub: () => Promise<User | null> | undefined;
          signinWithGoogle: () => Promise<User | null> | undefined;
          signout: () => Promise<User | null> | undefined;
      }
    | undefined;

const AuthContext = createContext<AuthContextInstance>(undefined);

const useProvideAuth = (): AuthContextInstance => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    const handleUser = async (rawUser: any, customUser?: CustomUser): Promise<User | null> => {
        if (rawUser) {
            customUser = customUser || ((await getUser(rawUser.uid)) ?? undefined);
            const user = await formatUser(rawUser, customUser);
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { token, ...userWithoutToken } = user;

            createUser(userWithoutToken);

            setUser(user);
            setLoading(false);

            return user;
        } else {
            setUser(null);
            setLoading(false);

            return null;
        }
    };

    const createEmailPasswordUser = ({ username = "", email, password }: RegisterFields) => {
        setLoading(true);
        return auth
            ?.createUserWithEmailAndPassword(email, password)
            .then(response => handleUser(response.user, { username, role: defaultUserRole }));
    };

    const signinWithEmailPassword = ({ email, password }: LoginFields) => {
        setLoading(true);
        return auth
            ?.signInWithEmailAndPassword(email, password)
            .then(response => handleUser(response.user));
    };

    const signinWithGitHub = () => {
        setLoading(true);
        return auth
            ?.signInWithPopup(new firebase.auth.GithubAuthProvider())
            .then(response => handleUser(response.user));
    };

    const signinWithGoogle = () => {
        setLoading(true);
        return auth
            ?.signInWithPopup(new firebase.auth.GoogleAuthProvider())
            .then(response => handleUser(response.user));
    };

    const signout = () => {
        return auth?.signOut().then(() => handleUser(null));
    };

    useEffect(() => {
        const unsubscribe = auth?.onAuthStateChanged(handleUser);

        return () => (unsubscribe ? unsubscribe() : undefined);
    }, []);

    return {
        user,
        loading,
        createEmailPasswordUser,
        signinWithEmailPassword,
        signinWithGitHub,
        signinWithGoogle,
        signout
    };
};

const formatUser = (rawUser: any, customUser?: CustomUser): User & { token: string } => {
    return {
        id: rawUser.uid,
        username: rawUser.displayName,
        role: defaultUserRole,
        email: rawUser.email,
        token: rawUser.xa,
        provider: rawUser.providerData[0].providerId,
        avatarURL: rawUser.photoURL,
        ...customUser
    };
};

interface AuthProviderProps {
    children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }: AuthProviderProps) => {
    const auth = useProvideAuth();
    return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextInstance => {
    return useContext(AuthContext);
};
