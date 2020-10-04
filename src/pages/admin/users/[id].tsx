import { Container, Typography } from "@material-ui/core";
import { makeStyles, Theme } from "@material-ui/core/styles";
import { GetStaticPaths, GetStaticProps, GetStaticPropsResult, NextPage } from "next";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import AdminLoading from "../../../components/admin/AdminLoading";
import UserProfile from "../../../components/admin/UserProfile";
import { useConfirm } from "../../../components/ConfirmProvider";
import AdminLayout from "../../../components/layouts/AdminLayout";
import { hasPermission, User } from "../../../interfaces";
import { AuthContextInstance, ExcludeAuthProps, withAuth } from "../../../lib/auth";
import { getUser, useUser } from "../../../lib/db";
import { NotFoundError } from "../../../lib/errors";
import { getAsString } from "../../../utils/queryParams";

interface Props {
    user: User | null;
    errors?: string;
    auth: AuthContextInstance;
}

const useStyles = makeStyles((theme: Theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
    }
}));

const UserDetail: NextPage<Props> = ({ user, errors, auth }: Props) => {
    const { enqueueSnackbar } = useSnackbar();
    const router = useRouter();
    const classes = useStyles();
    const confirm = useConfirm();

    const { data: revalidatedUser } = useUser(user?.id, { initialData: user });

    const updateUser = async (user: User) => {
        const response = await fetch(`/api/${process.env.apiVersion}/users/${user.id}`, {
            method: "PATCH",
            headers: {
                token: (await auth.getUserToken()) as string
            },
            body: JSON.stringify({ ...user })
        });

        if (response.ok) {
            enqueueSnackbar("Successfully Updated User", { variant: "success" });
        } else enqueueSnackbar("Failed to Update User", { variant: "error" });
    };

    const deleteUser = async (user: User) => {
        const ownAccount = auth.user?.id === user.id;

        confirm({
            description: ownAccount
                ? "Your account will permanently be deleted."
                : "This user will permanently be deleted.",
            confirmText: "Delete"
        })
            .then(async () => {
                const response = await fetch(`/api/${process.env.apiVersion}/users/${user.id}`, {
                    method: "DELETE",
                    headers: {
                        token: (await auth.getUserToken()) as string
                    }
                });

                if (response.ok) {
                    enqueueSnackbar("Successfully Deleted User", { variant: "success" });
                    if (ownAccount) {
                        auth.signout();
                        router.push("/");
                    } else router.push("/admin/users");
                } else enqueueSnackbar("Failed to Delete User", { variant: "error" });
            })
            .catch(() => {
                // pass
            });
    };

    // If the page is not yet generated, this will be displayed
    // initially until getStaticProps() finishes running
    if (router.isFallback) {
        return <AdminLoading />;
    }

    if (errors) {
        return (
            <AdminLayout title="Error">
                <Container component="main" maxWidth="xs">
                    <div className={classes.paper}>
                        <Typography component="h1" variant="h5" style={{ color: "red" }}>
                            Error
                        </Typography>
                        <p>
                            <span>{errors}</span>
                        </p>
                    </div>
                </Container>
            </AdminLayout>
        );
    }

    return (
        <AdminLayout title={`${revalidatedUser ? revalidatedUser.username : "User Detail"}`}>
            {revalidatedUser && (
                <UserProfile
                    user={revalidatedUser}
                    updateUser={updateUser}
                    deleteUser={deleteUser}
                />
            )}
        </AdminLayout>
    );
};

export const getStaticPaths: GetStaticPaths = async () => {
    // Get the paths we want to pre-render based on users
    const paths: { params: { id: string } }[] = []; // Let it all fallback

    return { paths, fallback: true };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const staticProps: GetStaticPropsResult<ExcludeAuthProps<Props>> = {
        props: { user: null },
        revalidate: 60
    };

    try {
        if (params?.id) {
            const id = params.id;
            const user = await getUser(getAsString(id));

            if (!user) throw new NotFoundError("User not found");
            else staticProps.props.user = user;
        }
    } catch (err) {
        staticProps.props.errors = err.message;
    }

    return staticProps;
};

export default withAuth(UserDetail, {
    allowedAccess: (user: User | null) => !!user && hasPermission(user, "read")
});
