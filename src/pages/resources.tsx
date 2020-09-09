import { Container, Typography } from "@material-ui/core";
import { makeStyles, Theme } from "@material-ui/core/styles";
import { NextPage } from "next";
import React from "react";
import ContentsLayout from "../components/layouts/ContentsLayout";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import Fade from "react-reveal/Fade";
import EventTab from "../components/resources/EventTab"

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
    },
    section: {
        marginBottom: theme.spacing(8),
    },
    title: {
        marginTop: theme.spacing(4),
        marginBottom: theme.spacing(4),
        textAlign: "center",
        "& h1": {
          color: "#363b3f",
            textTransform: "uppercase",
            fontWeight: 700,
            fontFamily: 'Lato',
        },
    }
}));


const About: NextPage = () => {
    const classes = useStyles();

    return (
        <ContentsLayout title="Resources">
            <Container component="main">
                <div className={classes.title}><Fade bottom duration={1000} delay={100} distance="30px"><Typography variant="h1">Resources</Typography></Fade></div>
                <Fade bottom duration={1000} delay={300} distance="30px"><EventTab /></Fade>
                

            </Container>
        </ContentsLayout>
    );
};

export default About;
