import { CircularProgress, Container } from "@material-ui/core";
import { makeStyles, Theme } from "@material-ui/core/styles";
import React from "react";
import AdminLayout from "./layouts/AdminLayout";

const useStyles = makeStyles((theme: Theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
    }
}));

const AdminLoading: React.FC = () => {
    const classes = useStyles();

    return (
        <AdminLayout title={"Loading..."}>
            <Container component="main" maxWidth="xs">
                <div className={classes.paper}>
                    <CircularProgress />
                </div>
            </Container>
        </AdminLayout>
    );
};

export default AdminLoading;
