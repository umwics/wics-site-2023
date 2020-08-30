import { Container} from "@material-ui/core";
import { makeStyles, Theme } from "@material-ui/core/styles";
import { NextPage } from "next";
import React from "react";
import ContentsLayout from "../components/layouts/ContentsLayout";
import Card from "react-bootstrap/Card";
import CardDeck from "react-bootstrap/CardDeck";
import CardColumns from "react-bootstrap/CardColumns";
// import Card from '@material-ui/core/Card';
// import CardActions from '@material-ui/core/CardActions';
// import CardContent from '@material-ui/core/CardContent';
import Button from "react-bootstrap/Button";
// import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme: Theme) => ({
    paper: {
        marginTop: theme.spacing(8),
    },
    root: {
        minWidth: 275,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },

}));


const About: NextPage = () => {
    const classes = useStyles();

    return (
        <ContentsLayout title="Co-op">
            <Container component="main">
                <div className={classes.paper}>
                    <h1>Co-op</h1>
                    <p>The <a href="http://coop.cs.umanitoba.ca/" className="black-link" target="_blank">Computer Science Co-op Program </a>
                        at the University of Manitoba provides students with a fantastic opportunity to
                        transform academic knowledge into real-world experience. The program has garnered much
                        success over the last few years and has become one of the university's largest co-op
                        programs securing an average of 180 placements per year. The program focuses on matching
                        students with employers for three four-month work terms. The list of companies range
                        from local Winnipeg-based start-ups to international corporations.
                    </p>
                </div>
            </Container>

            <Container component="main">
                <CardDeck>
                    <Card style={{ width: '18rem' }}>
                        <Card.Img variant="top" src="img\coop\amazon.png" />
                        <Card.Body>
                            <Card.Title>Card Title</Card.Title>
                                <Card.Text>
                                Some quick example text to build on the card title and make up the bulk of
                                the card's content.
                                </Card.Text>
                            <Button variant="primary">More Details</Button>
                        </Card.Body>
                    </Card>
                    <Card style={{ width: '18rem' }}>
                        <Card.Img variant="top" src="img\coop\Blackberry.png" />
                        <Card.Body>
                            <Card.Title>Card Title</Card.Title>
                                <Card.Text>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque dolor, velit nobis maxime similique inventore accusantium rerum quae voluptates ducimus nulla natus eum error explicabo earum incidunt eligendi consequatur porro.
                                </Card.Text>
                            <Button variant="primary">More Details</Button>
                        </Card.Body>
                    </Card>
                    <Card style={{ width: '18rem' }}>
                        <Card.Img variant="top" src="img\coop\amazon.png" />
                        <Card.Body>
                            <Card.Title>Card Title</Card.Title>
                                <Card.Text>
                                Some quick example text to build on the card title and make up the bulk of
                                the card's content.
                                </Card.Text>
                            <Button variant="primary">More Details</Button>
                        </Card.Body>
                    </Card>
                    <Card style={{ width: '18rem' }}>
                        <Card.Img variant="top" src="img\coop\Blackberry.png" />
                        <Card.Body>
                            <Card.Title>Card Title</Card.Title>
                                <Card.Text>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque dolor, velit nobis maxime similique inventore accusantium rerum quae voluptates ducimus nulla natus eum error explicabo earum incidunt eligendi consequatur porro.
                                </Card.Text>
                            <Button variant="primary">More Details</Button>
                        </Card.Body>
                    </Card>
                </CardDeck>
            </Container>
        </ContentsLayout>
    );
};

export default About;
