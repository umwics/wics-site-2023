import { Container } from "@material-ui/core";
import { makeStyles, Theme } from "@material-ui/core/styles";
import { NextPage } from "next";
import React from "react";
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

const Mentors: NextPage = () => {
    const classes = useStyles();

    return (
        <ContentsLayout title="Mentors">
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
        </ContentsLayout>
    );
};

export default Mentors;
