import { createStyles, makeStyles } from "@material-ui/core/styles";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretLeft, faCaretRight } from "@fortawesome/free-solid-svg-icons";

const useStyles = makeStyles(() =>
    createStyles({
        root: {
            flexGrow: 1
        },
        componentContainer:{
            height: "30vw",
            width: "100%",
            marginTop: "1em",
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
        },
        recyclerContainer:{
            height: "90%",
            width: "80%",
            display: "flex",
            flexDirection: "column",
            borderRadius: "3em",
            borderBottomStyle: "groove",
            borderBottomColor: "darkslateblue",
            borderBottomWidth: "thick",
            boxShadow: "0em 0em 0.2em 0em rgba(90, 90, 90, 0.3)",
            // backgroundImage: "linear-gradient(to bottom, black, #474b71, #333, black)"
            backgroundColor: "rgb(78, 71, 119)"
        },
        recycler:{
            height: "40%",
            margin: "1em 3em 1em 3em",
            overflowY: "hidden",
            display: "grid",
            gridTemplateColumns: "5em 1fr 5em",
            alignItems: "center",
            justifyContent: "center"
        },
        arrowButton:{
            display: "grid",
            justifyItems: "center",
            color: "rgb(235, 54, 93)",
            fontSize: "7em",
            "&:hover":{
                color: "rgb(189, 52, 81)",
                transition: "0.2s",
                cursor: "pointer"
            }
        },
        recyclerSlide:{
            height: "100%",
            backgroundColor: "rgba(70, 66, 97, 0.8)",
            boxShadow: "inset 0 0.2em 0.3em black",
            margin: "0em 5em 0em 5em",
            display: "grid",
            gridTemplateColumns: "33% 1fr 33%",
        },
        recyclerImgCenter:{
            backgroundColor: "lightgrey",
            margin: "1.5em",
            borderColor: "turquoise",
            borderStyle: "groove",
            borderWidth: "thick"
        },
        recyclerImgSide:{
            backgroundColor: "grey",
            margin: "3em"
        },
        descriptionContainer:{
            backgroundColor: "rgb(67, 63, 90)",
            opacity: "90%",
            borderColor: "grey",
            borderStyle: "solid",
            borderWidth: "thin",
            margin: "0em 4em 1em 4em",
            boxShadow: "0em 0em 0.2em 0em rgba(0, 0, 0, 0.5)"
        },
        description:{
            margin: "3em",
            color: "whitesmoke"
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
                    <div className={classes.arrowButton}>
                        <FontAwesomeIcon icon={faCaretLeft} />
                    </div>
                    <div className={classes.recyclerSlide}>
                        <div className={classes.recyclerImgSide}></div>
                        <div className={classes.recyclerImgCenter}></div>
                        <div className={classes.recyclerImgSide}></div>
                    </div>
                    <div className={classes.arrowButton}>
                        <FontAwesomeIcon icon={faCaretRight} />
                    </div>
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