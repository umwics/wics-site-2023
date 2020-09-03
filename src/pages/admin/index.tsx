import {
    Avatar,
    Container,
    Grid,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
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
    }
}));

const Admin: NextPage<Props> = () => {
    const classes = useStyles();

    return (
        <AdminLayout title="Admin">
            <Container component="main" maxWidth="md">
                <div className={classes.paper}>
                    <Typography component="h1" variant="h5">
                        Admin Panel
                    </Typography>
                    <Grid item sm={12} xs={12} className={classes.grid}>
                        <Typography component="h1" variant="h6">
                            Collections
                        </Typography>
                        <List className={classes.root}>
                            {["users", "members", "companies", "events"].map(value => {
                                const labelId = `checkbox-list-label-${value}`;

                                return (
                                    <Link key={value} href={`/admin/${value}`} passHref>
                                        <ListItem button component="a">
                                            <ListItemIcon>
                                                <Avatar className={classes.avatar}>
                                                    <CollectionsBookmarkOutlined />
                                                </Avatar>
                                            </ListItemIcon>
                                            <ListItemText
                                                id={labelId}
                                                primary={`${value} Collection`}
                                            />
                                        </ListItem>
                                    </Link>
                                );
                            })}
                        </List>
                    </Grid>
                </div>
            </Container>
        </AdminLayout>
    );
};

export default withAuth(Admin, {
    allowedAccess: (user: User | null) => !!user && hasPermission(user, "read")
});
