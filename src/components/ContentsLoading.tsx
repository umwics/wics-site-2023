import { CircularProgress, Container } from "@material-ui/core";
import { makeStyles, Theme } from "@material-ui/core/styles";
import React from "react";
import ContentsLayout from "./layouts/ContentsLayout";

const useStyles = makeStyles((theme: Theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
    }
}));

const ContentsLoading: React.FC = () => {
    const classes = useStyles();

    return (
        <ContentsLayout title={"Loading..."}>
            <Container component="main" maxWidth="xs">
                <div className={classes.paper}>
                    <CircularProgress />
                </div>
            </Container>
        </ContentsLayout>
    );
};

export default ContentsLoading;
