import { Container} from "@material-ui/core";
import { makeStyles, Theme } from "@material-ui/core/styles";
import { NextPage } from "next";
import React from "react";
import ContentsLayout from "../components/layouts/ContentsLayout";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import Fade from "react-reveal/Fade";

const useStyles = makeStyles((theme: Theme) => ({
    paper: {
        marginTop: theme.spacing(8),
    },
    title: {
        marginTop: theme.spacing(8),
        marginBottom: theme.spacing(8),
        fontSize: 50,
        color: '#ff6f6f',
        textAlign: "center",
        fontWeight: 700,
        textTransform: "uppercase",
        fontFamily: 'Lato'
    }
}));


const About: NextPage = () => {
    const classes = useStyles();

    return (
        <ContentsLayout title="Resources">
            <Container component="main">
                <div className={classes.title}><Fade bottom duration={1000} delay={100} distance="30px">Resources</Fade></div>


            </Container>
        </ContentsLayout>
    );
};

export default About;
