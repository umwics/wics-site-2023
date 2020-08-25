import { Container} from "@material-ui/core";
import { makeStyles, Theme } from "@material-ui/core/styles";
import { NextPage } from "next";
import React from "react";
import ContentsLayout from "../components/layouts/ContentsLayout";

const useStyles = makeStyles((theme: Theme) => ({
    paper: {
        marginTop: theme.spacing(8),
    }
}));


const About: NextPage = () => {
    const classes = useStyles();

    return (
        <ContentsLayout title="Mentors">
            <Container component="main">
                <div className={classes.paper}>
                    <h1> Mentors page - coming soon</h1>
                </div>
            </Container>
        </ContentsLayout>
    );
};

export default About;
