import { Button, Container, Typography } from "@material-ui/core";
import { makeStyles, Theme } from "@material-ui/core/styles";
import { NextPage } from "next";
import React from "react";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import Fade from "react-reveal/Fade";
import BackToTop from "../components/BackToTop";
import OutreachCarousel from "../components/carousel/OutreachCarousel";
import ContentsLayout from "../components/layouts/ContentsLayout";

const useStyles = makeStyles((theme: Theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        marginBottom: theme.spacing(12),
        textAlign: "center"
    },
    title: {
        top: "40%",
        marginBottom: 50,
        fontFamily: "Lato",
        position: "absolute",
        textAlign: "center",
        color: "white",
        justifyContent: "center",
        textTransform: "uppercase",
        fontWeight: 700,
        width: "100%",
        "& h1": {
            marginTop: 0,
            marginBottom: 6,
            fontWeight: 700,
            fontFamily: "Lato"
        }
    }
}));

const About: NextPage = () => {
    const classes = useStyles();

    return (
        <ContentsLayout title="Outreach">
            <OutreachCarousel />
            <div className={classes.title}>
                <Fade bottom duration={1000} delay={100} distance="30px">
                    <Typography variant="h1">Outreach</Typography>
                </Fade>
                <Fade bottom duration={1000} delay={300} distance="30px">
                    <p>
                        We have put a main focus on encouraging elementary and junior high students
                        into the Computer Science field
                        <br />
                        and have been using the website Hour of Code to help kids gain the skills to
                        already start programming on their own!
                        <br />
                        We have already visited multiple schools, such as Windsor Elementary School
                        and Carman Collegiate. <br />
                        Other schools are welcome to contact us by email at uofmwics@gmail.com!
                    </p>
                </Fade>
                <Fade bottom duration={1000} delay={400} distance="30px">
                    <Button href="mailto:uofmwics@gmail.com" variant="contained" color="secondary">
                        Contact us
                    </Button>
                </Fade>
            </div>

            <Container component="main">
                <div className={classes.paper}>
                    <h3> More information about our outreach program is coming soon!</h3>
                </div>
            </Container>
            <BackToTop />
        </ContentsLayout>
    );
};

export default About;
