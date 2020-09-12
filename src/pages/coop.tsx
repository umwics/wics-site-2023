import { Container} from "@material-ui/core";
import { makeStyles, Theme } from "@material-ui/core/styles";
import { NextPage } from "next";
import React from "react";
import ContentsLayout from "../components/layouts/ContentsLayout";
import Card from "react-bootstrap/Card";
import CardGroup from "react-bootstrap/CardGroup";
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
                    <div className="coopTitle">
                        <h2>University of Manitoba Co-operative Education</h2>
                    </div>
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
                            <Card.Title>Amazon</Card.Title>
                                <Card.Text>
                                Amazon.com, Inc. (/ˈæməzɒn/), is an American multinational technology company based in Seattle, Washington. Amazon focuses on e-commerce, cloud computing, digital streaming, and artificial intelligence. It is considered one of the Big Four technology companies, along with Google, Apple, and Facebook
                                </Card.Text>
                            <Button variant="primary">More Details</Button>
                        </Card.Body>
                    </Card>
                    <Card style={{ width: '18rem' }}>
                        <Card.Img variant="top" src="img\coop\Blackberry.png" />
                        <Card.Body>
                            <Card.Title>BlackBerry</Card.Title>
                                <Card.Text>
                                BlackBerry Ltd. engages in the provision of security software and services to enterprises and governments. It offers cybersecurity consulting, enterprise consulting, endpoint management, and unified endpoint security
                                </Card.Text>
                            <Button variant="primary">More Details</Button>
                        </Card.Body>
                    </Card>
                    <Card style={{ width: '18rem' }}>
                        <Card.Img variant="top" src="img\coop\bold-icon.png" />
                        <Card.Body>
                            <Card.Title>Bold e-commerce</Card.Title>
                                <Card.Text>
                                Bold Commerce is a software development company that provides industry-leading eCommerce solutions for the world's most innovative brands. We empower entrepreneurs by providing them with tools they can use to make their eCommerce stores truly awesome
                                </Card.Text>
                            <Button variant="primary">More Details</Button>
                        </Card.Body>
                    </Card>
                    <Card style={{ width: '18rem' }}>
                        <Card.Img variant="top" src="img\coop\d2l.png" />
                        <Card.Body>
                            <Card.Title>Desire 2 Learn</Card.Title>
                                <Card.Text>
                                D2L is a global software company with offices in the United States, Canada, Singapore, Australia, Europe, and Brazil. It is the developer of the Brightspace learning management system, which is a cloud-based software used by schools, higher education, and businesses for online and blended classroom learning
                                </Card.Text>
                            <Button variant="primary">More Details</Button>
                        </Card.Body>
                    </Card>
                
                    <Card style={{ width: '18rem' }}>
                        <Card.Img variant="top" src="img\coop\google.png" />
                        <Card.Body>
                            <Card.Title>Google</Card.Title>
                                <Card.Text>
                                Google, LLC is an American multinational technology company that specializes in Internet-related services and products, which include online advertising technologies, a search engine, cloud computing, software, and hardware
                                </Card.Text>
                            <Button variant="primary">More Details</Button>
                        </Card.Body>
                    </Card>
                </CardGroup>

                <CardGroup>
                    <Card style={{ width: '18rem' }}>
                        <Card.Img variant="top" src="img\coop\hydro.png" />
                        <Card.Body>
                            <Card.Title>Manitoba Hydro</Card.Title>
                                <Card.Text>
                                Manitoba Hydro is a Crown Corporation and the province's major energy utility. From our head office in downtown Winnipeg, Manitoba, Canada, we: serve 586,795 electric customers in Manitoba and 284,996 natural gas customers in southern Manitoba; are one of the lowest cost providers of electricity in Canada
                                </Card.Text>
                            <Button variant="primary">More Details</Button>
                        </Card.Body>
                    </Card>
                    <Card style={{ width: '18rem' }}>
                        <Card.Img variant="top" src="img\coop\invenia-logo.png" />
                        <Card.Body>
                            <Card.Title>Invenia</Card.Title>
                                <Card.Text>
                                Invenia's Energy Intelligence System is a cloud-based machine learning platform that uses big, high frequency data to solve complex problems in real time. Invenia currently applies its platform to optimize electric utility operations as well as electricity markets themselves
                                </Card.Text>
                            <Button variant="primary">More Details</Button>
                        </Card.Body>
                    </Card>
                    <Card style={{ width: '18rem' }}>
                        <Card.Img variant="top" src="img\coop\iqmetrix.png" />
                        <Card.Body>
                            <Card.Title>iQMetrix</Card.Title>
                                <Card.Text>
                                iQmetrix is the leading provider of retail management and interactive retail solutions for wireless industry. You can find our innovative software changing the customer experience in stores across North America, including WirelessWave, Walmart Canada, Cricket (AT&T) and Loblaws
                                </Card.Text>
                            <Button variant="primary">More Details</Button>
                        </Card.Body>
                    </Card>
                    <Card style={{ width: '18rem' }}>
                        <Card.Img variant="top" src="img\coop\johnston-group.jpg" />
                        <Card.Body>
                            <Card.Title>Johnston Group</Card.Title>
                                <Card.Text>
                                Johnston Group is a 'third party administrator', a company that specializes in group benefit programs. The concept behind a Third Party Administrator (TPA) is that an insurance company cannot be all things to all people. The Company's line of business includes providing management consulting services
                                </Card.Text>
                            <Button variant="primary">More Details</Button>
                        </Card.Body>
                    </Card>
                    <Card style={{ width: '18rem' }}>
                        <Card.Img variant="top" src="img\coop\MasterOfCode.png" />
                        <Card.Body>
                            <Card.Title>Master of Code</Card.Title>
                                <Card.Text>
                                Your full-service software partner in developing and maintaining the web, mobile applications, and chatbots. From hot startups to established enterprise companies - now anyone can get an elite team of engineers to build their next big thing
                                </Card.Text>
                            <Button variant="primary">More Details</Button>
                        </Card.Body>
                    </Card>
                </CardGroup>

                <CardGroup>
                    <Card style={{ width: '18rem' }}>
                        <Card.Img variant="top" src="img\coop\MB_Buffalo.png" />
                        <Card.Body>
                            <Card.Title>Government of Manitoba</Card.Title>
                                <Card.Text>
                                Manitoba is a prairie province located in the heart of Canada. Founded in 1870, Manitoba means “where the spirit lives” in the languages of the Indigenous people who first lived in the region. Commonly referred to as ‘Friendly Manitoba’, the province’s urban and rural communities are diverse and welcoming
                                </Card.Text>
                            <Button variant="primary">More Details</Button>
                        </Card.Body>
                    </Card>
                    <Card style={{ width: '18rem' }}>
                        <Card.Img variant="top" src="img\coop\mhi.png" />
                        <Card.Body>
                            <Card.Title>Manitoba Hydro International</Card.Title>
                                <Card.Text>
                                Manitoba Hydro International Ltd. (MHI) assists power utilities, governments, and private sector clients around the world in the efficient, effective, and sustainable delivery of electricity and natural gas
                                </Card.Text>
                            <Button variant="primary">More Details</Button>
                        </Card.Body>
                    </Card>
                    <Card style={{ width: '18rem' }}>
                        <Card.Img variant="top" src="img\coop\payworks.png" />
                        <Card.Body>
                            <Card.Title>PayWorks</Card.Title>
                                <Card.Text>
                                Payworks is a leading expert in the field of total workforce management solutions, providing cloud-based Payroll, Human Resources, Employee Time and Absence Management to businesses across Canada
                                </Card.Text>
                            <Button variant="primary">More Details</Button>
                        </Card.Body>
                    </Card>
                    <Card style={{ width: '18rem' }}>
                        <Card.Img variant="top" src="img\coop\phac.png" />
                        <Card.Body>
                            <Card.Title>Public Health Agency of Canada</Card.Title>
                                <Card.Text>
                                The Public Health Agency of Canada empowers Canadians to improve their health. In partnership with others, its activities focus on preventing disease and injuries, promoting good physical and mental health, and providing information to support informed decision making. It values scientific excellence and provides national leadership in response to public health threats
                                </Card.Text>
                            <Button variant="primary">More Details</Button>
                        </Card.Body>
                    </Card>
                    <Card style={{ width: '18rem' }}>
                        <Card.Img variant="top" src="img\coop\priceline-partner-network.png" />
                        <Card.Body>
                            <Card.Title>Priceline</Card.Title>
                                <Card.Text>
                                Priceline.com is an online travel agency for finding discount rates for travel-related purchases such as airline tickets and hotel stays. The company facilitates the provision of travel services from its suppliers to its clients
                                </Card.Text>
                            <Button variant="primary">More Details</Button>
                        </Card.Body>
                    </Card>
                </CardGroup>

                <CardGroup>
                    <Card style={{ width: '18rem' }}>
                        <Card.Img variant="top" src="img\coop\rbc.png" />
                        <Card.Body>
                            <Card.Title>RBC Financial</Card.Title>
                                <Card.Text>
                                One of North America's leading diversified financial services companies, and provide personal and commercial banking, wealth management, insurance, investor services and capital markets products and services on a global basis
                                </Card.Text>
                            <Button variant="primary">More Details</Button>
                        </Card.Body>
                    </Card>
                    <Card style={{ width: '18rem' }}>
                        <Card.Img variant="top" src="img\coop\shopify.png" />
                        <Card.Body>
                            <Card.Title>Shopify</Card.Title>
                                <Card.Text>
                                Shopify, Inc. operates a cloud-based commerce platform designed for small and medium-sized businesses. Its software is used by merchants to run business across all sales channels, including web, tablet and mobile storefronts, social media storefronts, and brick-and-mortar and pop-up shops
                                </Card.Text>
                            <Button variant="primary">More Details</Button>
                        </Card.Body>
                    </Card>
                    <Card style={{ width: '18rem' }}>
                        <Card.Img variant="top" src="img\coop\Ubisoft.png" />
                        <Card.Body>
                            <Card.Title>Ubisoft</Card.Title>
                                <Card.Text>
                                Ubisoft is a publishing and distribution company of interactive entertainment products worldwide. In 1989, Ubisoft released its first game called “Zombi”. It produces, publishes, and distributes video games for consoles, PCs, smart phones, and tablets in physical and digital formats worldwide
                                </Card.Text>
                            <Button variant="primary">More Details</Button>
                        </Card.Body>
                    </Card>
                    <Card style={{ width: '18rem' }}>
                        <Card.Img variant="top" src="img\coop\varian.png" />
                        <Card.Body>
                            <Card.Title>Varian Medical Systems</Card.Title>
                                <Card.Text>
                                Varian Medical Systems (VAR) is an American radiation oncology treatments and software maker based in Palo Alto, California. Their medical devices include linear accelerators and software for treating cancer and other medical conditions with radiotherapy, radiosurgery, proton therapy, and brachytherapy
                                </Card.Text>
                            <Button variant="primary">More Details</Button>
                        </Card.Body>
                    </Card>
                    <Card style={{ width: '18rem' }}>
                        <Card.Img variant="top" src="img\coop\wawanesa.png" />
                        <Card.Body>
                            <Card.Title>Wawanesa</Card.Title>
                                <Card.Text>
                                Wawanesa Insurance is a Canadian mutual company owned by its policyholders. It is one of the largest property and casualty insurers in Canada
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
