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
    },
    outline: {
        textAlign: "center",
        backgroundColor: "#00bfa5",
        borderRadius: 2,
        height: 4,
        width: 40,
        marginBottom: 25
    },
    centered: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
    sectionTitle: {
        paddingTop: 100,
        textAlign: "center",
        marginBottom: 70,
        fontFamily: "Lato",
        "& h3": {
            color: "#202124",
            marginBottom: 25,
            fontWeight: 1000,
            textTransform: "uppercase",
            position: "relative",
            fontFamily: "Lato",
            letterSpacing: 1
        }
    },
    description: {
        minWidth: 50,
        marginLeft: 300,
        marginRight: 300,
        marginBottom: 20
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
                        One of the main goals of WICS is to promote the field of computer science
                        within our community.
                    </p>
                </Fade>
            </div>

            <Container component="main">
                <div className={classes.paper}>
                    <div className={classes.sectionTitle}>
                        <Typography variant="h3">For Schools</Typography>
                        <div className={classes.centered}>
                            <div className={classes.outline}></div>
                        </div>

                        <Typography align="center" color="textPrimary" gutterBottom paragraph>
                            <div className={classes.description}>
                                We have put a main focus on encouraging younger generations into the
                                computer science field. With the field of computer science growing
                                exponentially, it is increasingly important that the basic skills
                                for this field are introduced at an earlier age. As a result, WICS
                                regularly reaches out to elementary and high schools to run
                                workshops or talks as well as host public events in the community as
                                volunteer work.
                                <br />
                                <br />
                                We are constantly on a look out for opportunities to show our
                                passion for technology and inspire students. Please do not hesitate
                                the outreach coordinator to request a visit!
                            </div>
                        </Typography>

                        <Button
                            variant="contained"
                            color="primary"
                            href="mailto:manlulum@myumanitoba.ca"
                        >
                            Request a Visit
                        </Button>
                    </div>

                    <div className={classes.sectionTitle}>
                        <Typography variant="h3">For Volunteers</Typography>
                        <div className={classes.centered}>
                            <div className={classes.outline}></div>
                        </div>

                        <Typography align="center" color="textPrimary" gutterBottom paragraph>
                            <div className={classes.description}>
                                Are you a CS student looking for ways to get involved in the
                                community? Are you someone who is willing to share knowledge and
                                show passion in Computer Science to the younger generations? If you
                                would like to be contacted about volunteering for WICS Outreach
                                event in the future, please signup below.
                            </div>
                        </Typography>

                        <Button
                            variant="contained"
                            color="primary"
                            href="https://forms.gle/qyVVTL4Tnz9tfcsQA"
                        >
                            Sign up for Volunteer
                        </Button>
                    </div>
                </div>
            </Container>

            <BackToTop />
        </ContentsLayout>
    );
};

export default About;
