import { Container, Typography } from "@material-ui/core";
import { makeStyles, Theme } from "@material-ui/core/styles";
import { NextPage } from "next";
import Link from "next/link";
import React from "react";
import ContentsLayout from "../components/layouts/ContentsLayout";

const useStyles = makeStyles((theme: Theme) => ({
    container: {
        margin: "auto"
    },
    paper: {
        marginTop: theme.spacing(8),
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
    }
}));

const About: NextPage = () => {
    const classes = useStyles();

    return (
        <ContentsLayout title="404">
            <Container className={classes.container} component="main" maxWidth="md">
                <div className={classes.paper}>
                    <Typography component="h1" variant="h4">
                        404
                    </Typography>
                    <Typography component="p" variant="subtitle2">
                        There&apos;s nothing here... Head back{" "}
                        <Link href="/">
                            <a>home</a>
                        </Link>
                        ?
                    </Typography>
                </div>
            </Container>
        </ContentsLayout>
    );
};

export default About;
