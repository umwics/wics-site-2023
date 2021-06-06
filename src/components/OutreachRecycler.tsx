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
            display: "grid",
            gridTemplateRows: "50% 50%",
            borderRadius: "3em",
            borderBottomStyle: "groove",
            borderBottomColor: "darkslateblue",
            borderBottomWidth: "thick",
            boxShadow: "0em 0em 0.2em 0em rgba(90, 90, 90, 0.3)",
            // backgroundImage: "linear-gradient(to bottom, black, #474b71, #333, black)"
            backgroundColor: "#3C394F"
        },
        recycler:{
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
            backgroundColor: "#A3C8CA",
            boxShadow: "inset 0 0.2em 0.3em black",
            margin: "0em 5em 0em 5em",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            overflowX: "scroll"
        },
        recyclerImgCenter:{
            backgroundColor: "lightgrey",
            margin: "1.5em",
            borderColor: "turquoise",
            borderStyle: "groove",
            borderWidth: "thick"
        },
        card:{
            backgroundColor: "white",
            margin: "1.5em",
            height: "5em",
            width: "8em",
            display: "flex",
            justifyContent:"center",
            alignItems: "center"
        },
        recyclerImg:{
            height: "90%",
            width: "90%",
            backgroundPosition: "center",
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat"
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
        }
    })
);

const items = [
    {
        name: "1",
        src: "img/outreach/canada-learning-code.svg",
        link: "https://www.canadalearningcode.ca/volunteer/",
        title: "Canada Learning Code",
        desc: "CLC is a volunteer-driven organization that brings accessible computer science to communities across Canada so everyone can create with technology. They do this by partnering with educators, designing resources, and delivering learning experiences."
    },
    {
        name: "2",
        src: "img/outreach/science-rendezvous.svg",
        link: "https://www.sciencerendezvous.ca/contact/become-a-volunteer/",
        title: "Science Rendezvous",
        desc: "Science Rendezvous takes science, technology, engineering, art, and math (STEAM) research and innovation out of the lab and onto the street in true festival style for you to discover and experience. This SATURDAY, MAY 8th 2021 may look a little different due to COVID-19. They are currently developing some very exciting events~ it may be virtual in 2021, but stay tuned."
    },
    {
        name: "3",
        src: "img/outreach/lets-talk-science.svg",
        link: "https://outreach.letstalkscience.ca/umanitoba/get-involved.html",
        title: "Let’s Talk Science",
        desc: "National Page: https://letstalkscience.ca/volunteer/become-a-volunteer /nLet’s Talk Science pass on their passion for science, technology, engineering and math (STEM) to Canada’s future. They shatter negative stereotypes and inspire children and youth to become engaged in STEM learning."
    },
    {
        name: "4",
        src: "img/outreach/kids-code-jeunesse.svg",
        link: "https://kidscodejeunesse.org/volunteer-signup",
        title: "Kids Code Jeunesse",
        desc: "A bilingual Canadian charity determined to give every Canadian child access to digital skills education, with a focus on girls and underserved communities. They encourage inclusive and sustainable learning by teaching kids and the educators who play a crucial role in their development."
    },
    {
        name: "5",
        src: "img/outreach/code-club.svg",
        link: "https://codeclub.ca/volunteer.html",
        title: "Code Club Canada",
        desc: "They support a nationwide network of volunteers and educators who run free coding clubs for children aged 8-12 to build and share their ideas and learning along the way. Code Club Canada is a project with the Montreal-based national non-profit organization, Kids Code Jeunesse."
    },
    {
        name: "6",
        src: "img/outreach/wise-kid-netic.png",
        link: "https://www.wisekidneticenergy.ca/employment",
        title: "WISE Kid-Netic Energy",
        desc: "Currently, not a volunteer position but they do hire undergraduate students to deliver their STEM programming. Currently, they are looking for a Spring/Summer Workshop & Club Instructor. They travel to schools in or near the City of Winnipeg delivering hands-on workshops based on K-12 Manitoba Science curriculum. During the spring they deliver workshops to communities further from Winnipeg, including rural communities and a number of First Nations throughout Manitoba. In the summer, they offer day camps in communities throughout the province."
    },
    {
        name: "7",
        src: "img/outreach/canu-canada.png",
        link: "https://canucanada.org/get-involved/volunteer/",
        title: "CanU",
        desc: "CanU is a Winnipeg-based charitable organization that inspires hope and confidence in the leaders of tomorrow through its out-of-school mentorship and educational enrichment program for youth in Grades 5-12. Throughout the year, CanU Kids participate in a wide range of educational experiences on post-secondary campuses and develop their nutrition, health, academic, social, and leadership skills. CanU programs are designed and led by post-secondary student volunteers who are honing their leadership and community service skills."
    }
];

function Description(props) {
    const classes = useStyles();
    return  <div className={classes.descriptionContainer}><div className={classes.description}> {props.desc} </div></div>
}

const OutreachRecycler: React.FC = () => {
    const classes = useStyles();
    var placeholder = "The meteor is heading our way, to the balcony. There was panicking and some scurrying around as we retreat inside. Sentinels find their ground, reluctantly ready to face this odd, ill-scheduled calamity. I gape in awe as the meteor takes form of a maiden, and the fire becomes a fiery dress billowing. In her hand is a huge sword crafted like the Phoenix. I stand with the others, mesmerized, watching the remains of her dark cape disintegrate into prismatic ash. Staffina has arrived. And now, she owns the Nyx Ethereal. I have never felt so defeated.";
    function getDesc(title, desc){
        console.log(title);
        console.log(desc);
        placeholder = desc;
    }

    return (
        <div className={classes.componentContainer}>
            <div className={classes.recyclerContainer}>
                <div className={classes.recycler}>
                    <div className={classes.arrowButton}>
                        <FontAwesomeIcon icon={faCaretLeft} />
                    </div>
                    <div className={classes.recyclerSlide}>
                        {items.map(item => {
                            return (
                                <div className={classes.card}>
                                    <div key={item.name} className={classes.recyclerImg} style={{ backgroundImage: `url(${item.src})` }} onClick={() => getDesc(item.title, item.desc)}></div>
                                </div>
                            );
                        })}
                    </div>
                    <div className={classes.arrowButton}>
                        <FontAwesomeIcon icon={faCaretRight} />
                    </div>
                </div>
                <Description desc={placeholder} />
            </div>
        </div>
    );
};

export default OutreachRecycler;