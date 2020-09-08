import React from 'react'
import { makeStyles, createStyles, ThemeProvider } from '@material-ui/core/styles'
import Carousel from 'react-material-ui-carousel'
import { Button, Typography } from "@material-ui/core";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import Fade from "react-reveal/Fade";
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

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      flexGrow: 1
    },
    slideshow: {
      textAlign: 'center',
      color: 'white',
      backgroundColor: 'black',
      display: 'block',
      width: '100%',
      height: '660px',
      position: 'relative',
      overflow: 'hidden',
      '& img': {
        width: '100%',
        height: '660px',
        objectFit: 'cover'
      }
    },
    boxFilter: {
      backgroundColor: 'rgba(0,0,0,0.4)',
      position: 'absolute',
      top: 0,
      width: '100%',
      height: '660px'
    },
    title: {
    fontFamily: 'Lato',
      position: 'absolute',
      top: 180,
      textAlign: 'center',
      color: 'white',
      justifyContent: 'center',
      width: '100%',
      '& h1': {
        marginTop: 0,
        marginBottom: 6,
        textTransform: 'uppercase',
        color: '#fff',
        fontWeight: 700,
    },
      '& h2': {
        marginTop: 0,
        marginBottom: 0,
        color: '#fff',
        fontWeight: 400,
        letterSpaceing: 2
    },
      '& p': {
        fontWeight: 400,
        fontSize: 18,
        letterSpaceing: 1
    }
    }
  })
)

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const HomeCarousel = () => {
  const items = [
    {
      name: '1',
      h1: 'Women in Computer Science',
      h2: 'University of Manitoba',
      p: "We are a group of University of Manitoba students who support women in technology.",
      src: 'img/main/ubisoft-group.jpg',
      linkname: "About us",
      link: '/about'
    },
    {
      name: '2',
      h1: 'AWS',
      h2: 'Thinkbox Intro Event',
      p: '2020 WINTER',
      src: 'img/main/amazon-talk.jpg',
      linkname: "See more",
      link: ''
    },
    {
      name: '3',
      h1: 'SkipTheDishes',
      h2: 'MENTOR MINGLE',
      p: '2020 WINTER',
      src: 'img/main/skip-clap.jpg',
      linkname: "See more",
      link: ''
    },
    {
      name: '4',
      h1: 'SkipTheDishes',
      h2: 'MENTOR MINGLE',
      p: '2020 WINTER',
      src: 'img/main/skip-group.jpg',
      linkname: "See more",
      link: ''
    },
    {
      name: '5',
      h1: 'SkipTheDishes',
      h2: 'Scholarship',
      p: 'Recipient Claire',
      src: 'img/main/skip-scholarship.jpg',
      linkname: "See more",
      link: ''
    },
    {
      name: '6',
      h1: 'Bold',
      h2: 'MENTOR MINGLE',
      p: '2019 SUMMER',
      src: 'img/main/bold-presenter.jpg',
      linkname: "See more",
      link: ''
    },
    {
      name: '7',
      h1: 'iQmetrix',
      h2: 'MENTOR MINGLE',
      p: '2019 FALL',
      src: 'img/main/iqmetrix-reception.jpg',
      linkname: "See more",
      link: ''
    }
  ]

  const CarouselSetting = {
    interval: 10000,
    indicators: true,
    timeout: 800
  }

  const classes = useStyles()

  return (
    <Carousel {...CarouselSetting}>
            {
              items.map(item => {
                return (
                  <div key={item.name} className={classes.slideshow}>
                    <img src={item.src} alt={item.name} />
                    <div className={classes.boxFilter}></div>
                    <div className={classes.title}>

                    <ThemeProvider theme={theme}>
                        <Fade bottom duration={1000} delay={100} distance="30px">
                        <Typography variant="h4">{item.h2}</Typography></Fade>
                        <Fade bottom duration={1000} delay={300} distance="30px">
                        <Typography variant="h1">{item.h1}</Typography></Fade>
                        <Fade bottom duration={1000} delay={400} distance="30px">
                        <p>{item.p}</p>
                        </Fade>
                    </ThemeProvider>

                    <p><Fade bottom duration={1000} delay={500} distance="30px"><Button variant="contained" color="secondary" href={item.link}>{item.linkname}</Button></Fade></p>
                      
                    </div>
                  </div>
                )
              }
              )
            }
    </Carousel>
  )
}

export default HomeCarousel
