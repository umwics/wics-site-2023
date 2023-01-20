import { Button, Container, Typography, Grid } from "@material-ui/core";
import { makeStyles, Theme } from "@material-ui/core/styles";
import { NextPage } from "next";
import React from "react";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import Fade from "react-reveal/Fade";
import BackToTop from "../components/BackToTop";
import OutreachCarousel from "../components/carousel/OutreachCarousel";
import OutreachRecycler from "../components/OutreachRecycler";
import ContentsLayout from "../components/layouts/ContentsLayout";
import { outreachPosition, outreachPositionLabels, outreachPositions } from "../interfaces";
const useStyles = makeStyles((theme: Theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        marginBottom: theme.spacing(12),
        textAlign: "center"
    },
    heroButtons: {
        marginTop: theme.spacing(4)
    },
    heroButton:{
        margin: "10%",
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
        backgroundColor: "#00BFA5",
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
                <Fade bottom duration={1000} delay={400} distance="30px">
                    <div className={classes.heroButtons}>
                        <Grid container spacing={1} justify="center">
                            {outreachPositions.map(type => (
                                <Grid key={type} item>
                                    <Button variant="contained" color="secondary" href={`#${type}`}>
                                        {outreachPositionLabels[type]}
                                    </Button>
                                </Grid>
                            ))}
                        </Grid>
                    </div>
                </Fade>
            </div>
            
            <Container component="main" maxWidth="md">
                <div className={classes.paper}>
                    <div className={classes.sectionTitle}>
                        <Typography variant="h3">Volunteer Opportunities</Typography>
                        <div className={classes.centered}>
                            <div className={classes.outline}></div>
                        </div>
                    </div>
                    <OutreachRecycler />
                    <div className={classes.sectionTitle} id="forSchools">
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
                                reaches out to elementary and high schools students to host
                                workshops, talks or public events in the community as volunteer
                                work.
                                <br />
                                <br />
                                We are constantly on a look out for opportunities to show our
                                passion for technology and inspire students. Please do not hesitate
                                to contact the outreach coordinator to request a visit (virtually)!
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
                    <div className={classes.sectionTitle} id="forVolunteers">
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
                                event in the future, please sign up below.
                            </div>
                        </Typography>
                        <Button
                            variant="contained"
                            color="primary"
                            href="https://forms.gle/k5VNymJvuTNHCHvf7"
                        >
                            Sign up for Volunteer
                        </Button>
                    </div>

                    <div className={classes.sectionTitle} id="Volunteer Exit Form">
                        <Typography variant="h3">Volunteer Exit Form</Typography>
                        <div className={classes.centered}>
                            <div className={classes.outline}></div>
                        </div>
                        <Typography align="center" color="textPrimary" gutterBottom paragraph>
                            <div className={classes.description}>
                                If you would like to be taken out of the volunteer list for WICS, please fill out the form below!
                                Thank you!
                            </div>
                        </Typography>
                        <Button
                            variant="contained"
                            color="primary"
                            href="https://forms.gle/xMn5TNF2pK7rfeq7A"
                        >
                            Volunteer Exit Form
                        </Button>
                    </div>
                </div>
            </Container>
            <BackToTop />
        </ContentsLayout>
    );
};
export default About;
