import { Container, makeStyles, Theme, Typography } from "@material-ui/core";
import { GetStaticProps, NextPage } from "next";
import useSWR from "swr";
import AdminLayout from "../../../components/layouts/AdminLayout";
import UserList from "../../../components/UserList";
import { User } from "../../../interfaces";
import { AuthContextInstance, withAuth } from "../../../lib/auth";
import { getAllUsers, updateUser } from "../../../lib/db";

interface Props {
    users: User[];
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

const Users: NextPage<Props> = ({ users }: Props) => {
    const classes = useStyles();

    const { data, mutate } = useSWR<{ users: User[] }>(`/api/${process.env.apiVersion}/users`, {
        initialData: { users }
    });

    const revalidatedUsers = (data && data.users) || [];

    const updateVisibleUser = async (user: User) => {
        await updateUser(user.id, user);
        mutate({
            users: [user, ...revalidatedUsers.filter(checkUser => checkUser.id !== user.id)]
        });
    };

    return (
        <AdminLayout title="Users">
            <Container component="main" maxWidth="md">
                <div className={classes.paper}>
                    <Typography component="h1" variant="h5">
                        Users List
                    </Typography>
                    <UserList users={revalidatedUsers} updateUser={updateVisibleUser} />
                </div>
            </Container>
        </AdminLayout>
    );
};

export const getStaticProps: GetStaticProps = async () => {
    const users: User[] = await getAllUsers();
    return { props: { users }, revalidate: 60 };
};

export default withAuth(Users, {
    allowedAccess: () => true
});
