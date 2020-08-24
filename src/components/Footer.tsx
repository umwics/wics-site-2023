import { faFacebook, faInstagram, faSlack } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { makeStyles, Theme } from "@material-ui/core/styles";
import React from "react";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";

const useStyles = makeStyles((theme: Theme) => ({
    footer: {
        marginTop: "auto"
    },
    footerContainer: {
        paddingTop: theme.spacing(4),
        backgroundColor: "#333333",
        marginTop: theme.spacing(4)
    }
}));

const Footer: React.FC = () => {
    const classes = useStyles();

    return (
        <footer className={classes.footer}>
            <div className={classes.footerContainer}>
                <Container className="footer">
                    <Row>
                        <Col>
                            <p>Copyright © University of Manitoba Women in Computer Science</p>
                        </Col>
                        <Col>
                            <ul className="list-reset">
                                <li>
                                    <a href="mailto:uofmwics@gmail.com" className="black-link">
                                        <span aria-label="Email">
                                            {" "}
                                            <FontAwesomeIcon icon={faEnvelope} />{" "}
                                        </span>
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="https://umwics.slack.com/"
                                        className="black-link"
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        <span aria-label="Slack">
                                            {" "}
                                            <FontAwesomeIcon icon={faSlack} />
                                        </span>
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="https://www.facebook.com/umwics"
                                        className="black-link"
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        <span aria-label="Facebook">
                                            {" "}
                                            <FontAwesomeIcon icon={faFacebook} />
                                        </span>
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="https://instagram.com/umwics"
                                        className="black-link"
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        <span aria-label="Instagram">
                                            {" "}
                                            <FontAwesomeIcon icon={faInstagram} />
                                        </span>
                                    </a>
                                </li>
                            </ul>
                        </Col>
                    </Row>
                </Container>
            </div>
        </footer>
    );
};

export default Footer;
