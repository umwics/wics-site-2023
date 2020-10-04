import { Button, Container, Grid, Typography } from "@material-ui/core";
import { makeStyles, Theme } from "@material-ui/core/styles";
import { NextPage } from "next";
import React from "react";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import Fade from "react-reveal/Fade";
import BackToTop from "../components/BackToTop";
import AboutCarousel from "../components/carousel/AboutCarousel";
import ContentsLayout from "../components/layouts/ContentsLayout";

const useStyles = makeStyles((theme: Theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        fontFamily: "Lato"
    },
    center: {
        textAlign: "center",
        "& h1": {
            color: "#ff6f6f",
            fontSize: 40,
            marginBottom: 30,
            fontWeight: 700,
            textTransform: "uppercase",
            position: "relative"
        }
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
        <ContentsLayout title="About">
            <AboutCarousel />
            <div className={classes.title}>
                <Fade bottom duration={1000} delay={100} distance="30px">
                    <Typography variant="h1">About Us</Typography>
                </Fade>
                <Fade bottom duration={1000} delay={300} distance="30px">
                    <p>
                        We are a group of University of Manitoba students who support women in
                        technology.
                        <br />
                        All are welcome to join!
                    </p>
                </Fade>
            </div>
            <Container component="main">
                <div className={classes.paper}>
                    <Fade bottom duration={1000} delay={0} distance="30px">
                        <div className="container">
                            <p className="text-justify">
                                <br />
                                <br />
                                WICS is here to build a stronger community between both women and
                                men in STEM, as well as to encourage more women into the computer
                                science field! As such, our group is inclusive to all students who
                                wish to champion our goals.
                                <br />
                                <br />
                                We are constantly working on projects outside of the classroom and
                                have shown major interest in web and application development. In
                                fact, this very website was created by our WICS website committee
                                members using Next.js, React, TypeScript, Firebase, etc.
                                <br />
                                <br />
                                We have also put a main focus on encouraging elementary and junior
                                high students into the Computer Science field and have been using
                                the website
                                <i>
                                    <a
                                        href="https://hourofcode.com/ca/learn"
                                        className="black-link"
                                        target="black"
                                    >
                                        {" "}
                                        Hour of Code{" "}
                                    </a>
                                </i>
                                to help kids gain the skills to already start programming on their
                                own! We have already visited multiple schools, such as Windsor
                                Elementary School and Carman Collegiate. Other schools are welcome
                                to contact us by email at
                                <i>
                                    <a
                                        href="mailto:uofmwics@gmail.com"
                                        className="black-link"
                                        target="black"
                                    >
                                        {" "}
                                        uofmwics@gmail.com
                                    </a>
                                </i>
                                !
                                <br />
                                <br />
                                And if you are a student here at University of Manitoba, please join
                                our group to be a part of cool coding projects, outreach days, and
                                fun extracurricular activities!
                                <br />
                                <br />
                                <br />
                                <br />
                            </p>
                        </div>
                    </Fade>

                    <Fade bottom duration={1000} delay={100} distance="30px">
                        <div className={classes.center}>
                            <h1>Join Us</h1>
                            <br />
                            <Button
                                variant="contained"
                                color="primary"
                                href="https://wicsuofm.slack.com"
                                target="_blank"
                            >
                                Join Our Slack Here
                            </Button>
                            <br />
                            <br />
                            <p>
                                This is where we discuss upcoming events, current news, and it is a
                                chance to connect with other members!
                            </p>
                            <br />
                            <Grid container spacing={0}>
                                <Grid item sm={12} xs={12}>
                                    <iframe
                                        id="googleForm"
                                        src="https://docs.google.com/forms/d/e/1FAIpQLSfBp6u_AGJv0PyPSP8_-foI3IdyuEv52DnNa1Evm9Ap6YnNfQ/viewform?embedded=true"
                                        width="100%"
                                        height="2000"
                                        frameBorder="0"
                                        scrolling="yes"
                                    >
                                        Loading...
                                    </iframe>
                                </Grid>
                            </Grid>
                        </div>
                    </Fade>
                </div>
            </Container>
            <BackToTop />
        </ContentsLayout>
    );
};

export default About;
