import { Container } from "@material-ui/core";
import { makeStyles, Theme } from "@material-ui/core/styles";
import { NextPage } from "next";
import React from "react";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import Fade from "react-reveal/Fade";

import BackToTop from "../components/BackToTop";
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
    },
    about_text: {
        fontSize: 25,
        display: "flex",
        width: "70",
        textAlign: "center",
        alignItems: "right",
        justifyContent: "flex-end",
        flexDirection: "column"
    },
    about_picture: {
        [theme.breakpoints.down("sm")]: {
            width: "100%"
        },
        width: "70%"
    }
}));

const About: NextPage = () => {
    const classes = useStyles();

    const item = {
        name: "image",
        src: "img/about/about_image.png"
    };

    return (
        <ContentsLayout title="About">
            <div className={classes.title}></div>
            <Container component="main">
                <div className={classes.paper}>
                    <div className={classes.about_text}>
                        <div>
                            <img className={classes.about_picture} src={item.src} alt={item.name} />
                        </div>
                        <p>
                            UMWICS fosters community for gender minority CS students, & advocates
                            for the advancement of equity, diversity & inclusion.
                        </p>
                        <br />
                        <p>
                            In CS WICS a student group dedicated to creating an inclusive and
                            supportive environment for women and gender minorities in computer
                            science, through networking, workshops, collaborations with industry
                            partners, and promoting CS in the community.
                        </p>
                    </div>
                </div>
            </Container>
            <BackToTop />
        </ContentsLayout>
    );
};

export default About;
