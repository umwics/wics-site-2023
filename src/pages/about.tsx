import { Container, Button, Typography} from "@material-ui/core";
import { makeStyles, Theme, ThemeProvider } from "@material-ui/core/styles";
import { NextPage } from "next";
import React from "react";
import ContentsLayout from "../components/layouts/ContentsLayout";
import BackToTop from "../components/BackToTop";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import Fade from "react-reveal/Fade";
import { createMuiTheme } from '@material-ui/core/styles';
import AboutCarousel from "../components/carousel/AboutCarousel"

const theme = createMuiTheme();
theme.typography.h1 = {
    fontSize: '2.5rem',
    '@media (min-width:600px)': {
      fontSize: '4.0rem',
    },
    '@media (max-width:420px)': {
        fontSize: '1.5rem',
      },
  };
theme.typography.h2 = {
    fontSize: '2.0rem',
    '@media (min-width:600px)': {
      fontSize: '2.5rem',
    },
    '@media (max-width:420px)': {
        fontSize: '1.5rem',
      },
  };
theme.typography.h3 = {
  fontSize: '1.5rem',
  '@media (min-width:600px)': {
    fontSize: '1.75rem',
  },
  '@media (max-width:420px)': {
      fontSize: '1.25rem',
    },
};
theme.typography.h4 = {
    fontSize: '1.25rem',
    '@media (min-width:600px)': {
      fontSize: '1.5rem',
    },
    '@media (max-width:420px)': {
        fontSize: '1.0rem',
      },
  };
theme.typography.h5 = {
    fontSize: '1.0rem',
    '@media (min-width:600px)': {
      fontSize: '1.25rem',
    },
    '@media (max-width:420px)': {
        fontSize: '0.75rem',
      },
};
theme.typography.h6 = {
    fontSize: '0.75rem',
    '@media (min-width:600px)': {
      fontSize: '1.0rem',
    }
  };
  
const useStyles = makeStyles((theme: Theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        fontFamily: "Lato"
    },
    center: {
        textAlign: "center",
        '& h1': {
          color: '#ff6f6f',
          fontSize:40,
          marginBottom: 30,
        fontWeight: 700,
        textTransform: "uppercase",
        position: 'relative'
      }
    },
    title: {
        top: '40%',
        marginBottom: 50,
      fontFamily: 'Lato',
      position: 'absolute',
      textAlign: 'center',
      color: 'white',
      justifyContent: 'center',
      textTransform: 'uppercase',
      fontWeight: 700,
      width: '100%',
          '& h1': {
            marginTop: 0,
            marginBottom: 6,
        }
        }
}));


const About: NextPage = () => {
    const classes = useStyles();

    return (
        <ContentsLayout title="About">
            <AboutCarousel />
            
            <div className={classes.title}>
            <Fade bottom duration={1000} delay={100} distance="30px">
            <ThemeProvider theme={theme}>
                        <Typography variant="h1">About Us</Typography>
                    </ThemeProvider></Fade>
                <Fade bottom duration={1000} delay={300} distance="30px">
                <p>We are a group of University of Manitoba students who support women in technology.<br/>All are welcome to join!</p></Fade>
            </div>
                        
            <Container component="main">
                <div className={classes.paper}>

                <Fade bottom duration={1000} delay={0} distance="30px">
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

<Fade bottom duration={1000} delay={100} distance="30px">
<div className={classes.center}>
        <h1>Join Us</h1><br />
        <Button variant="contained" color="primary" href="https://wicsuofm.slack.com" target="_blank">Join Our Slack Here
        </Button><br /><br />
        <h6>This is where we discuss upcoming events, current news, and it is a chance to connect with other members!</h6><br />
    <iframe
        id="googleForm"
        src="https://docs.google.com/forms/d/e/1FAIpQLSfBp6u_AGJv0PyPSP8_-foI3IdyuEv52DnNa1Evm9Ap6YnNfQ/viewform?embedded=true"
        width="760"
        height="1500"
        frameBorder="0"
        scrolling="no">Loading...</iframe>
</div></Fade>




                </div>
            </Container>
            <BackToTop />
        </ContentsLayout>
    );
};

export default About;
