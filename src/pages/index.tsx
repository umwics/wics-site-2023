import { Container, makeStyles, Theme, Typography, Button } from "@material-ui/core";
import { NextPage } from "next";
import AdminLayout from "../components/layouts/AdminLayout";
import Carousel from "react-bootstrap/Carousel";
import Fade from "react-reveal/Fade";
import Typical from "react-typical";

const useStyles = makeStyles((theme: Theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  title: {
    fontFamily: 'Helvetica',
    fontWeight: "bold",
    fontSize: 45,
    textAlign: "center"    
  },
  blink: {
    letterSpacing: 2,
    fontSize: 20,
    textAlign: "center",
    fontFamily: "monospace",
    marginBottom: theme.spacing(4)
  }
}));

const Home: NextPage = () => {
  const classes = useStyles();

  return (
    <AdminLayout title="Home">
      <Container>
        <Fade bottom duration={1000} delay={500} distance="30px">
          <h1 className={classes.title}>U of M Women in Computer Science</h1>
        </Fade>
          <p className={classes.blink}>
            <Typical
              steps={[
                "We are women in computer science.",
                1000,
                "We are problem solvers.",
                1000,
                "We are developers.",
                1000,
                "We support equality in STEM.",
                1000
              ]}
              loop={Infinity}
              wrapper="p"
            />
          </p>
      </Container>
        

      <Carousel>
      <Carousel.Item>
        <div className="carouselcontainer">
          <img className="d-block w-100 cropped" src="img/main/ubisoft-group.jpg"/>
          <div class="bottom-right">
          <h2>MENTOR MINGLE</h2>
          <h1>Ubisoft</h1>
          <p>2019 WINTER</p> 
          <Button variant="contained" color="secondary" href="#contained-buttons">See more</Button>
            </div>
          </div>
        </Carousel.Item>
      <Carousel.Item>
        <div className="carouselcontainer">
          <img className="d-block w-100 cropped" src="img/main/ubisoft-clap.jpg"/>
          <div class="bottom-right">
          <h2>MENTOR MINGLE</h2>
          <h1>Ubisoft</h1>
          <p>2019 WINTER</p> 
          <Button variant="contained" color="secondary" href="#contained-buttons">See more</Button>
            </div>
          </div>
        </Carousel.Item>
        <Carousel.Item>
        <div className="carouselcontainer">
        <img className="d-block w-100 cropped" src="img/main/amazon-talk.jpg"/>
        <div class="bottom-right">
        <h2>Thinkbox Intro Event</h2>
          <h1>AWS</h1>
          <p>2020 WINTER</p> 
          <Button variant="contained" color="secondary" href="#contained-buttons">See more</Button>
            </div>
          </div>
        </Carousel.Item>
        <Carousel.Item>
        <div className="carouselcontainer">
          <img className="d-block w-100 cropped" src="img/main/amazon-group.jpg"/>
          <div class="bottom-right">
          <h2>Thinkbox Intro Event</h2>
          <h1>AWS</h1>
          <p>2020 WINTER</p> 
          <Button variant="contained" color="secondary" href="#contained-buttons">See more</Button>
            </div>
          </div>
        </Carousel.Item>
        <Carousel.Item>
        <div className="carouselcontainer">
        <img className="d-block w-100 cropped" src="img/main/skip-clap.jpg"/>
                  <div class="top-left">
          <h2>MENTOR MINGLE</h2>
          <h1>SkipTheDishes</h1>
          <p>2020 WINTER</p> 
          <Button variant="contained" color="secondary" href="#contained-buttons">See more</Button>
            </div>
          </div>
        </Carousel.Item>
      </Carousel>

      <Container>
        <div className={classes.paper}>
          <Fade bottom duration={1000} delay={500} distance="30px">
            <iframe
              frameBorder="0"
              width="100%"
              height="500vh"
              src="https://www.youtube.com/embed/646jjiejsuA"
            ></iframe>
          </Fade>
        </div>
      </Container>

    </AdminLayout>
  );
};

export default Home;
