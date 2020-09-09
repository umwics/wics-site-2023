import { Container, Typography } from "@material-ui/core";
import { makeStyles, Theme } from "@material-ui/core/styles";
import { NextPage } from "next";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import Fade from "react-reveal/Fade";
import BackToTop from "../components/BackToTop";
import HomeCarousel from "../components/carousel/HomeCarousel";
import ContentsLayout from "../components/layouts/ContentsLayout";

const useStyles = makeStyles((theme: Theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        marginBottom: theme.spacing(8),
        fontFamily: "Lato"
    },
    sectionTitle: {
        paddingTop: 100,
        textAlign: "center",
        marginBottom: 70,
        fontFamily: "Lato",
        "& h2": {
            color: "#ff6f6f",
            marginBottom: 30,
            fontWeight: 700,
            textTransform: "uppercase",
            position: "relative",
            fontFamily: "Lato"
        },
        "& h5": {
            color: "#363b3f",
            position: "relative",
            fontFamily: "Lato"
        }
    },
    sectionEmbed: {
        textAlign: "center"
    },
    blink: {
        paddingTop: 30,
        letterSpacing: 3,
        fontSize: 25,
        textAlign: "center",
        fontFamily: "monospace",
        marginBottom: 10,
        "& p": {
            fontSize: 20
        }
    }
}));

const Home: NextPage = () => {
    const classes = useStyles();

    return (
        <ContentsLayout title="Home">
            <HomeCarousel />

            <Container component="main">
                <div className={classes.paper}>
                    <div className={classes.sectionTitle}>
                        <Fade bottom duration={1000} delay={100} distance="30px">
                            <Typography variant="h2">Welcome to UM WICS!</Typography>
                        </Fade>
                        <Fade bottom duration={1000} delay={500} distance="30px">
                            <Typography variant="h5">Meet our team 2020-2021</Typography>
                        </Fade>
                    </div>

                    <div className={classes.sectionEmbed}>
                        <Fade bottom duration={1000} delay={500} distance="30px">
                            <iframe
                                frameBorder="0"
                                width="100%"
                                height="500vh"
                                src="https://www.youtube.com/embed/646jjiejsuA"
                            ></iframe>
                        </Fade>
                    </div>
                </div>

                <div className={classes.paper}>
                    <Fade bottom duration={1000} delay={500} distance="30px">
                        <div className={classes.sectionTitle}>
                            <Fade bottom duration={1000} delay={100} distance="30px">
                                <Typography variant="h2">Stay Connected #umwics</Typography>
                            </Fade>
                            <Fade bottom duration={1000} delay={500} distance="30px">
                                <Typography variant="h5">
                                    Follow us on social media and checkout our upcoming events!
                                </Typography>
                            </Fade>
                        </div>
                    </Fade>
                    <div className={classes.sectionEmbed}>
                        <Fade bottom duration={1000} delay={500} distance="30px">
                            <iframe
                                id="linktree-frame"
                                src="https://linktr.ee/umwics"
                                frameBorder="0"
                                width="100%"
                                height="1200"
                            ></iframe>
                        </Fade>
                    </div>
                </div>
            </Container>
            <BackToTop />
        </ContentsLayout>
    );
};

export default Home;
