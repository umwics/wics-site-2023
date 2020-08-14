import { Container, makeStyles, Theme, Typography } from "@material-ui/core";
import { NextPage } from "next";
import Link from "next/link";
import AdminLayout from "../components/layouts/AdminLayout";

const useStyles = makeStyles((theme: Theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
    }
}));

const Home: NextPage = () => {
    const classes = useStyles();

    return (
        <AdminLayout title="Home">
            <Container component="main" maxWidth="xs">
                <div className={classes.paper}>
                    <Typography component="h1" variant="h5">
                        Hello Next.js 👋
                    </Typography>
                    <p>
                        <Link href="/about">
                            <a>About</a>
                        </Link>
                    </p>
                </div>
            </Container>
        </AdminLayout>
    );
};

export default Home;
