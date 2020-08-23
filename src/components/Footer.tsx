import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { makeStyles, Theme } from "@material-ui/core/styles";
import React from "react";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faFacebook, faSlack, faInstagram } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const useStyles = makeStyles((theme: Theme) => ({
    footer: {
        paddingTop: theme.spacing(4),
        backgroundColor: "#333333"
    }
}));

const Footer: React.FC = () => {
    const classes = useStyles();

    return (
        <footer className={classes.footer}>

            <Container className="footer">
                <Row>
                    <Col><p>
                        Copyright © University of Manitoba Women in Computer Science
                    </p></Col>
                    <Col><ul className="list-reset">
                        <li>
                            <a href="mailto:uofmwics@gmail.com" className="black-link"
                            ><span aria-label="Email"> <FontAwesomeIcon icon={faEnvelope} /> </span
                            ></a>
                        </li>
                        <li>
                            <a href="https://umwics.slack.com/" className="black-link" target="_blank"
                            ><span aria-label="Slack"> <FontAwesomeIcon icon={faSlack} /></span
                            ></a>
                        </li>
                        <li>
                            <a href="https://www.facebook.com/umwics" className="black-link" target="_blank"
                            ><span aria-label="Facebook"> <FontAwesomeIcon icon={faFacebook} /></span
                            ></a>
                        </li>
                        <li>
                            <a href="https://instagram.com/umwics" className="black-link" target="_blank"
                            ><span aria-label="Instagram"> <FontAwesomeIcon icon={faInstagram} /></span
                            ></a>
                        </li>
                    </ul></Col>
                </Row>
            </Container>
        </footer>
    );
};

export default Footer;
