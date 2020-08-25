import { Button, Container } from "@material-ui/core";
import { NextPage } from "next";
import Carousel from "react-bootstrap/Carousel";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import Fade from "react-reveal/Fade";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import Typical from "react-typical";
import ContentsLayout from "../components/layouts/ContentsLayout";

const Home: NextPage = () => {
    return (
        <ContentsLayout title="Home">
            <Container>
                <Fade bottom duration={1000} delay={500} distance="30px">
                    <h1 className="maintitle">U of M Women in Computer Science</h1>
                </Fade>
                <span className="mainblink">
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
                </span>
            </Container>

            <Carousel>
                <Carousel.Item>
                    <div className="carouselcontainer">
                        <img className="d-block w-100 cropped" src="img/main/ubisoft-group.jpg" />
                        <div className="bottom-right">
                            <h2>MENTOR MINGLE</h2>
                            <h1>Ubisoft</h1>
                            <p>2019 WINTER</p>
                            <Button variant="contained" color="secondary" href="#contained-buttons">
                                See more
                            </Button>
                        </div>
                    </div>
                </Carousel.Item>
                <Carousel.Item>
                    <div className="carouselcontainer">
                        <img className="d-block w-100 cropped" src="img/main/amazon-talk.jpg" />
                        <div className="bottom-left">
                            <h2>Thinkbox Intro Event</h2>
                            <h1>AWS</h1>
                            <p>2020 WINTER</p>
                            <Button variant="contained" color="secondary" href="#contained-buttons">
                                See more
                            </Button>
                        </div>
                    </div>
                </Carousel.Item>
                <Carousel.Item>
                    <div className="carouselcontainer">
                        <img className="d-block w-100 cropped" src="img/main/amazon-group.jpg" />
                        <div className="bottom-right">
                            <h2>Thinkbox Intro Event</h2>
                            <h1>AWS</h1>
                            <p>2020 WINTER</p>
                            <Button variant="contained" color="secondary" href="#contained-buttons">
                                See more
                            </Button>
                        </div>
                    </div>
                </Carousel.Item>
                <Carousel.Item>
                    <div className="carouselcontainer">
                        <img className="d-block w-100 cropped" src="img/main/skip-clap.jpg" />
                        <div className="top-left">
                            <h2>MENTOR MINGLE</h2>
                            <h1>SkipTheDishes</h1>
                            <p>2020 WINTER</p>
                            <Button variant="contained" color="secondary" href="#contained-buttons">
                                See more
                            </Button>
                        </div>
                    </div>
                </Carousel.Item>
                <Carousel.Item>
                    <div className="carouselcontainer">
                        <img className="d-block w-100 cropped" src="img/main/skip-group.jpg" />
                        <div className="bottom-right">
                            <h2>MENTOR MINGLE</h2>
                            <h1>SkipTheDishes</h1>
                            <p>2020 WINTER</p>
                            <Button variant="contained" color="secondary" href="#contained-buttons">
                                See more
                            </Button>
                        </div>
                    </div>
                </Carousel.Item>
                <Carousel.Item>
                    <div className="carouselcontainer">
                        <img
                            className="d-block w-100 cropped"
                            src="img/main/skip-scholarship.jpg"
                        />
                        <div className="bottom-left">
                            <h2>Scholarship</h2>
                            <h1>SkipTheDishes</h1>
                            <p>Recipient Claire</p>
                            <Button variant="contained" color="secondary" href="#contained-buttons">
                                See more
                            </Button>
                        </div>
                    </div>
                </Carousel.Item>
                <Carousel.Item>
                    <div className="carouselcontainer">
                        <img className="d-block w-100 cropped" src="img/main/bold-presenter.jpg" />
                        <div className="top-right">
                            <h2>MENTOR MINGLE</h2>
                            <h1>Bold</h1>
                            <p>2019 SUMMER</p>
                            <Button variant="contained" color="secondary" href="#contained-buttons">
                                See more
                            </Button>
                        </div>
                    </div>
                </Carousel.Item>
                <Carousel.Item>
                    <div className="carouselcontainer">
                        <img
                            className="d-block w-100 cropped"
                            src="img/main/iqmetrix-reception.jpg"
                        />
                        <div className="bottom-right">
                            <h2>MENTOR MINGLE</h2>
                            <h1>iQmetrix</h1>
                            <p>2019 FALL</p>
                            <Button variant="contained" color="secondary" href="#contained-buttons">
                                See more
                            </Button>
                        </div>
                    </div>
                </Carousel.Item>
            </Carousel>

            <div id="mainsections" className="text-center">
                <div className="container">
                    <Fade bottom duration={1000} delay={500} distance="30px">
                        <div className="section-title">
                            <h2>Introduction</h2>
                            <p>A little info about our club.</p>
                        </div>
                    </Fade>
                    <div className="row">
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
            </div>

            <div id="mainsections" className="text-center">
                <div className="container">
                    <Fade bottom duration={1000} delay={500} distance="30px">
                        <div className="section-title">
                            <h2>Linktree</h2>
                            <p>Checkout our Linktree!</p>
                        </div>
                    </Fade>
                    <div className="row">
                        <Fade bottom duration={1000} delay={500} distance="30px">
                            <iframe
                                id="linktree-frame"
                                src="https://linktr.ee/umwics"
                                frameBorder="0"
                            ></iframe>
                        </Fade>
                    </div>
                </div>
            </div>
        </ContentsLayout>
    );
};

export default Home;
