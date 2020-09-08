import ContentsLayout from "../components/layouts/ContentsLayout"
import { NextPage } from "next"
import BackToTop from "../components/BackToTop"
import HomeCarousel from "../components/carousel/HomeCarousel"
import { Container, Typography} from "@material-ui/core";
import { makeStyles, Theme, ThemeProvider } from "@material-ui/core/styles";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import Fade from "react-reveal/Fade"
import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme();
theme.typography.h1 = {
    fontSize: '3.0rem',
    '@media (min-width:600px)': {
      fontSize: '3.5rem',
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
        marginBottom: theme.spacing(8),
        fontFamily: "Lato"
    },
    sectionTitle: {
        paddingTop:100,
        textAlign: "center",
        marginBottom: 70,
        '& h2': {
            color: '#ff6f6f',
            marginBottom: 30,
          fontWeight: 700,
          textTransform: "uppercase",
          position: 'relative'
        },
        '& h5': {
            color: '#363b3f',
            position: 'relative'
          },
    },
    sectionEmbed: {
        textAlign: "center"
    },
    blink: {
        paddingTop: 30,
        letterSpacing: 3,
        fontSize: 25,
        textAlign: 'center',
        fontFamily: 'monospace',
        marginBottom: 10,
        '& p': {
            fontSize: 20,
      }
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

                        <ThemeProvider theme={theme}>
                        <Fade bottom duration={1000} delay={100} distance="30px">
                        <Typography variant="h2">Welcome to UM WICS!</Typography></Fade>
                        <Fade bottom duration={1000} delay={500} distance="30px">
                        <Typography variant="h5">Meet our team 2020-2021</Typography></Fade>
                        </ThemeProvider>
                        
                        </div>
                    
                    <div className={classes.sectionEmbed}>
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

                <div className={classes.paper}>
                    <Fade bottom duration={1000} delay={500} distance="30px">
                        <div className={classes.sectionTitle}>
                        <ThemeProvider theme={theme}>
                        <Fade bottom duration={1000} delay={100} distance="30px">
                        <Typography variant="h2">Stay Connected #umwics</Typography></Fade>
                        <Fade bottom duration={1000} delay={500} distance="30px">
                        <Typography variant="h5">Follow us on social media and checkout our upcoming events!</Typography></Fade>
                        </ThemeProvider>
                        </div>
                    </Fade>
                    <div className={classes.sectionEmbed}>
                        <Fade bottom duration={1000} delay={500} distance="30px">
                            <iframe
                                id="linktree-frame"
                                src="https://linktr.ee/umwics"
                                frameBorder="0"
                                width="100%"
                                height= '1200'
                            ></iframe>
                        </Fade>
                    </div>
                </div>
            </Container>
            <BackToTop />
        </ContentsLayout>
    );
};

export default Home;