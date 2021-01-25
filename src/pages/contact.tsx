import { faFacebook, faInstagram, faSlack, faDiscord } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope, faLink } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Container, Link, Typography } from "@material-ui/core";
import { makeStyles, Theme } from "@material-ui/core/styles";
import { NextPage } from "next";
import React from "react";
import BackToTop from "../components/BackToTop";
import ContentsLayout from "../components/layouts/ContentsLayout";

const useStyles = makeStyles((theme: Theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center"
    },
    heroContent: {
        padding: theme.spacing(8, 0, 6),
        "& h2": {
            textTransform: "uppercase",
            fontWeight: 700,
            fontFamily: "Lato"
        },
        "& h5": {
            fontFamily: "Lato"
        },
        "& h4": {
            //color: "#ff6f6f",
            fontFamily: "Lato"
        }
    },
    section:{
        color: "#202020",
        textDecoration: "none",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        cursor: "pointer",
        margin: "1% 4% 3% 4%",
        "&:hover":{
            color: "#3f51b5",
            transition: "0.3s",
            textDecoration: "none",
            textDecorationLine: "none",
        }
    },
    sectionIcon:{
        fontSize:60,
        "&:hover": {
            transform: "translateY(-10%)",
            transition: "0.5s"
        }
    },
    sectionTitle: {
        color: "#202020",
        paddingTop: 20,
        textAlign: "center",
        marginBottom: 20,
        fontFamily: "Lato",
        "& h3": {
            marginBottom: 25,
            fontWeight: 1000,
            textTransform: "uppercase",
            position: "relative",
            fontFamily: "Lato",
            letterSpacing: 1
        },
        "& h5": {
            //color: "#363b3f",
            position: "relative",
            fontFamily: "Lato"
        }
    }
    // outline: {
    //     textAlign: "center",
    //     backgroundColor: "#00bfa5",
    //     borderRadius: 2,
    //     height: 4,
    //     width: 40,
    //     marginBottom: 25,
    // },
    // centered: {
    //     display: "flex",
    //     justifyContent: "center",
    //     alignItems: "center"
    // },
    // icons: {
    //     textAlign: "right",
    //     display: "inline",
    //     marginLeft: 10,
    //     fontSize: 24,
    //     textDecoration: "none",
    //     textDecorationLine: "none",
    //     cursor: "pointer"
    //     //color: "#5f6368"
    // }
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
                            Have a question or just want to follow us on social media?
                            <br />
                            You can reach us by email or social media!
                        </Typography>

                        <div className={classes.paper}>
                            <Link href="mailto:uofmwics@gmail.com" className={classes.section}>
                                <span className={classes.sectionIcon} aria-label="WICSEmail">
                                    <FontAwesomeIcon icon={faEnvelope} />
                                </span>
                                <div className={classes.sectionTitle}>
                                    <Typography variant="h3">WICS Email</Typography>
                                </div>
                            </Link>

                            <Link href="mailto:uofmwics@gmail.com" target="_blank" rel="noreferrer" className={classes.section}>
                                <span className={classes.sectionIcon} aria-label="Slack">
                                    <FontAwesomeIcon icon={faSlack} />
                                </span>
                                <div className={classes.sectionTitle}>
                                    <Typography variant="h3">Slack</Typography>
                                </div>
                            </Link>

                            <Link href="https://instagram.com/umwics" target="_blank" rel="noreferrer" className={classes.section}>
                                <span className={classes.sectionIcon} aria-label="Instagram">
                                    <FontAwesomeIcon icon={faInstagram} />
                                </span>
                                <div className={classes.sectionTitle}>
                                    <Typography variant="h3">Instagram</Typography>
                                </div>
                            </Link>

                            <Link href="https://www.facebook.com/umwics" target="_blank" rel="noreferrer" className={classes.section}>
                                <span className={classes.sectionIcon} aria-label="Facebook">
                                    <FontAwesomeIcon icon={faFacebook} />
                                </span>
                                <div className={classes.sectionTitle}>
                                    <Typography variant="h3">Facebook</Typography>
                                </div>
                            </Link>

                            <Link href="https://linktr.ee/umwics" target="_blank" rel="noreferrer" className={classes.section}>
                                <span className={classes.sectionIcon} aria-label="Linktree">
                                    <FontAwesomeIcon icon={faLink} />
                                </span>
                                <div className={classes.sectionTitle}>
                                    <Typography variant="h3">Linktree</Typography>
                                </div>
                            </Link>

                            <Link href="https://docs.google.com/forms/d/e/1FAIpQLScGRauKBaXhVEFI9d1nqAh4ezSWhBMbMnXqaX4gqr0XPTyr6Q/viewform" target="_blank" rel="noreferrer" className={classes.section}>
                                <span className={classes.sectionIcon} aria-label="Discord">
                                    <FontAwesomeIcon icon={faDiscord} />
                                </span>
                                <div className={classes.sectionTitle}>
                                    <Typography variant="h3">CS Discord</Typography>
                                </div>
                            </Link>

                            <Link href="mailto:manitobacssa@gmail.com" className={classes.section}>
                                <span className={classes.sectionIcon} aria-label="CSSAEmail">
                                    <FontAwesomeIcon icon={faEnvelope} />
                                </span>
                                <div className={classes.sectionTitle}>
                                    <Typography variant="h3">CSSA Email</Typography>
                                </div>
                            </Link>

                        </div>
                    </Container>
                </div>
            </Container>
            <BackToTop />
        </ContentsLayout>
    );
};

export default Contact;
