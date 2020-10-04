import { faFacebook, faInstagram, faSlack } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Container, Link, Typography } from "@material-ui/core";
import { makeStyles, Theme } from "@material-ui/core/styles";
import { NextPage } from "next";
import React from "react";
import BackToTop from "../components/BackToTop";
import ContentsLayout from "../components/layouts/ContentsLayout";

const useStyles = makeStyles((theme: Theme) => ({
    paper: {
        marginTop: theme.spacing(8)
    },
    heroContent: {
        padding: theme.spacing(8, 0, 6),
        "& h2": {
            color: "#363b3f",
            textTransform: "uppercase",
            fontWeight: 700,
            fontFamily: "Lato"
        },
        "& h5": {
            fontFamily: "Lato"
        },
        "& h4": {
            color: "#ff6f6f",
            fontFamily: "Lato"
        }
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
        },
        "& h5": {
            color: "#363b3f",
            position: "relative",
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
    icons: {
        textAlign: "right",
        display: "inline",
        marginLeft: 10,
        fontSize: 24,
        textDecoration: "none",
        textDecorationLine: "none",
        cursor: "pointer",
        color: "#5f6368"
    }
}));

const Contact: NextPage = () => {
    const classes = useStyles();

    return (
        <ContentsLayout title="Contact">
            <Container component="main">
                <div className={classes.heroContent}>
                    <Container maxWidth="md">
                        <Typography
                            component="h2"
                            variant="h2"
                            align="center"
                            color="textPrimary"
                            gutterBottom
                        >
                            Get in Touch.
                        </Typography>
                        <Typography
                            component="h5"
                            variant="h6"
                            align="center"
                            color="textSecondary"
                            paragraph
                        >
                            Have a qeustion or just want to follow us on social media?
                            <br />
                            You can reach us by email or social media!
                        </Typography>

                        <div className={classes.paper}>
                            <div className={classes.sectionTitle}>
                                <Typography variant="h3">Email</Typography>
                                <div className={classes.centered}>
                                    <div className={classes.outline}></div>
                                </div>
                                <Typography variant="h5">
                                    <span aria-label="Email" className={classes.icons}>
                                        <FontAwesomeIcon icon={faEnvelope} />
                                    </span>
                                    <Link href="mailto:uofmwics@gmail.com">
                                        <span aria-label="Slack" className={classes.icons}>
                                            &nbsp;uofmwics@gmail.com
                                        </span>
                                    </Link>
                                </Typography>
                            </div>

                            <div className={classes.sectionTitle}>
                                <Typography variant="h3">Join us</Typography>
                                <div className={classes.centered}>
                                    <div className={classes.outline}></div>
                                </div>
                                <Typography variant="h5">
                                    <Link
                                        href="https://umwics.slack.com/"
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        <span aria-label="Slack" className={classes.icons}>
                                            <FontAwesomeIcon icon={faSlack} /> &nbsp;Slack
                                        </span>
                                    </Link>
                                </Typography>
                            </div>

                            <div className={classes.sectionTitle}>
                                <Typography variant="h3">Social Media</Typography>
                                <div className={classes.centered}>
                                    <div className={classes.outline}></div>
                                </div>
                                <Typography variant="h5">
                                    <Link
                                        href="https://www.facebook.com/umwics"
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        <span aria-label="Facebook" className={classes.icons}>
                                            <FontAwesomeIcon icon={faFacebook} />
                                            &nbsp;Facebook
                                        </span>
                                    </Link>
                                    <br />
                                    <Link
                                        href="https://instagram.com/umwics"
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        <span aria-label="Instagram" className={classes.icons}>
                                            <FontAwesomeIcon icon={faInstagram} />
                                            &nbsp; Instagram
                                        </span>
                                    </Link>
                                </Typography>
                            </div>

                            <div className={classes.sectionTitle}>
                                <Typography variant="h3">Event Links</Typography>
                                <div className={classes.centered}>
                                    <div className={classes.outline}></div>
                                </div>
                                <Typography variant="h5">
                                    <Link
                                        href="https://linktr.ee/umwics"
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        <span aria-label="Slack" className={classes.icons}>
                                            Linktree
                                        </span>
                                    </Link>
                                </Typography>
                            </div>

                            <div className={classes.sectionTitle}>
                                <Typography variant="h3">UM CS Discord</Typography>
                                <div className={classes.centered}>
                                    <div className={classes.outline}></div>
                                </div>
                                <Typography variant="h5">
                                    <Link
                                        href="https://docs.google.com/forms/d/e/1FAIpQLScGRauKBaXhVEFI9d1nqAh4ezSWhBMbMnXqaX4gqr0XPTyr6Q/viewform"
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        <span aria-label="Slack" className={classes.icons}>
                                            University of Manitoba Computer Science Discord Signup
                                        </span>
                                    </Link>
                                </Typography>
                            </div>
                        </div>
                    </Container>
                </div>
            </Container>
            <BackToTop />
        </ContentsLayout>
    );
};

export default Contact;
