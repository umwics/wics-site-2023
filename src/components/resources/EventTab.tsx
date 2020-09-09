import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tab from '@material-ui/core/Tab';
import TabContext from '@material-ui/lab/TabContext';
import TabList from '@material-ui/lab/TabList';
import TabPanel from '@material-ui/lab/TabPanel';
import { Typography, Grid, Card, CardActionArea, CardMedia, CardContent, CardActions, Button } from '@material-ui/core';

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
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  subtitle: {
      marginTop: theme.spacing(8),
      marginBottom: theme.spacing(8),
      color: '#363b3f',
      textAlign: "left",
      fontWeight: 700,
      textTransform: "uppercase",
      fontFamily: 'Raleway'
  },
  rootcard: {
      maxWidth: 345,
    },
    media: {
      height: 140,
    },
    section: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(8),
    },
}));

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default function LabTabs() {
  const classes = useStyles();
  const [value, setValue] = React.useState('1');


  // eslint-disable-next-line @typescript-eslint/ban-types
  const handleChange = (_event: React.ChangeEvent<{}>, newValue: string) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <TabContext value={value}>
      
        <AppBar position="static">
          <TabList onChange={handleChange} variant="scrollable" aria-label="simple tabs example" centered>
            <Tab label="Events" value="1" />
            <Tab label="Beginners" value="2" />
            <Tab label="Intermediate" value="3" />
            <Tab label="Tutorials" value="4" />
            <Tab label="Libraries" value="5" />
            <Tab label="CS Course Tech Tree" value="6" />
          </TabList>
        </AppBar>


        <TabPanel value="1">
        <div className={classes.section}>

                <Grid container spacing={1}>
  <Grid container item xs={12} sm={4}>
<Card className={classes.rootcard}>
      <CardActionArea href="https://www.freecodecamp.org/" target="_blank">
        <CardMedia
          className={classes.media}
          image="img/resources/FreeCodeCamp_logo.png"
          title="freeCodeCamp"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
          freeCodeCamp
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
          freeCodeCamp is a non-profit organization that consists of an interactive learning web platform, an online community forum, chat rooms, online publications and local organizations that intend to make learning web development accessible to anyone.
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary" href="mailto:?subject=I wanted you to see this site&amp;body=Check out this site https://www.freecodecamp.org/."
   title="Share by Email">
          Share
        </Button>
        <Button size="small" color="primary" href="https://www.freecodecamp.org/" target="_blank">
          Learn More
        </Button>
      </CardActions>
    </Card>
  </Grid>
  <Grid container item xs={12} sm={4}>
  <Card className={classes.rootcard}>
      <CardActionArea href="https://www.kodewithklossy.com/" target="_blank">
        <CardMedia
          className={classes.media}
          image="img/resources/kwk.webp"
          title="Kode with Klossy"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
          Kode with Klossy
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
          With the Kode with Klossy Career Scholarship, you complete over 700 lessons and solve hundreds of labs to gain a mastery of programming fundamentals 
          as well as build fully functioning web apps and a massive digital portfolio of your skills on GitHub.
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary" href="mailto:?subject=I wanted you to see this site&amp;body=Check out this site https://www.kodewithklossy.com/."
   title="Share by Email">
          Share
        </Button>
        <Button size="small" color="primary" href="https://www.kodewithklossy.com/" target="_blank">
          Learn More
        </Button>
      </CardActions>
    </Card>
  </Grid>
  <Grid container item xs={12} sm={4}>
  <Card className={classes.rootcard}>
      <CardActionArea href="https://www.canadalearningcode.ca/" target="_blank">
        <CardMedia
          className={classes.media}
          image="img/resources/canada-learning-code.svg"
          title="Canada Learning Code"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            Canada Learning Code
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
          Offers beginner-friendly workshops for adults who want to learn computer programming and other technical skills in a social, collaborative way.
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary" href="mailto:?subject=I wanted you to see this site&amp;body=Check out this site https://www.canadalearningcode.ca/."
   title="Share by Email">
          Share
        </Button>
        <Button size="small" color="primary"href="https://www.canadalearningcode.ca/" target="_blank">
          Learn More
        </Button>
      </CardActions>
    </Card>
  </Grid>
</Grid>
</div>
        </TabPanel>


        <TabPanel value="2">        <div className={classes.section}>

<Grid container spacing={1}>
<Grid container item xs={12} sm={4}>
<Card className={classes.rootcard}>
<CardActionArea href="https://www.codecademy.com/catalog" target="_blank">
<CardMedia
className={classes.media}
image="img/resources/codeacademy.png"
title="CODECADEMY"
/>
<CardContent>
<Typography gutterBottom variant="h5" component="h2">
CODECADEMY
</Typography>
<Typography variant="body2" color="textSecondary" component="p">
Tons of online courses to help beginners get a start with many popular languages and technologies.
</Typography>
</CardContent>
</CardActionArea>
<CardActions>
<Button size="small" color="primary" href="mailto:?subject=I wanted you to see this site&amp;body=Check out this site https://www.codecademy.com/catalog."
title="Share by Email">
Share
</Button>
<Button size="small" color="primary" href="https://www.codecademy.com/catalog" target="_blank">
Learn More
</Button>
</CardActions>
</Card>
</Grid>
<Grid container item xs={12} sm={4}>
<Card className={classes.rootcard}>
<CardActionArea href="https://hourofcode.com/ca/learn" target="_blank">
<CardMedia
className={classes.media}
image="img/resources/hour-of-code.png"
title="HOUR OF CODE"
/>
<CardContent>
<Typography gutterBottom variant="h5" component="h2">
HOUR OF CODE
</Typography>
<Typography variant="body2" color="textSecondary" component="p">

One hour coding tutorials for most ages and abilities.
</Typography>
</CardContent>
</CardActionArea>
<CardActions>
<Button size="small" color="primary" href="mailto:?subject=I wanted you to see this site&amp;body=Check out this site https://hourofcode.com/ca/learn."
title="Share by Email">
Share
</Button>
<Button size="small" color="primary" href="https://hourofcode.com/ca/learn" target="_blank">
Learn More
</Button>
</CardActions>
</Card>
</Grid>
<Grid container item xs={12} sm={4}>
<Card className={classes.rootcard}>
<CardActionArea href="https://www.learn-c.org/" target="_blank">
<CardMedia
className={classes.media}
image="img/resources/learn-c.png"
title="Learn-C.org"
/>
<CardContent>
<Typography gutterBottom variant="h5" component="h2">
Learn-C.org
</Typography>
<Typography variant="body2" color="textSecondary" component="p">
Free online interactive language tutorials, using short and effective exercises.
</Typography>
</CardContent>
</CardActionArea>
<CardActions>
<Button size="small" color="primary" href="mailto:?subject=I wanted you to see this site&amp;body=Check out this site https://www.learn-c.org/."
title="Share by Email">
Share
</Button>
<Button size="small" color="primary"href="https://www.learn-c.org/" target="_blank">
Learn More
</Button>
</CardActions>
</Card>
</Grid>
</Grid>
</div>
</TabPanel>


        <TabPanel value="3"><div className={classes.section}>

<Grid container spacing={1}>
<Grid container item xs={12} sm={4}>
<Card className={classes.rootcard}>
<CardActionArea href="https://lagunita.stanford.edu/courses/DB/SQL/SelfPaced/about" target="_blank">
<CardMedia
className={classes.media}
image="img/resources/stanford.png"
title="Stanford University"
/>
<CardContent>
<Typography gutterBottom variant="h5" component="h2">
Stanford University
</Typography>
<Typography variant="body2" color="textSecondary" component="p">
Free online university courses in areas such as databases, automata theory, networking and more.
</Typography>
</CardContent>
</CardActionArea>
<CardActions>
<Button size="small" color="primary" href="mailto:?subject=I wanted you to see this site&amp;body=Check out this site https://lagunita.stanford.edu/courses/DB/SQL/SelfPaced/about."
title="Share by Email">
Share
</Button>
<Button size="small" color="primary" href="https://lagunita.stanford.edu/courses/DB/SQL/SelfPaced/about" target="_blank">
Learn More
</Button>
</CardActions>
</Card>
</Grid>
<Grid container item xs={12} sm={4}>
<Card className={classes.rootcard}>
<CardActionArea href="https://www.w3schools.com/" target="_blank">
<CardMedia
className={classes.media}
image="img/resources/w3.jpg"
title="w3schools"
/>
<CardContent>
<Typography gutterBottom variant="h5" component="h2">
w3schools
</Typography>
<Typography variant="body2" color="textSecondary" component="p">
Basically tutorials on everything ever.
</Typography>
</CardContent>
</CardActionArea>
<CardActions>
<Button size="small" color="primary" href="mailto:?subject=I wanted you to see this site&amp;body=Check out this site https://www.w3schools.com/."
title="Share by Email">
Share
</Button>
<Button size="small" color="primary" href="https://www.w3schools.com/" target="_blank">
Learn More
</Button>
</CardActions>
</Card>
</Grid>

</Grid>
</div>
</TabPanel>

        <TabPanel value="4"><div className={classes.section}>

<Grid container spacing={1}>
<Grid container item xs={12} sm={4}>
<Card className={classes.rootcard}>
<CardActionArea href="https://product.hubspot.com/blog/git-and-github-tutorial-for-beginners" target="_blank">
<CardMedia
className={classes.media}
image="img/resources/hubspot.png"
title="HubSpot"
/>
<CardContent>
<Typography gutterBottom variant="h5" component="h2">
HubSpot
</Typography>
<Typography variant="body2" color="textSecondary" component="p">
Git and Github tutorial for beginners.
</Typography>
</CardContent>
</CardActionArea>
<CardActions>
<Button size="small" color="primary" href="mailto:?subject=I wanted you to see this site&amp;body=Check out this site https://product.hubspot.com/blog/git-and-github-tutorial-for-beginners."
title="Share by Email">
Share
</Button>
<Button size="small" color="primary" href="https://product.hubspot.com/blog/git-and-github-tutorial-for-beginners" target="_blank">
Learn More
</Button>
</CardActions>
</Card>
</Grid>
<Grid container item xs={12} sm={4}>
<Card className={classes.rootcard}>
<CardActionArea href="https://developer.android.com/training/basics/firstapp" target="_blank">
<CardMedia
className={classes.media}
image="img/resources/android.png"
title="Google Android Developers"
/>
<CardContent>
<Typography gutterBottom variant="h5" component="h2">
Google Android Developers
</Typography>
<Typography variant="body2" color="textSecondary" component="p">
Step by step tutorial on making your first android app.
</Typography>
</CardContent>
</CardActionArea>
<CardActions>
<Button size="small" color="primary" href="mailto:?subject=I wanted you to see this site&amp;body=Check out this site https://developer.android.com/training/basics/firstapp."
title="Share by Email">
Share
</Button>
<Button size="small" color="primary" href="https://developer.android.com/training/basics/firstapp" target="_blank">
Learn More
</Button>
</CardActions>
</Card>
</Grid>

</Grid>
</div></TabPanel>

        <TabPanel value="5"><div className={classes.section}>

<Grid container spacing={1}>
<Grid container item xs={12} sm={4}>
<Card className={classes.rootcard}>
<CardActionArea href="https://getbootstrap.com/" target="_blank">
<CardMedia
className={classes.media}
image="img/resources/bootstrap.png"
title="Bootstrap"
/>
<CardContent>
<Typography gutterBottom variant="h5" component="h2">
Bootstrap
</Typography>
<Typography variant="body2" color="textSecondary" component="p">
Most popular front end library.
</Typography>
</CardContent>
</CardActionArea>
<CardActions>
<Button size="small" color="primary" href="mailto:?subject=I wanted you to see this site&amp;body=Check out this site https://getbootstrap.com/."
title="Share by Email">
Share
</Button>
<Button size="small" color="primary" href="https://getbootstrap.com/" target="_blank">
Learn More
</Button>
</CardActions>
</Card>
</Grid>
<Grid container item xs={12} sm={4}>
<Card className={classes.rootcard}>
<CardActionArea href="https://semantic-ui.com/" target="_blank">
<CardMedia
className={classes.media}
image="img/resources/semantic-ui.svg"
title="Semantic UI"
/>
<CardContent>
<Typography gutterBottom variant="h5" component="h2">
Semantic UI
</Typography>
<Typography variant="body2" color="textSecondary" component="p">
Another snazzy and easy to use front end library.
</Typography>
</CardContent>
</CardActionArea>
<CardActions>
<Button size="small" color="primary" href="mailto:?subject=I wanted you to see this site&amp;body=Check out this site https://semantic-ui.com/."
title="Share by Email">
Share
</Button>
<Button size="small" color="primary" href="https://semantic-ui.com/" target="_blank">
Learn More
</Button>
</CardActions>
</Card>
</Grid>

</Grid>
</div></TabPanel>

        <TabPanel value="6"><Typography variant="h4">Coming soon...</Typography></TabPanel>
        

      </TabContext>
    </div>
  );
}