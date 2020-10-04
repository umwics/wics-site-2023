import { Container, Typography } from "@material-ui/core";
import { fade, makeStyles, Theme } from "@material-ui/core/styles";
import { NextPage } from "next";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import Fade from "react-reveal/Fade";
import BackToTop from "../components/BackToTop";
import HomeCarousel from "../components/carousel/HomeCarousel";
import Linktree from "../components/home/linktree";
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
        "& h3": {
            marginBottom: 25,
            fontWeight: 1000,
            textTransform: "uppercase",
            position: "relative",
            fontFamily: "Lato",
            letterSpacing: 1
        },
        "& h5": {
            color: fade(theme.palette.text.secondary, 0.75),
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
                            <Typography variant="h3">Welcome to UM WICS!</Typography>
                            <div className={classes.centered}>
                                <div className={classes.outline}></div>
                            </div>
                        </Fade>
                        <Fade bottom duration={1000} delay={200} distance="30px">
                            <Typography variant="h5">Meet our team 2020-2021</Typography>
                        </Fade>
                    </div>

                    <div className={classes.sectionEmbed}>
                        <Fade bottom duration={1000} delay={300} distance="30px">
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
                    <div className={classes.sectionTitle}>
                        <Fade bottom duration={1000} delay={100} distance="30px">
                            <Typography variant="h3">Stay Connected #umwics</Typography>
                            <div className={classes.centered}>
                                <div className={classes.outline}></div>
                            </div>
                        </Fade>
                        <Fade bottom duration={1000} delay={200} distance="30px">
                            <Typography variant="h5">
                                Follow us on social media and checkout our upcoming events!
                            </Typography>
                        </Fade>
                    </div>
                    <div className={classes.sectionEmbed}>
                        <Fade bottom duration={1000} delay={300} distance="30px">
                            <Linktree />
                        </Fade>
                    </div>
                </div>
            </Container>
            <BackToTop />
        </ContentsLayout>
    );
};

export default Home;
