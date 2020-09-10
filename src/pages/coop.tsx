import { Container} from "@material-ui/core";
import { makeStyles, Theme } from "@material-ui/core/styles";
import { NextPage } from "next";
import React from "react";
import ContentsLayout from "../components/layouts/ContentsLayout";
import Card from "react-bootstrap/Card";
import CardGroup from "react-bootstrap/CardGroup";
//import CardColumns from "react-bootstrap/CardColumns";
import Button from "react-bootstrap/Button";

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
                    <p className="description">The <a href="http://coop.cs.umanitoba.ca/" target="_blank">Computer Science Co-op Program </a>
                        at the University of Manitoba provides students with a fantastic opportunity to
                        transform academic knowledge into real-world experience. The program has garnered much
                        success over the last few years and has become one of the university's largest co-op
                        programs securing an average of 180 placements per year. The program focuses on matching
                        students with employers for three four-month work terms. The list of companies ranges
                        from local Winnipeg-based start-ups to international corporations.
                    </p>
                </div>
            </Container>

            <Container component="main">
                <CardGroup>
                    <Card style={{ width: '18rem' }}>
                        <Card.Img variant="top" src="img\coop\amazon.png" />
                        <Card.Body>
                            <Card.Title>Card Title</Card.Title>
                                <Card.Text>
                                World's largest online
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
                        <Card.Img variant="top" src="img\coop\bold-icon.png" />
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
                        <Card.Img variant="top" src="img\coop\d2l.png" />
                        <Card.Body>
                            <Card.Title>Card Title</Card.Title>
                                <Card.Text>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque dolor, velit nobis maxime similique inventore accusantium rerum quae voluptates ducimus nulla natus eum error explicabo earum incidunt eligendi consequatur porro.
                                </Card.Text>
                            <Button variant="primary">More Details</Button>
                        </Card.Body>
                    </Card>
                
                    <Card style={{ width: '18rem' }}>
                        <Card.Img variant="top" src="img\coop\google.png" />
                        <Card.Body>
                            <Card.Title>Card Title</Card.Title>
                                <Card.Text>
                                World's largest online
                                </Card.Text>
                            <Button variant="primary">More Details</Button>
                        </Card.Body>
                    </Card>
                </CardGroup>

                <CardGroup>
                    <Card style={{ width: '18rem' }}>
                        <Card.Img variant="top" src="img\coop\hydro.png" />
                        <Card.Body>
                            <Card.Title>Card Title</Card.Title>
                                <Card.Text>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque dolor, velit nobis maxime similique inventore accusantium rerum quae voluptates ducimus nulla natus eum error explicabo earum incidunt eligendi consequatur porro.
                                </Card.Text>
                            <Button variant="primary">More Details</Button>
                        </Card.Body>
                    </Card>
                    <Card style={{ width: '18rem' }}>
                        <Card.Img variant="top" src="img\coop\invenia-logo.png" />
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
                        <Card.Img variant="top" src="img\coop\iqmetrix.png" />
                        <Card.Body>
                            <Card.Title>Card Title</Card.Title>
                                <Card.Text>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque dolor, velit nobis maxime similique inventore accusantium rerum quae voluptates ducimus nulla natus eum error explicabo earum incidunt eligendi consequatur porro.
                                </Card.Text>
                            <Button variant="primary">More Details</Button>
                        </Card.Body>
                    </Card>
                    <Card style={{ width: '18rem' }}>
                        <Card.Img variant="top" src="img\coop\johnston-group.jpg" />
                        <Card.Body>
                            <Card.Title>Card Title</Card.Title>
                                <Card.Text>
                                World's largest online
                                </Card.Text>
                            <Button variant="primary">More Details</Button>
                        </Card.Body>
                    </Card>
                    <Card style={{ width: '18rem' }}>
                        <Card.Img variant="top" src="img\coop\MasterOfCode.png" />
                        <Card.Body>
                            <Card.Title>Card Title</Card.Title>
                                <Card.Text>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque dolor, velit nobis maxime similique inventore accusantium rerum quae voluptates ducimus nulla natus eum error explicabo earum incidunt eligendi consequatur porro.
                                </Card.Text>
                            <Button variant="primary">More Details</Button>
                        </Card.Body>
                    </Card>
                </CardGroup>

                <CardGroup>
                    <Card style={{ width: '18rem' }}>
                        <Card.Img variant="top" src="img\coop\MB_Buffalo.png" />
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
                        <Card.Img variant="top" src="img\coop\mhi.png" />
                        <Card.Body>
                            <Card.Title>Card Title</Card.Title>
                                <Card.Text>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque dolor, velit nobis maxime similique inventore accusantium rerum quae voluptates ducimus nulla natus eum error explicabo earum incidunt eligendi consequatur porro.
                                </Card.Text>
                            <Button variant="primary">More Details</Button>
                        </Card.Body>
                    </Card>
                    <Card style={{ width: '18rem' }}>
                        <Card.Img variant="top" src="img\coop\payworks.png" />
                        <Card.Body>
                            <Card.Title>Card Title</Card.Title>
                                <Card.Text>
                                World's largest online
                                </Card.Text>
                            <Button variant="primary">More Details</Button>
                        </Card.Body>
                    </Card>
                    <Card style={{ width: '18rem' }}>
                        <Card.Img variant="top" src="img\coop\phac.png" />
                        <Card.Body>
                            <Card.Title>Card Title</Card.Title>
                                <Card.Text>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque dolor, velit nobis maxime similique inventore accusantium rerum quae voluptates ducimus nulla natus eum error explicabo earum incidunt eligendi consequatur porro.
                                </Card.Text>
                            <Button variant="primary">More Details</Button>
                        </Card.Body>
                    </Card>
                    <Card style={{ width: '18rem' }}>
                        <Card.Img variant="top" src="img\coop\priceline-partner-network.png" />
                        <Card.Body>
                            <Card.Title>Card Title</Card.Title>
                                <Card.Text>
                                Some quick example text to build on the card title and make up the bulk of
                                the card's content.
                                </Card.Text>
                            <Button variant="primary">More Details</Button>
                        </Card.Body>
                    </Card>
                </CardGroup>

                <CardGroup>
                    <Card style={{ width: '18rem' }}>
                        <Card.Img variant="top" src="img\coop\rbc.png" />
                        <Card.Body>
                            <Card.Title>Card Title</Card.Title>
                                <Card.Text>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque dolor, velit nobis maxime similique inventore accusantium rerum quae voluptates ducimus nulla natus eum error explicabo earum incidunt eligendi consequatur porro.
                                </Card.Text>
                            <Button variant="primary">More Details</Button>
                        </Card.Body>
                    </Card>
                    <Card style={{ width: '18rem' }}>
                        <Card.Img variant="top" src="img\coop\shopify.png" />
                        <Card.Body>
                            <Card.Title>Card Title</Card.Title>
                                <Card.Text>
                                World's largest online
                                </Card.Text>
                            <Button variant="primary">More Details</Button>
                        </Card.Body>
                    </Card>
                    <Card style={{ width: '18rem' }}>
                        <Card.Img variant="top" src="img\coop\Ubisoft.png" />
                        <Card.Body>
                            <Card.Title>Card Title</Card.Title>
                                <Card.Text>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque dolor, velit nobis maxime similique inventore accusantium rerum quae voluptates ducimus nulla natus eum error explicabo earum incidunt eligendi consequatur porro.
                                </Card.Text>
                            <Button variant="primary">More Details</Button>
                        </Card.Body>
                    </Card>
                    <Card style={{ width: '18rem' }}>
                        <Card.Img variant="top" src="img\coop\varian.png" />
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
                        <Card.Img variant="top" src="img\coop\wawanesa.png" />
                        <Card.Body>
                            <Card.Title>Card Title</Card.Title>
                                <Card.Text>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque dolor, velit nobis maxime similique inventore accusantium rerum quae voluptates ducimus nulla natus eum error explicabo earum incidunt eligendi consequatur porro.
                                </Card.Text>
                            <Button variant="primary">More Details</Button>
                        </Card.Body>
                    </Card>
                </CardGroup>

            </Container>
        </ContentsLayout>
    );
};

export default About;
