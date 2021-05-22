import { createStyles, makeStyles } from "@material-ui/core/styles";
import React from "react";

const useStyles = makeStyles(() =>
    createStyles({
        root: {
            flexGrow: 1
        },
        componentContainer:{
            height: "30vw",
            width: "100%",
            backgroundColor: "beige",
            display: "flex",
            justifyContent: "center"
        },
        recyclerContainer:{
            height: "100%",
            width: "75%",
            backgroundColor: "black",
            display: "flex",
            flexDirection: "column"
        },
        recycler:{
            height: "40%",
            margin: "1em",
            backgroundColor: "crimson",
            display: "grid",
            gridTemplateColumns: "5em 1fr 5em"
        },
        arrowButton:{
            backgroundColor: "orchid"
        },
        recyclerSlide:{
            backgroundColor: "olive",
            margin: "0em 5em 0em 5em",
            display: "grid",
            gridTemplateColumns: "33% 1fr 33%"
        },
        recyclerImgCenter:{
            backgroundColor: "lightgrey",
            margin: "1.5em",
            borderColor: "darkorange",
            borderStyle: "groove",
            borderWidth: "thick"
        },
        recyclerImgSide:{
            backgroundColor: "grey",
            margin: "3em"
        },
        descriptionContainer:{
            backgroundColor: "azure",
            margin: "0em 4em 1em 4em",
            overflowY: "scroll"
        },
        description:{
            margin: "3em",
            color: "navy"
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
        src: "img/outreach/canada-learning-code.svg"
    },
    {
        name: "2",
        src: "img/outreach/science-rendezvous.svg"
    },
    {
        name: "3",
        src: "img/outreach/lets-talk-science.svg"
    },
    {
        name: "4",
        src: "img/outreach/kids-code-jeunesse.svg"
    },
    {
        name: "5",
        src: "img/outreach/code-club.svg"
    },
    {
        name: "6",
        src: "img/outreach/wise-kid-netic.png"
    },
    {
        name: "7",
        src: "img/outreach/canu-canada.png"
    }
];

const CarouselSetting = {
    interval: 10000,
    indicators: true,
    timeout: 1500,
    navButtonsAlwaysInvisible: true
};

const OutreachRecycler: React.FC = () => {
    const classes = useStyles();

    return (
        // <Carousel {...CarouselSetting}>
        //     {items.map(item => {
        //         return (
        //             <div key={item.name} className={classes.slideshow}>
        //                 <img src={item.src} alt={item.name} />
        //                 <div className={classes.boxFilter}></div>
        //             </div>
        //         );
        //     })}
        // </Carousel>
        <div className={classes.componentContainer}>
            <div className={classes.recyclerContainer}>
                <div className={classes.recycler}>
                    <div className={classes.arrowButton}></div>
                    <div className={classes.recyclerSlide}>
                        <div className={classes.recyclerImgSide}></div>
                        <div className={classes.recyclerImgCenter}></div>
                        <div className={classes.recyclerImgSide}></div>
                    </div>
                    <div className={classes.arrowButton}></div>
                </div>
                <div className={classes.descriptionContainer}>
                    <div className={classes.description}>
                        The meteor is heading our way, to the balcony. There was panicking and some scurrying around as we retreat inside. Sentinels find their ground, reluctantly ready to face this odd, ill-scheduled calamity. I gape in awe as the meteor takes form of a maiden, and the fire becomes a fiery dress billowing. In her hand is a huge sword crafted like the Phoenix. I stand with the others, mesmerized, watching the remains of her dark cape disintegrate into prismatic ash. Staffina has arrived. And now, she owns the Nyx Ethereal. I have never felt so defeated.
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OutreachRecycler;