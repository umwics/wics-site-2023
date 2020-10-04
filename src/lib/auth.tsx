import { NextPage } from "next";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import React, { createContext, useContext, useEffect, useState } from "react";
import AdminLoading from "../components/admin/AdminLoading";
import { CustomUser, User } from "../interfaces";
import { LoginFields } from "../pages/login";
import { RegisterFields } from "../pages/register";
import { getUser } from "./db";
import firebase, { auth } from "./firebase";
import { mapProviderUser } from "./mapProviderUser.";

export interface AuthContextInstance {
    user: User | null;
    loading: boolean;
    createEmailPasswordUser: (registerInfo: RegisterFields) => Promise<User | null> | undefined;
    signinWithEmailPassword: (loginInfo: LoginFields) => Promise<User | null> | undefined;
    signinWithGitHub: () => Promise<User | null> | undefined;
    signinWithGoogle: () => Promise<User | null> | undefined;
    getUserToken: () => Promise<string | null> | undefined;
    signout: () => Promise<User | null> | undefined;
}

const AuthContext = createContext<AuthContextInstance>({} as AuthContextInstance);

interface AuthProviderProps {
    children: React.ReactNode;
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }: AuthProviderProps) => {
    const { enqueueSnackbar } = useSnackbar();
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    const handleUser = async (rawUser: any, customUser?: CustomUser): Promise<User | null> => {
        if (rawUser && customUser) {
            // register
            const token = await getUserToken();

            const response = await fetch(`/api/${process.env.apiVersion}/users`, {
                method: "POST",
                headers: {
                    token: token as string
                },
                body: JSON.stringify({ ...customUser })
            });
            const newUser = await response.json();

            if (response.ok) {
                setUser({ ...newUser });
                enqueueSnackbar("Login Successful", { variant: "success" });
            } else {
                enqueueSnackbar("Login Failed", { variant: "error" });
            }
            setLoading(false);

            return newUser;
        } else if (rawUser) {
            // login
            const authUser = mapProviderUser(rawUser);

            const newUser = await getUser(authUser.id);

            if (newUser) setUser({ ...newUser });
            setLoading(false);

            return newUser;
        } else {
            // logout
            setUser(null);
            setLoading(false);

            return null;
        }
    };

    const createEmailPasswordUser = ({ username = "", email, password }: RegisterFields) => {
        setLoading(true);
        return auth
            ?.createUserWithEmailAndPassword(email, password)
            .then(response => handleUser(response.user, { username }));
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
            .then(response =>
                handleUser(response.user, { username: response.user?.displayName || "" })
            );
    };

    const signinWithGoogle = () => {
        setLoading(true);
        return auth
            ?.signInWithPopup(new firebase.auth.GoogleAuthProvider())
            .then(response =>
                handleUser(response.user, { username: response.user?.displayName || "" })
            );
    };

    const getUserToken = async () => {
        return (await auth?.currentUser?.getIdToken()) || null;
    };

    const signout = () => {
        return auth?.signOut().then(() => handleUser(null));
    };

    useEffect(() => {
        const unsubscribe = auth?.onAuthStateChanged(handleUser);

        return () => (unsubscribe ? unsubscribe() : undefined);
    }, [auth]);

    return (
        <AuthContext.Provider
            value={{
                user,
                loading,
                createEmailPasswordUser,
                signinWithEmailPassword,
                signinWithGitHub,
                signinWithGoogle,
                getUserToken,
                signout
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = (): AuthContextInstance => {
    return useContext(AuthContext);
};

export interface WithAuthProps {
    auth: AuthContextInstance;
}

export type ExcludeAuthProps<P> = Pick<P, Exclude<keyof P, keyof WithAuthProps>>;

interface WithAuthOptions {
    defaultRedirection: string;
    loaderComponent: React.ElementType;
    allowedAccess: (user: User | null) => Promise<boolean> | boolean;
}

const defaultOptions: WithAuthOptions = {
    defaultRedirection: "/login",
    loaderComponent: () => <AdminLoading />,
    allowedAccess: (user: User | null) => !!user && user.role === "owner"
};

export const withAuth = <P extends WithAuthProps>(
    Page: NextPage<P>,
    pageOptions?: Partial<WithAuthOptions>
): NextPage<ExcludeAuthProps<P>> => {
    const options: WithAuthOptions = {
        ...defaultOptions,
        ...pageOptions
    };
    const { defaultRedirection, loaderComponent: LoaderComponent, allowedAccess } = options;

    const PrivatePage: NextPage<ExcludeAuthProps<P>> = (props: any) => {
        const router = useRouter();
        const auth = useAuth();
        const [allowedState, setAllowedState] = useState(false);

        useEffect(() => {
            const checkAccess = async () => {
                if (!auth.loading) {
                    const allowed = await allowedAccess(auth.user || null);

                    setAllowedState(allowed);
                    if (!allowed) {
                        router.replace(defaultRedirection);
                    }
                }
            };

            checkAccess();
        }, [router, auth]);

        if (!allowedState) {
            return <LoaderComponent />;
        }

        return <Page auth={auth} {...props} />;
    };

    PrivatePage.getInitialProps = Page.getInitialProps;

    return PrivatePage;
};

export default AuthProvider;
