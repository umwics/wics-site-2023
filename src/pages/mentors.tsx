import { Button, Container, Typography } from "@material-ui/core";
import { makeStyles, Theme } from "@material-ui/core/styles";
import { NextPage } from "next";
import React from "react";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import Fade from "react-reveal/Fade";
import BackToTop from "../components/BackToTop";
import MentorsCarousel from "../components/carousel/MentorsCarousel";
import ContentsLayout from "../components/layouts/ContentsLayout";

const useStyles = makeStyles((theme: Theme) => ({
    paper: {
        marginBottom: theme.spacing(8),
        fontFamily: "Lato"
    },
    title: {
        fontFamily: "Lato",
        "& h1": {
            fontWeight: "bold",
            fontSize: 40,
            marginBottom: 10,
            textAlign: "center"
        },
        "& img": {
            width: "40%",
            height: "40%",
            objectFit: "cover",
            float: "left",
            marginTop: 25,
            marginRight: 20
        },
        "& p": {
            fontSize: 20,
            textAlign: "left",
            marginTop: 0,
            marginLeft: 10
        }
    },
    signupSection: {
        fontFamily: "Lato",
        "& h2": {
            fontWeight: "bold",
            marginLeft: 10,
            marginBottom: 5
        },
        "& p": {
            fontSize: 18,
            textAlign: "left",
            marginTop: 0,
            marginLeft: 10
        }
    }
}));

const useCarouselStyles = makeStyles((theme: Theme) => ({
    paperCarousel: {
        marginTop: theme.spacing(8),
        marginBottom: theme.spacing(12),
        textAlign: "center"
    },
    titleCarousel: {
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

const Mentors: NextPage = () => {
    const classes = useStyles();
    const classesCalendar = useCarouselStyles();
    return (
        <ContentsLayout title="Mentors">
            <MentorsCarousel />
            <div className={classesCalendar.titleCarousel}>
                <Fade bottom duration={1000} delay={100} distance="30px">
                    <Typography variant="h1">UMWICS Mentorship Program</Typography>
                </Fade>
                <Fade bottom duration={1000} delay={300} distance="30px">
                    <p>Join our new WICS Mentorship program!</p>
                </Fade>
                <Fade bottom duration={1000} delay={400} distance="30px">
                    <Button href="mailto:uofmwics@gmail.com" variant="contained" color="secondary">
                        Contact us
                    </Button>
                </Fade>
            </div>

            <Container component="main">
                <div className={classes.paper}>
                    <div className={classes.title}>
                        <h1> UMWICS Mentorship Program </h1>
                        <img src="img/mentors-page/mentors.jpg" />
                        <p>
                            <br />
                            The UMWICS Mentorship Program offers newly admitted undergraduate UofM
                            students a great opportunity to have a successful start in their journey
                            into the Computer Science program. Mentors offer guidance into the
                            Computer Science program, provide tips and advice to succeed in the
                            program, and much more.
                        </p>
                    </div>

                    <div className={classes.signupSection}>
                        <h2> Mentors </h2>
                        <p>
                            {" "}
                            Share your experience for their successful start!
                            <br /> (Sign up coming soon...)
                        </p>
                        {/* To be updated when mentorship program starts*/}
                        {/* <Button variant="outlined" color="primary" href="#contained-buttons">
                                    Sign Up
                            </Button> */}
                        <h2> Mentees </h2>
                        <p>
                            {" "}
                            Get connected and learn from experienced students!
                            <br /> (Sign up coming soon...)
                        </p>
                        {/* To be updated when mentorship program starts*/}
                        {/* <Button variant="outlined" color="primary" href="#contained-buttons">
                                    Sign Up
                            </Button> */}
                    </div>
                </div>
            </Container>
            <BackToTop />
        </ContentsLayout>
    );
};

export default Mentors;
