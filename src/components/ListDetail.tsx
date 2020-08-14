import { Container, makeStyles, Theme, Typography } from "@material-ui/core";
import React from "react";
import { User } from "../interfaces";

interface Props {
    item: User;
}

const useStyles = makeStyles((theme: Theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
    }
}));

const ListDetail: React.FC<Props> = ({ item: user }: Props) => {
    const classes = useStyles();

    return (
        <Container component="main" maxWidth="xs">
            <div className={classes.paper}>
                <Typography component="h1" variant="h5">
                    Detail for {user.username}
                </Typography>
                <p>ID: {user.id}</p>
            </div>
        </Container>
    );
};

export default ListDetail;
