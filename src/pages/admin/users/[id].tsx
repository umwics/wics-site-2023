import { CircularProgress, Container, Typography } from "@material-ui/core";
import { makeStyles, Theme } from "@material-ui/core/styles";
import { GetStaticPaths, GetStaticProps, GetStaticPropsResult, NextPage } from "next";
import { useRouter } from "next/router";
import AdminLayout from "../../../components/layouts/AdminLayout";
import ListDetail from "../../../components/ListDetail";
import { User } from "../../../interfaces";
import { getUser } from "../../../lib/db";
import { NotFoundError } from "../../../lib/errors";
import { getAsString } from "../../../utils/queryParams";

interface Props {
    user: User | null;
    errors?: string;
}

const useStyles = makeStyles((theme: Theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
    }
}));

const UserDetail: NextPage<Props> = ({ user, errors }: Props) => {
    const router = useRouter();
    const classes = useStyles();

    // If the page is not yet generated, this will be displayed
    // initially until getStaticProps() finishes running
    if (router.isFallback) {
        return (
            <AdminLayout title={"Loading..."}>
                <Container component="main" maxWidth="xs">
                    <div className={classes.paper}>
                        <CircularProgress />
                    </div>
                </Container>
            </AdminLayout>
        );
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
        <AdminLayout title={`${user ? user.username : "User Detail"}`}>
            {user && <ListDetail item={user} />}
        </AdminLayout>
    );
};

export const getStaticPaths: GetStaticPaths = async () => {
    // Get the paths we want to pre-render based on users
    const paths: { params: { id: string } }[] = []; // Let it all fallback

    return { paths, fallback: true };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const staticProps: GetStaticPropsResult<Props> = { props: { user: null }, revalidate: 60 };

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

export default UserDetail;
