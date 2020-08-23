import { Container, makeStyles, Theme, Typography } from "@material-ui/core";
import { NextPage } from "next";
import Link from "next/link";
import AdminLayout from "../components/layouts/AdminLayout";
import Carousel from "react-bootstrap/Carousel";
import Fade from "react-reveal/Fade";
import Typical from "react-typical";

const useStyles = makeStyles((theme: Theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
    }
}));

const Home: NextPage = () => {
    const classes = useStyles();

    return (
        <AdminLayout title="Home">
            <Container>
                <Fade bottom duration={1000} delay={500} distance="30px">
                    <h1 className="title">U of M Women in Computer Science</h1>
                </Fade>
                <div className="blink-block">
                    <p className="blink-text">
                        <Typical
                            steps={[
                                "We are women in computer science.",
                                1000,
                                "We are problem solvers.",
                                1000,
                                "We are developers.",
                                1000,
                                "We support equality in STEM.",
                                1000
                            ]}
                            loop={Infinity}
                            wrapper="p"
                        />
                    </p>
                </div>
            </Container>

            <Carousel>
                <Carousel.Item>
                    <img className="d-block w-100" src="img/main/execteam.jpg" alt="First slide" />
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src="img/main/mentormingle.jpg"
                        alt="Third slide"
                    />
                </Carousel.Item>
                <Carousel.Item>
                    <img className="d-block w-100" src="img/main/skip.jpg" alt="Third slide" />
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src="img/main/SkipTheDishes-95-01.jpeg"
                        alt="Third slide"
                    />
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src="img/main/mingle-summer.png"
                        alt="Third slide"
                    />
                </Carousel.Item>
            </Carousel>

            <Container>
                <Fade bottom duration={1000} delay={500} distance="30px">
                    <iframe
                        frameBorder="0"
                        width="100%"
                        height="500vh"
                        src="https://www.youtube.com/embed/646jjiejsuA"
                    ></iframe>
                </Fade>
            </Container>

            <Container component="main" maxWidth="xs">
                <div className={classes.paper}>
                    <Typography component="h1" variant="h5">
                        Hello Next.js 👋
                    </Typography>
                    <p>
                        <Link href="/about">
                            <a>About</a>
                        </Link>
                    </p>
                </div>
            </Container>
        </AdminLayout>
    );
};

export default Home;
