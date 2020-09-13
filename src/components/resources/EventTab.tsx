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
            <Tab label="Learn to Code" value="1" />
            <Tab label="Coding Camps" value="2" />
            <Tab label="Free Online Coursess" value="3" />
            <Tab label="Libraries" value="4" />
            <Tab label="Online Editors" value="5" />
            <Tab label="UofM Resources" value="6" />
          </TabList>
        </AppBar>

        <TabPanel value="1">
          <div className={classes.section}>
            <Grid container spacing={1}>
              <Grid container item xs={12} sm={4}>
                <Card className={classes.rootcard}>
                  <CardActionArea href="https://hourofcode.com/ca/learn" target="_blank">  
                    <CardMedia
                      className={classes.media}
                      image="img/resources/hour-of-code.png"
                      title="Hour Of Code"
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="h2">
                        Hour Of Code
                      </Typography>
                      <Typography variant="body2" color="textSecondary" component="p">
                        The Hour of Code started as a one-hour introduction to computer science, designed to demystify &quot;code&quot;, to show that anybody can learn the basics, and to broaden participation in the field of computer science. It has since become a worldwide effort to celebrate computer science, starting with 1-hour coding activities but expanding to all sorts of community efforts.
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                  <CardActions>
                    <Button size="small" color="primary" href="https://hourofcode.com/ca/learn" target="_blank">
                      Learn More
                    </Button>
                  </CardActions>
                </Card>
              </Grid>

              <Grid container item xs={12} sm={4}>
                <Card className={classes.rootcard}>
                  <CardActionArea href="https://www.codecademy.com/catalog" target="_blank">
                    <CardMedia
                      className={classes.media}
                      image="img/resources/codecademy.png"
                      title="Codecademy"
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="h2">
                        Codecademy
                      </Typography>
                      <Typography variant="body2" color="textSecondary" component="p">
                        Codecademy is an American online interactive platform that offers free coding classes in 12 different programming languages including Python, Java, Go, JavaScript, Ruby, SQL, C++, Swift, and Sass, as well as markup languages HTML and CSS.
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                  <CardActions>
                    <Button size="small" color="primary" href="https://www.codecademy.com/catalog" target="_blank">
                      Learn More
                    </Button>
                  </CardActions>
                </Card>
              </Grid>

              <Grid container item xs={12} sm={4}>
                <Card className={classes.rootcard}>
                  <CardActionArea href="https://www.khanacademy.org/hourofcode/" target="_blank">
                    <CardMedia
                      className={classes.media}
                      image="img/resources/khanacademy.jpg"
                      title="Khan Academy"
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="h2">
                        Khan Academy
                      </Typography>
                      <Typography variant="body2" color="textSecondary" component="p">
                      Khan Academy offers practice exercises, instructional videos, and a personalized learning dashboard that empower learners to study at their own pace in and outside of the classroom.                      </Typography>
                    </CardContent>
                  </CardActionArea>
                  <CardActions>
                    <Button size="small" color="primary"href="https://www.canadalearningcode.ca/" target="_blank">
                      Learn More
                    </Button>
                  </CardActions>
                </Card>
              </Grid>

              <Grid container item xs={12} sm={4}>
                <Card className={classes.rootcard}>
                  <CardActionArea href="https://www.w3schools.com/html/" target="_blank">
                    <CardMedia
                      className={classes.media}
                      image="img/resources/w3schools.webp"
                      title="w3schools"
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="h2">
                        w3schools
                      </Typography>
                      <Typography variant="body2" color="textSecondary" component="p">
                      W3Schools is an educational website for learning web technologies online. Content includes tutorials and references relating to HTML, CSS, JavaScript, JSON, PHP, Python, AngularJS, React.js, SQL, Bootstrap, Sass, Node.js, jQuery, XQuery, AJAX, XML, Raspberry Pi, C++, C# and Java.
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                  <CardActions>
                    <Button size="small" color="primary" href="https://www.w3schools.com/html/" target="_blank">
                      Learn More
                    </Button>
                  </CardActions>
                </Card>
              </Grid>

            </Grid>
          </div>
        </TabPanel>
        {/* End of 1st Tab Panel */}

        <TabPanel value="2">
         <div className={classes.section}>
            <Grid container spacing={1}>
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
                      At Canada Learning Code, we believe that digital skills are tools of empowerment. The world is changing, and we want Canada to be ready. We’re here to make sure that all people in Canada — particularly women, girls, people with disabilities, Indigenous youth, and newcomers — have access to the knowledge they need to prosper in our digital world.
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                  <CardActions>
                    <Button size="small" color="primary"href="https://www.canadalearningcode.ca/" target="_blank">
                      Learn More
                    </Button>
                  </CardActions>
                </Card>
              </Grid>

              <Grid container item xs={12} sm={4}>
                <Card className={classes.rootcard}>
                  <CardActionArea href="https://learn.skillcrush.com/skillcrush-free-bootcamp/" target="_blank">
                    <CardMedia
                      className={classes.media}
                      image="img/resources/skillcrush_logo.png"
                      title="Skill Crush"
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="h2">
                        Skill Crush
                      </Typography>
                      <Typography variant="body2" color="textSecondary" component="p">
                      We believe that technology doesn’t have to be so hard—and that tech is a tool that anyone can use. Our goal is to improve our students’ quality of life through digital empowerment and skills to enter high-earning and flexible careers. Our community of students, alumni, and instructors will support you as you go from total tech newbie to tech pro. We are specifically focused on getting more women, people of color, LGBTQ+ people, people with disabilities, people without college degrees, parents and caretakers, or people who’ve taken long breaks from the workforce into the tech world. If you feel like there’s no place for you in tech because you’ve never seen someone like you represented, we understand—and want you to know that you are so, so welcome here.
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                  <CardActions>
                    <Button size="small" color="primary"href="https://learn.skillcrush.com/skillcrush-free-bootcamp/" target="_blank">
                      Learn More
                    </Button>
                  </CardActions>
                </Card>
              </Grid>

              <Grid container item xs={12} sm={4}>
                <Card className={classes.rootcard}>
                  <CardActionArea href="https://www.freecodecamp.org/" target="_blank">
                    <CardMedia
                      className={classes.media}
                      image="img/resources/FreeCodeCamp_logo.png"
                      title="Free Code Camp"
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="h2">
                        Free Code Camp
                      </Typography>
                      <Typography variant="body2" color="textSecondary" component="p">
                      We’re a nonprofit community that helps you learn to code by building projects. freeCodeCamp is a non-profit organization that consists of an interactive learning web platform, an online community forum, chat rooms, online publications and local organizations that intend to make learning web development accessible to anyone.
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                  <CardActions>
                    <Button size="small" color="primary"href="https://www.freecodecamp.org/" target="_blank">
                      Learn More
                    </Button>
                  </CardActions>
                </Card>
              </Grid>

            </Grid>
          </div>
        </TabPanel>
        {/* End of 2nd Tab Panel */}

        <TabPanel value="3">
          <div className={classes.section}>
            <Grid container spacing={1}>
              
            <Grid container item xs={12} sm={4}>
                <Card className={classes.rootcard}>
                  <CardActionArea href="https://www.coursera.org/" target="_blank">
                    <CardMedia
                      className={classes.media}
                      image="img/resources/coursera.svg"
                      title="Coursera"
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="h2">
                        Coursera
                      </Typography>
                      <Typography variant="body2" color="textSecondary" component="p">
                      Every course on Coursera is taught by top instructors from world-class universities and companies, so you can learn something new anytime, anywhere. Hundreds of free courses give you access to on-demand video lectures, homework exercises, and community discussion forums. Paid courses provide additional quizzes and projects as well as a shareable
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                  <CardActions>
                    <Button size="small" color="primary"href="https://www.coursera.org/" target="_blank">
                      Learn More
                    </Button>
                  </CardActions>
                </Card>
              </Grid>

              <Grid container item xs={12} sm={4}>
                <Card className={classes.rootcard}>
                  <CardActionArea href="https://www.edx.org/search?search_query=coding" target="_blank">
                    <CardMedia
                      className={classes.media}
                      image="img/resources/edx.png"
                      title="edx"
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="h2">
                        edx
                      </Typography>
                      <Typography variant="body2" color="textSecondary" component="p">
                      edX is the trusted platform for education and learning. Founded by Harvard and MIT, edX is home to more than 20 million learners, the majority of top-ranked universities in the world and industry-leading companies. As a global nonprofit, edX is transforming traditional education, removing the barriers of cost, location and access. Fulfilling the demand for people to learn on their own terms, edX is reimagining the possibilities of education, providing the highest-quality, stackable learning experiences including the groundbreaking MicroMasters® programs. Supporting learners at every stage, whether entering the job market, changing fields, seeking a promotion or exploring new interests, edX delivers courses for curious minds on topics ranging from data and computer science to leadership and communications. edX is where you go to learn.
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                  <CardActions>
                    <Button size="small" color="primary"href="https://www.edx.org/search?search_query=coding" target="_blank">
                      Learn More
                    </Button>
                  </CardActions>
                </Card>
              </Grid>

              <Grid container item xs={12} sm={4}>
                <Card className={classes.rootcard}>
                  <CardActionArea href="https://ocw.mit.edu/courses/intro-programming/" target="_blank">
                    <CardMedia
                      className={classes.media}
                      image="img/resources/ocw_mast.webp"
                      title="MIT OpenCourseWare"
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="h2">
                        MIT OpenCourseWare
                      </Typography>
                      <Typography variant="body2" color="textSecondary" component="p">
                      MIT OpenCourseWare makes the materials used in the teaching of almost all of MIT&apos;s subjects available on the Web, free of charge. With more than 2,400 courses available, OCW is delivering on the promise of open sharing of knowledge.
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                  <CardActions>
                    <Button size="small" color="primary"href="https://ocw.mit.edu/courses/intro-programming/" target="_blank">
                      Learn More
                    </Button>
                  </CardActions>
                </Card>
              </Grid>

              <Grid container item xs={12} sm={4}>
                <Card className={classes.rootcard}>
                  <CardActionArea href="https://developers.google.com/web/fundamentals/" target="_blank">
                    <CardMedia
                      className={classes.media}
                      image="img/resources/web-fundamentals.png"
                      title="Google Web Fundamentals"
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="h2">
                        Google Web Fundamentals
                      </Typography>
                      <Typography variant="body2" color="textSecondary" component="p">
                      Google&apos;s opinionated reference for building amazing web experiences.
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                  <CardActions>
                    <Button size="small" color="primary"href="https://developers.google.com/web/fundamentals/" target="_blank">
                      Learn More
                    </Button>
                  </CardActions>
                </Card>
              </Grid>

              <Grid container item xs={12} sm={4}>
                <Card className={classes.rootcard}>
                  <CardActionArea href="https://www.codewars.com/" target="_blank">
                    <CardMedia
                      className={classes.media}
                      image="img/resources/codewars.png"
                      title="Codewars"
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="h2">
                        Codewars
                      </Typography>
                      <Typography variant="body2" color="textSecondary" component="p">
                      Codewars is a collective effort by its users. They are creators - authoring kata to teach various techniques, solving kata with solutions that enlighten others, and commenting with constructive feedback. The leaders among them moderate the content and community.
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                  <CardActions>
                    <Button size="small" color="primary"href="https://www.codewars.com/" target="_blank">
                      Learn More
                    </Button>
                  </CardActions>
                </Card>
              </Grid>

              <Grid container item xs={12} sm={4}>
                <Card className={classes.rootcard}>
                  <CardActionArea href="https://www.codeconquest.com/" target="_blank">
                    <CardMedia
                      className={classes.media}
                      image="img/resources/codeconquest.webp"
                      title="Code Conquest"
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="h2">
                        Code Conquest
                      </Typography>
                      <Typography variant="body2" color="textSecondary" component="p">
                      A free online guide to coding for beginners. If you’re someone who wants to learn about coding, but you haven’t got a clue where to start, you’ve come to the right place. This site has all the step-by-step information you need to get started. Code Conquest is a free coding guide for beginners. Learn all about coding, compare and select training, take free tutorials and learn a ton more.
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                  <CardActions>
                    <Button size="small" color="primary"href="https://www.codeconquest.com/" target="_blank">
                      Learn More
                    </Button>
                  </CardActions>
                </Card>
              </Grid>

              <Grid container item xs={12} sm={4}>
                <Card className={classes.rootcard}>
                  <CardActionArea href="https://tutsplus.com/" target="_blank">
                    <CardMedia
                      className={classes.media}
                      image="img/resources/tuts.svg"
                      title="Envato Tuts"
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="h2">
                      Envato Tuts+
                      </Typography>
                      <Typography variant="body2" color="textSecondary" component="p">
                      Envato Tuts+ helps you learn creative skills and shape the life you want. As part of Envato’s creative ecosystem, Envato Tuts+ contributes to our mission of “helping people learn and earn online”. We love to see how people transform themselves and their lives by learning creative skills and earning money selling their creations or services to the world.
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                  <CardActions>
                    <Button size="small" color="primary"href="https://tutsplus.com/" target="_blank">
                      Learn More
                    </Button>
                  </CardActions>
                </Card>
              </Grid>

            </Grid>
          </div>
        </TabPanel>
        {/* End of 3rd Tab Panel */}

        <TabPanel value="4">
        <div className={classes.section}>
            <Grid container spacing={1}>
              
            <Grid container item xs={12} sm={4}>
                <Card className={classes.rootcard}>
                  <CardActionArea href="https://threejs.org/" target="_blank">
                    <CardMedia
                      className={classes.media}
                      image="img/resources/threejs.png"
                      title="threejs"
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="h2">
                        threejs
                      </Typography>
                      <Typography variant="body2" color="textSecondary" component="p">
                      Three.js is a cross-browser JavaScript library and application programming interface used to create and display animated 3D computer graphics in a web browser using WebGL.
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                  <CardActions>
                    <Button size="small" color="primary"href="https://threejs.org/" target="_blank">
                      Learn More
                    </Button>
                  </CardActions>
                </Card>
              </Grid>

              <Grid container item xs={12} sm={4}>
                <Card className={classes.rootcard}>
                  <CardActionArea href="http://microjs.com/#" target="_blank">
                    <CardMedia
                      className={classes.media}
                      image="img/resources/micro.png"
                      title="MicroJS"
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="h2">
                      MicroJS
                      </Typography>
                      <Typography variant="body2" color="textSecondary" component="p">
                      Fantastic micro-frameworks and micro-libraries for fun and profit! - MicroJS.
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                  <CardActions>
                    <Button size="small" color="primary"href="http://microjs.com/#" target="_blank">
                      Learn More
                    </Button>
                  </CardActions>
                </Card>
              </Grid>

              <Grid container item xs={12} sm={4}>
                <Card className={classes.rootcard}>
                  <CardActionArea href="https://riot.js.org/" target="_blank">
                    <CardMedia
                      className={classes.media}
                      image="img/resources/riotjs.svg"
                      title="riot.js"
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="h2">
                        Riot.js
                      </Typography>
                      <Typography variant="body2" color="textSecondary" component="p">
                      Riot.js is a simple and elegant component-based UI library. Riot.js lets you build user interfaces with custom tags using simple and enjoyable syntax.
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                  <CardActions>
                    <Button size="small" color="primary"href="https://riot.js.org/" target="_blank">
                      Learn More
                    </Button>
                  </CardActions>
                </Card>
              </Grid>

              <Grid container item xs={12} sm={4}>
                <Card className={classes.rootcard}>
                  <CardActionArea href="https://www.vantajs.com/" target="_blank">
                    <CardMedia
                      className={classes.media}
                      image="img/resources/vantajs.jpg"
                      title="vantajs"
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="h2">
                        vantajs
                      </Typography>
                      <Typography variant="body2" color="textSecondary" component="p">
                      WebGL animated website backgrounds in a few lines of code.
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                  <CardActions>
                    <Button size="small" color="primary"href="https://www.vantajs.com/" target="_blank">
                      Learn More
                    </Button>
                  </CardActions>
                </Card>
              </Grid>

              <Grid container item xs={12} sm={4}>
                <Card className={classes.rootcard}>
                  <CardActionArea href="https://vincentgarreau.com/particles.js/" target="_blank">
                    <CardMedia
                      className={classes.media}
                      image="img/resources/particlesjs.png"
                      title="particles.js"
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="h2">
                        particles.js
                      </Typography>
                      <Typography variant="body2" color="textSecondary" component="p">
                      A lightweight JavaScript library for creating particles.
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                  <CardActions>
                    <Button size="small" color="primary"href="https://vincentgarreau.com/particles.js/" target="_blank">
                      Learn More
                    </Button>
                  </CardActions>
                </Card>
              </Grid>

              <Grid container item xs={12} sm={4}>
                <Card className={classes.rootcard}>
                  <CardActionArea href="https://github.com/Tixit/gem.js" target="_blank">
                    <CardMedia
                      className={classes.media}
                      image="img/resources/gem-title.png"
                      title="gem.js"
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="h2">
                        gem.js
                      </Typography>
                      <Typography variant="body2" color="textSecondary" component="p">
                      A view library for building and styling web components in pure-javascript. 
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                  <CardActions>
                    <Button size="small" color="primary"href="https://github.com/Tixit/gem.js" target="_blank">
                      Learn More
                    </Button>
                  </CardActions>
                </Card>
              </Grid>

              <Grid container item xs={12} sm={4}>
                <Card className={classes.rootcard}>
                  <CardActionArea href="http://jsblocks.com/" target="_blank">
                    <CardMedia
                      className={classes.media}
                      image="img/resources/logoBeta.png"
                      title="jsblocks"
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="h2">
                        jsblocks
                      </Typography>
                      <Typography variant="body2" color="textSecondary" component="p">
                      From simple user interfaces to complex single-page applications using faster, server-side rendered and easy to learn framework
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                  <CardActions>
                    <Button size="small" color="primary"href="http://jsblocks.com/" target="_blank">
                      Learn More
                    </Button>
                  </CardActions>
                </Card>
              </Grid>

            </Grid>
          </div>
        </TabPanel>
        {/* End of 4th Tab Panel */}

        <TabPanel value="5">
        <div className={classes.section}>
            <Grid container spacing={1}>
              
            <Grid container item xs={12} sm={4}>
                <Card className={classes.rootcard}>
                  <CardActionArea href="https://codesandbox.io/" target="_blank">
                    <CardMedia
                      className={classes.media}
                      image="img/resources/codesandbox.svg"
                      title="code sandbox"
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="h2">
                        Code Sandbox
                      </Typography>
                      <Typography variant="body2" color="textSecondary" component="p">
                      Web Development Made Faster - An instant IDE and prototyping tool for rapid web development.
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                  <CardActions>
                    <Button size="small" color="primary"href="https://codesandbox.io" target="_blank">
                      Learn More
                    </Button>
                  </CardActions>
                </Card>
              </Grid>

              <Grid container item xs={12} sm={4}>
                <Card className={classes.rootcard}>
                  <CardActionArea href="https://codepen.io/" target="_blank">
                    <CardMedia
                      className={classes.media}
                      image="img/resources/codepen.png"
                      title="codepen"
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="h2">
                        CODEPEN
                      </Typography>
                      <Typography variant="body2" color="textSecondary" component="p">
                      CodePen is an online community for testing and showcasing user-created HTML, CSS and JavaScript code snippets. It functions as an online code editor and open-source learning environment, where developers can create code snippets, called &quot;pens,&quot; and test them.
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                  <CardActions>
                    <Button size="small" color="primary"href="https://codepen.io/" target="_blank">
                      Learn More
                    </Button>
                  </CardActions>
                </Card>
              </Grid>

              <Grid container item xs={12} sm={4}>
                <Card className={classes.rootcard}>
                  <CardActionArea href="https://snack.expo.io/" target="_blank">
                    <CardMedia
                      className={classes.media}
                      image="img/resources/snack.svg"
                      title="snack expo"
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="h2">
                        Snack Expo
                      </Typography>
                      <Typography variant="body2" color="textSecondary" component="p">
                      The fastest way to build an app. With Expo tools, services, and React, you can build, deploy, and quickly iterate on native Android, iOS, and web apps from the same JavaScript codebase. Snack allows you to run code in the browser in a matter of seconds. No downloads required.
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                  <CardActions>
                    <Button size="small" color="primary"href="https://snack.expo.io/" target="_blank">
                      Learn More
                    </Button>
                  </CardActions>
                </Card>
              </Grid>

              <Grid container item xs={12} sm={4}>
                <Card className={classes.rootcard}>
                  <CardActionArea href="https://jsfiddle.net/" target="_blank">
                    <CardMedia
                      className={classes.media}
                      image="img/resources/Jsfiddle-logo.png"
                      title="jsfiddle"
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="h2">
                        jsfiddle
                      </Typography>
                      <Typography variant="body2" color="textSecondary" component="p">
                      JSFiddle is an online IDE service and online community for testing and showcasing user-created and collaborational HTML, CSS and JavaScript code snippets, known as &apos;fiddles&apos;. It allows for simulated AJAX calls.
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                  <CardActions>
                    <Button size="small" color="primary"href="https://jsfiddle.net/" target="_blank">
                      Learn More
                    </Button>
                  </CardActions>
                </Card>
              </Grid>

            </Grid>
          </div>
        </TabPanel>
        {/* End of 5th Tab Panel */}

        <TabPanel value="6">
        <div className={classes.section}>
            <Grid container spacing={1}>

              <Grid container item xs={12} sm={4}>
                <Button size="small" color="primary"href="https://jump.portal.umanitoba.ca/" target="_blank">
                  Jump Portal
                </Button>
              </Grid>

              <Grid container item xs={12} sm={4}>
                <Button size="small" color="primary"href="https://www.uofmcareerservices.ca" target="_blank">
                  Career Connect
                </Button>
              </Grid>

              <Grid container item xs={12} sm={4}>
                <Button size="small" color="primary"href="http://umanitoba.ca/student/careerservices/media/Resume.pdf" target="_blank">
                  Resume Help
                </Button>
              </Grid>

              <Grid container item xs={12} sm={4}>
                <Button size="small" color="primary"href="http://umanitoba.ca/student/careerservices/media/CoverLetter.pdf" target="_blank">
                  Cover Letter Help
                </Button>
              </Grid>

              <Grid container item xs={12} sm={4}>
                <Button size="small" color="primary"href="https://umsu.ca/student-clubs-associations/student-clubs/" target="_blank">
                  Find other student clubs
                </Button>
              </Grid>

            </Grid>
          </div>
        </TabPanel>
        {/* End of 6th Tab Panel */}

      </TabContext>
    </div>
  );
}