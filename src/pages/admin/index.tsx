import {
    Avatar,
    Card,
    CardActionArea,
    CardContent,
    CardHeader,
    Container,
    Grid,
    makeStyles,
    Theme,
    Typography
} from "@material-ui/core";
import { CollectionsBookmarkOutlined } from "@material-ui/icons";
import { NextPage } from "next";
import Link from "next/link";
import React from "react";
import AdminLayout from "../../components/layouts/AdminLayout";
import { hasPermission, User } from "../../interfaces";
import { AuthContextInstance, withAuth } from "../../lib/auth";

interface Props {
    auth: AuthContextInstance;
}

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        width: "100%"
    },
    grid: {
        marginTop: theme.spacing(6)
    },
    avatar: {
        backgroundColor: theme.palette.secondary.main
    },
    paper: {
        marginTop: theme.spacing(8),
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
    },
    card: {
        margin: theme.spacing(2)
    },
    buttonBase: {
        position: "relative",
        width: "100%",
        minHeight: "100px"
    }
}));

const collections = [
    { title: "Users", link: "/admin/users" },
    { title: "Members", link: "/admin/members" },
    { title: "Companies", link: "/admin/companies" },
    { title: "Events", link: "/admin/events" },
    { title: "Resources", link: "/admin/resources" },
    { title: "Carousels", link: "/admin/carousels" }
];

const Admin: NextPage<Props> = () => {
    const classes = useStyles();

    const dateString = new Date().toDateString();

    return (
        <AdminLayout title="Admin">
            <Container component="main" maxWidth="md">
                <div className={classes.paper}>
                    <Typography component="h1" variant="h3">
                        Admin Panel
                    </Typography>
                    <Grid item sm={12} xs={12} className={classes.grid}>
                        <Typography component="h2" variant="h5">
                            Collections
                        </Typography>
                        <Grid container className={classes.root}>
                            {collections.map(({ title, link }) => (
                                <Grid key={title} item sm={6} xs={12}>
                                    <Card className={classes.card}>
                                        <Link href={link} passHref>
                                            <CardActionArea
                                                className={classes.buttonBase}
                                                component="a"
                                            >
                                                <CardHeader
                                                    avatar={
                                                        <Avatar className={classes.avatar}>
                                                            <CollectionsBookmarkOutlined />
                                                        </Avatar>
                                                    }
                                                    title={title}
                                                    subheader={dateString}
                                                />
                                                <CardContent>
                                                    <Typography
                                                        component="p"
                                                        variant="body2"
                                                        color="textSecondary"
                                                    >
                                                        {`${title} Collection`}
                                                    </Typography>
                                                </CardContent>
                                            </CardActionArea>
                                        </Link>
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>
                    </Grid>
                </div>
            </Container>
        </AdminLayout>
    );
};

export default withAuth(Admin, {
    allowedAccess: (user: User | null) => !!user && hasPermission(user, "read")
});
