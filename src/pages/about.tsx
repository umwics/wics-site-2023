import { Container} from "@material-ui/core";
import { makeStyles, Theme } from "@material-ui/core/styles";
import { NextPage } from "next";
import React from "react";
import ContentsLayout from "../components/layouts/ContentsLayout";
import Carousel from "react-bootstrap/Carousel";
import BackToTop from "../components/BackToTop";
import Fade from "react-reveal/Fade";

const useStyles = makeStyles((theme: Theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        fontFamily: "Lato"
    }
}));


const About: NextPage = () => {
    const classes = useStyles();

    return (
        <ContentsLayout title="About">
            <Carousel>
                <Carousel.Item>
                    <div className="carouselcontainer">
                        <img className="d-block w-100 cropped" src="img/about/wics-0540.jpg" />
                    </div>
                </Carousel.Item>
                <Carousel.Item>
                    <div className="carouselcontainer">
                        <img className="d-block w-100 cropped" src="img/about/wics-0567.jpg" />
                    </div>
                </Carousel.Item>
                <Carousel.Item>
                    <div className="carouselcontainer">
                        <img className="d-block w-100 cropped" src="img/about/wics-0612.jpg" />
                    </div>
                </Carousel.Item>
            </Carousel>
            
            <div className="title-center">
            <Fade bottom duration={1000} delay={100} distance="30px">
                <h1>About Us</h1></Fade>
                <Fade bottom duration={1000} delay={300} distance="30px">
                <p>We are a group of University of Manitoba students who support women in technology.<br/>All are welcome to join!</p></Fade>
            </div>
                        
            <Container component="main">
                <div className={classes.paper}>

                <Fade bottom duration={1000} delay={300} distance="30px">
<div className="container">
    <p className="text-justify">
        <br />
        <br />
        WICS is here to build a stronger community between both women and men in STEM, as well as to
        encourage more women into the computer science field! As such, our group is inclusive to all
        students who wish to champion our goals.
        <br />
        <br />
        We are constantly working on projects outside of the classroom and have shown major interest
        in web and application development. In fact, this very website was created by our WICS
        website committee members using Next.js, React, TypeScript, Firebase, etc.
        <br />
        <br />
        We have also put a main focus on encouraging elementary and junior high students into the
        Computer Science field and have been using the website
        <i><a href="https://hourofcode.com/ca/learn" className="black-link" target="black"> Hour of Code </a></i>
        to help kids gain the skills to already start programming on their own! We have already
        visited multiple schools, such as Windsor Elementary School and Carman Collegiate. Other
        schools are welcome to contact us by email at
        <i><a href="mailto:uofmwics@gmail.com" className="black-link" target="black"> uofmwics@gmail.com</a></i>!
        <br />
        <br />
        And if you are a student here at University of Manitoba, please join our group to be a part
        of cool coding projects, outreach days, and fun extracurricular activities!
        <br />
        <br />
        <br />
        <br />
    </p>
</div></Fade>
                </div>
            </Container>
            <BackToTop />
        </ContentsLayout>
    );
};

export default About;
