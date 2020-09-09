import { createStyles, makeStyles } from "@material-ui/core/styles";
import React from "react";
import Carousel from "react-material-ui-carousel";

const useStyles = makeStyles(() =>
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
        }
    })
);

const items = [
    {
        name: "1",
        src: "img/about/wics-0540.jpg"
    },
    {
        name: "2",
        src: "img/about/wics-0567.jpg"
    },
    {
        name: "3",
        src: "img/about/wics-0612.jpg"
    }
];

const CarouselSetting = {
    interval: 10000,
    indicators: true,
    timeout: 1500,
    navButtonsAlwaysInvisible: true
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
                    </div>
                );
            })}
        </Carousel>
    );
};

export default HomeCarousel;
