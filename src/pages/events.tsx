import { AppBar, Button, Card, CardActions, CardContent, CardMedia, Container, CssBaseline, Grid, Toolbar, Typography} from "@material-ui/core";
import { makeStyles, Theme } from "@material-ui/core/styles";
import CameraIcon from '@material-ui/icons/PhotoCamera';
import { NextPage } from "next";
import React from "react";
import ContentsLayout from "../components/layouts/ContentsLayout";
import BackToTop from "../components/BackToTop";

const useStyles = makeStyles((theme: Theme) => ({
    paper: {
        marginTop: theme.spacing(8),
    },
    icon: {
        marginRight: theme.spacing(2),
      },
      heroContent: {
        padding: theme.spacing(8, 0, 6),
        "& h1": {
            color: "#363b3f",
              textTransform: "uppercase",
              fontWeight: 700,
              fontFamily: 'Lato',
          },
          "& h5": {
              fontFamily: 'Lato',
          },  
          "& h4": {
            color: "#ff6f6f",
            fontFamily: 'Lato',
        },      
          
      },
      heroButtons: {
        marginTop: theme.spacing(4),
      },
      cardGrid: {
        paddingTop: theme.spacing(8),
        paddingBottom: theme.spacing(8),
      },
      card: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
      },
      cardMedia: {
        paddingTop: '56.25%', // 16:9
      },
      cardContent: {
        flexGrow: 1,
      },
}));

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const About: NextPage = () => {
    const classes = useStyles();

    return (
        <ContentsLayout title="Events">
            <Container component="main">

                <React.Fragment>
      <CssBaseline />
      <main>
        {/* Hero unit */}
        <div className={classes.heroContent}>
          <Container maxWidth="sm">
            <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
              Events
            </Typography>
            <Typography component="h5" variant="h5" align="center" color="textSecondary" paragraph>
            We hold a number of events each semester, from social events to learning sessions that you can join in on!
            </Typography>
            <div className={classes.heroButtons}>
              <Grid container spacing={2} justify="center">

                <Grid item>
                  <Button variant="outlined" color="secondary">
                    Mentor Mingle
                  </Button>
                </Grid>
                <Grid item>
                  <Button variant="outlined" color="secondary">
                    Other events
                  </Button>
                </Grid>

                <Grid item>
                  <Button variant="contained" color="secondary">
                    Calendar
                  </Button>
                </Grid>
              </Grid>
            </div>
          </Container>
        </div>
        <Container className={classes.cardGrid} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
            {cards.map((card) => (
              <Grid item key={card} xs={12} sm={6} md={4}>
                <Card className={classes.card}>
                  <CardMedia
                    className={classes.cardMedia}
                    image="https://source.unsplash.com/random"
                    title="Image title"
                  />
                  <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" component="h2">
                      Heading
                    </Typography>
                    <Typography>
                      This is a media card. You can use this section to describe the content.
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small" color="primary">
                      View
                    </Button>
                    <Button size="small" color="primary">
                      Edit
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
    </React.Fragment>
            </Container>
            <BackToTop />
        </ContentsLayout>
    );
};

export default About;
