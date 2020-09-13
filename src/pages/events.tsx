import { Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Container, CssBaseline, Grid, Typography} from "@material-ui/core";
import { makeStyles, Theme } from "@material-ui/core/styles";
import { NextPage } from "next";
import React from "react";
import ContentsLayout from "../components/layouts/ContentsLayout";
import BackToTop from "../components/BackToTop";
import { faMapMarker } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const useStyles = makeStyles((theme: Theme) => ({
    paper: {
        marginTop: theme.spacing(8),
    },
    icon: {
        marginRight: theme.spacing(2),
      },
      heroContent: {
        padding: theme.spacing(8, 0, 6),
        "& h2": {
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

      calendar: {
        marginTop: 30,
        marginBottom: 30,
        alignItems: 'center',
        justifyContent: 'center',
    },
    
    calendarSmall: {
        display: "none",
        '@media (min-width:800px)': {
          display: "none",
        },
        '@media (max-width:800px)': {
          display: "flex",
          alignItems: 'center',
            justifyContent: 'center',
            width: "100%",
            marginTop: 30,
            marginBottom: 30,
        },
    },
    
    calendarLarge: {
      display: "none",
      '@media (min-width:800px)': {
        display: "flex",
        alignItems: 'center',
            justifyContent: 'center',
            width: "100%",
            marginTop: 30,
            marginBottom: 30,
      },
      '@media (max-width:800px)': {
        display: "none",
      },
  },
    
}));

// const cardMentorMingle = [1, 2, 3, 4, 5];
const cardOtherEvents = ["aws"];
const cardMentorMingle = [
  {
    title: "2020 Winter SkipTheDishes",
    term: "2020 Winter",
    name: "SkipTheDishes",
    identification: "2020-winter-skipthedishes",
    imgurl: "img/events/skipthedishes",
    date: "Jan 22, 2020",
    location: "SkipTheDishes Winnipeg",
    description: "Thank you to everyone that came out to our mentor mingle @SkipTheDishes!! we hope you had fun! Thanks again to Skip for having us all :)",
    photocredit: "Photo Credits: @tylerloewenphotos ⁣⁣⁣⁣⁣⁣⁣⁣⁣",
    image: "img/events/skipthedishes.jpg",
  },
  {
    title: "2019 Fall iQmetrix",
    term: "2019 Fall",
    name: "iQmetrix",
    identification: "2019-fall-iqmetrix",
    imgurl: "img/events/iqmetrix",
    date: "Oct 2, 2019",
    location: "iQmetrix Winnipeg",
    description: "Thank you again to @iqmetrix for having us and thank you to everyone that came out! We hope you had a great evening ☺️",
    photocredit: "Photo Credits: @tylerloewenphotos ⁣⁣⁣⁣⁣⁣⁣⁣⁣",
    image: "img/events/iqmetrix.jpg",
  },
  {
    title: "2019 Summer Bold",
    term: "2019 Summer",
    name: "Bold",
    identification: "2019-summer-bold",
    imgurl: "img/events/bold",
    date: "Jun 5, 2019",
    location: "Bold Winnipeg",
    description: "Thank you again to our panelists for answering our questions, and thank you to Bold for having us!",
    photocredit: "Photo Credits: @tylerloewenphotos @ Bold Commerce ⁣⁣⁣⁣⁣⁣⁣⁣⁣",
    image: "img/events/bold.jpg",
  },
  {
    title: "2019 Winter Ubisoft",
    term: "2019 Winter",
    name: "Ubisoft",
    identification: "2019-winter-ubisoft",
    imgurl: "img/events/ubisoft",
    date: "Feb 13, 2019",
    location: "Ubisoft Winnipeg",
    description: "We are so grateful to Ubisoft for hosting our Mentor Mingle Event. Thanks for all the inspiring words!! We hope to partner up again in the future. ❤️❤️",
    photocredit: "Photo Credits: @tylerloewenphotos ⁣⁣⁣⁣⁣⁣⁣⁣⁣",
    image: "img/events/ubisoft.jpg",
  },
  {
    title: "2018 Fall 24-7 Intouch",
    term: "2018 Fall",
    name: "24-7 Intouch",
    identification: "2018-fall-247intouch",
    imgurl: "img/events/247intouch",
    date: "Oct 26, 2018",
    location: "24-7 Intouch Winnipeg",
    description: "Here are some final photos from our Fall 2018 Mentor Mingle! We are hoping to host one again in February! Check the slack in January/ February for more details. Some final thanks to @24_7intouch @wearelaivly for hosting. Everybody had a great time!!",
    photocredit: "Photo Credits: @tylerloewenphotos ⁣⁣⁣⁣⁣⁣⁣⁣⁣",
    image: "img/events/247intouch.jpg",
  },

];


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
            <Typography component="h2" variant="h2" align="center" color="textPrimary" gutterBottom>
              Events
            </Typography>
            <Typography component="h5" variant="h5" align="center" color="textSecondary" paragraph>
            We hold a number of events each semester, from social events to learning sessions that you can join in on!
            </Typography>
            <div className={classes.heroButtons}>
              <Grid container spacing={2} justify="center">

                <Grid item>
                  <Button variant="contained" color="secondary" href="#mentor-mingle">
                    Mentor Mingle
                  </Button>
                </Grid>
                <Grid item>
                  <Button variant="contained" color="secondary" href="#other-events">
                    Other events
                  </Button>
                </Grid>

                <Grid item>
                  <Button variant="contained" color="secondary" href="#calendar">
                    Calendar
                  </Button>
                </Grid>
              </Grid>
            </div>
          </Container>
        </div>

        <div className={classes.heroContent} id="mentor-mingle">
        <Typography component="h4" variant="h4" align="center" color="textPrimary" gutterBottom>
              Mentor Mingle
            </Typography>
        <Container className={classes.cardGrid} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
            {cardMentorMingle.map((item) => (
              <Grid item key={item.name} xs={12} sm={6} md={4}>
                <Card className={classes.card}>
                <CardActionArea href="" target="_blank">
                  <CardMedia
                    className={classes.cardMedia}
                    image={item.image}
                    title={item.name}
                  />
                  <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" component="h2">
                    {item.name}
                    </Typography>
                    <Typography>

{item.term}
<h5>
    {item.date} <br /><FontAwesomeIcon icon={faMapMarker} /> {item.location}
</h5>
<p>{item.description}</p>
<h6>{item.photocredit}</h6>
                    </Typography>
                  </CardContent>
                  </CardActionArea>
                  
                  <CardActions>
                    <Button size="small" color="primary">
                      View
                    </Button>
                    <Button size="small" color="primary">
                      Share
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
</div>


<div className={classes.heroContent} id="other-events">
        <Typography component="h4" variant="h4" align="center" color="textPrimary" gutterBottom>
              Other Events
            </Typography>
        <Container className={classes.cardGrid} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
            {cardOtherEvents.map((card) => (
              <Grid item key={card} xs={12} sm={6} md={4}>
                <Card className={classes.card}>
                  <CardMedia
                    className={classes.cardMedia}
                    image="img/events/Amazon.jpg"
                    title="Image title"
                  />
                  <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" component="h2">
                    AWS Thinkbox Introductory Event
                    </Typography>
                    <Typography>
                    Jan 22, 2020 <br />
 AWS Thinkbox Winnipeg<br/>
                    WICS members learning how Blender works at AWS Thinkbox Winnipeg!⁣⁣
Thank you again Amazon for having us, and thank you to all the students who came out.
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small" color="primary">
                      View
                    </Button>
                    <Button size="small" color="primary">
                      Share
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
</div>

<div className={classes.heroContent} id="calendar">
        <Typography component="h4" variant="h4" align="center" color="textPrimary" gutterBottom>
              Calendar
            </Typography>
            <div className={classes.calendarLarge}>
    <iframe
        src="https://calendar.google.com/calendar/b/1/embed?showTitle=0&amp;showCalendars=0&amp;height=600&amp;wkst=1&amp;bgcolor=%23FFFFFF&amp;src=uofmwics%40gmail.com&amp;color=%231B887A&amp;ctz=America%2FWinnipeg"
        width="800" height="600" frameBorder="0" scrolling="no"></iframe>
</div>

<div className={classes.calendarSmall}>
    <iframe
        src="https://calendar.google.com/calendar/b/1/embed?showTitle=0&amp;showPrint=0&amp;showTabs=0&amp;showCalendars=0&amp;showTz=0&amp;mode=AGENDA&amp;height=600&amp;wkst=1&amp;bgcolor=%23FFFFFF&amp;src=uofmwics%40gmail.com&amp;color=%231B887A&amp;ctz=America%2FWinnipeg"
        width="80%" height="600" frameBorder="0" scrolling="no"></iframe>
</div>
</div>

      </main>
    </React.Fragment>
            </Container>
            <BackToTop />
        </ContentsLayout>
    );
};

export default About;
