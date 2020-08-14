import { Container, makeStyles, Theme, Typography } from "@material-ui/core";
import { GetStaticProps, NextPage } from "next";
import AdminLayout from "../../../components/layouts/AdminLayout";
import UserList from "../../../components/UserList";
import { User } from "../../../interfaces";
import { getAllUsers } from "../../../lib/db";

interface Props {
    users: User[];
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

    return (
        <AdminLayout title="Users">
            <Container component="main" maxWidth="md">
                <div className={classes.paper}>
                    <Typography component="h1" variant="h5">
                        Users List
                    </Typography>
                    <UserList users={users} />
                </div>
            </Container>
        </AdminLayout>
    );
};

export const getStaticProps: GetStaticProps = async () => {
    const users: User[] = await getAllUsers();
    return { props: { users }, revalidate: 60 };
};

export default Users;
