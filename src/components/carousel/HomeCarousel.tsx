import { Button, Typography } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Link from "next/link";
import React from "react";
import Carousel from "react-material-ui-carousel";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import Fade from "react-reveal/Fade";

const useStyles = makeStyles((_theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1
        },
        slideshow: {
            textAlign: "center",
            color: "white",
            backgroundColor: "black",
            display: "block",
            width: "100%",
            height: "660px",
            position: "relative",
            overflow: "hidden",
            "& img": {
                width: "100%",
                height: "660px",
                objectFit: "cover"
            }
        },
        boxFilter: {
            backgroundColor: "rgba(0,0,0,0.4)",
            position: "absolute",
            top: 0,
            width: "100%",
            height: "660px"
        },
        title: {
            fontFamily: "Lato",
            position: "absolute",
            top: 180,
            textAlign: "center",
            color: "white",
            justifyContent: "center",
            width: "100%",
            "& h1": {
                marginTop: 0,
                marginBottom: 6,
                textTransform: "uppercase",
                color: "#fff",
                fontWeight: 700,
                fontFamily: "Lato"
            },
            "& h2": {
                marginTop: 0,
                marginBottom: 0,
                color: "#fff",
                fontWeight: 400,
                letterSpaceing: 2,
                fontFamily: "Lato"
            },
            "& p": {
                fontWeight: 400,
                fontSize: 18,
                letterSpaceing: 1,
                fontFamily: "Lato"
            }
        }
    })
);

const items = [
    {
        name: "1",
        h1: "Exec",
        h2: "2020-2021",
        p: "We are a group of University of Manitoba students who support women in technology.",
        src: "img/main/exec-photos-8.png",
        linkname: "Meet our Exec!",
        link: "/members#exec"
    },
    {
        name: "1",
        h1: "Virtual WICS Mingle",
        h2: "Events",
        p: "2020 Summer",
        src: "img/main/wics-mingle.png",
        linkname: "See more",
        link: "/events#otherEvent"
    },
    {
        name: "1",
        h1: "Women in Computer Science",
        h2: "University of Manitoba",
        p: "We are a group of University of Manitoba students who support women in technology.",
        src: "img/main/ubisoft-group.jpg",
        linkname: "About us",
        link: "/about"
    },
    {
        name: "2",
        h1: "AWS",
        h2: "Thinkbox Intro Event",
        p: "2020 WINTER",
        src: "img/main/amazon-talk.jpg",
        linkname: "See more",
        link: "/events/Pt64iizn3heSvZMWrZME"
    },
    {
        name: "3",
        h1: "SkipTheDishes",
        h2: "MENTOR MINGLE",
        p: "2020 WINTER",
        src: "img/main/skip-clap.jpg",
        linkname: "See more",
        link: "/events/UkRjhWKAFJpYh8A2m0hB"
    },
    {
        name: "4",
        h1: "SkipTheDishes",
        h2: "MENTOR MINGLE",
        p: "2020 WINTER",
        src: "img/main/skip-group.jpg",
        linkname: "See more",
        link: "/events/UkRjhWKAFJpYh8A2m0hB"
    },
    {
        name: "5",
        h1: "SkipTheDishes",
        h2: "Scholarship",
        p: "Recipient Claire",
        src: "img/main/skip-scholarship.jpg",
        linkname: "See more",
        link: "/events/UkRjhWKAFJpYh8A2m0hB"
    },
    {
        name: "6",
        h1: "Bold",
        h2: "MENTOR MINGLE",
        p: "2019 SUMMER",
        src: "img/main/bold-presenter.jpg",
        linkname: "See more",
        link: "/events/HoYELJw2D6jk6NHtqpzF"
    },
    {
        name: "7",
        h1: "iQmetrix",
        h2: "MENTOR MINGLE",
        p: "2019 FALL",
        src: "img/main/iqmetrix-reception.jpg",
        linkname: "See more",
        link: "/events/toVPDFFswghAI9DyJcv0"
    }
];

const CarouselSetting = {
    interval: 10000,
    indicators: true,
    timeout: 800
};

const HomeCarousel: React.FC = () => {
    const classes = useStyles();

    return (
        <Carousel {...CarouselSetting}>
            {items.map(item => {
                return (
                    <div key={item.name} className={classes.slideshow}>
                        <img src={item.src} alt={item.name} />
                        <div className={classes.boxFilter}></div>
                        <div className={classes.title}>
                            <Fade bottom duration={1000} delay={100} distance="30px">
                                <Typography variant="h4">{item.h2}</Typography>
                            </Fade>
                            <Fade bottom duration={1000} delay={300} distance="30px">
                                <Typography variant="h1">{item.h1}</Typography>
                            </Fade>
                            <Fade bottom duration={1000} delay={400} distance="30px">
                                <p>{item.p}</p>
                            </Fade>

                            <p>
                                <Fade bottom duration={1000} delay={500} distance="30px">
                                    <Link href={item.link} passHref>
                                        <Button component="a" variant="contained" color="secondary">
                                            {item.linkname}
                                        </Button>
                                    </Link>
                                </Fade>
                            </p>
                        </div>
                    </div>
                );
            })}
        </Carousel>
    );
};

export default HomeCarousel;
