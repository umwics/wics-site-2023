import { faFacebook, faInstagram, faSlack } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Container, Grid, Link, Typography } from "@material-ui/core";
import { makeStyles, Theme } from "@material-ui/core/styles";
import React from "react";

const useStyles = makeStyles((theme: Theme) => ({
    footer: {
        marginTop: "auto",
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
        color: '#fff',
        backgroundColor: "#333333",
        marginTop: "auto"
    },
    alignRight: {
        textAlign: "right"
    },
    icons: {
        textAlign: "right",
        display: "inline",
        marginLeft: 10,
        fontSize: 24,
        textDecoration: "none",
        textDecorationLine: "none",
        cursor: "pointer",
        color: "#fff"
    }
}));

const Footer: React.FC = () => {
    const classes = useStyles();

    return (
        <footer className={classes.footer}>
            <Container>
                <Grid container spacing={2}>
                    <Grid item sm={6} xs={12}>
                        <p>Copyright © 2020 University of Manitoba Women in Computer Science</p>
                    </Grid>
                    <Grid item sm={6} xs={12}>
                        <Typography className={classes.alignRight}>
                            <Link href="mailto:uofmwics@gmail.com">
                                <span aria-label="Email" className={classes.icons}>
                                    <FontAwesomeIcon icon={faEnvelope} />
                                </span>
                            </Link>
                            <Link href="https://umwics.slack.com/" target="_blank" rel="noreferrer">
                                <span aria-label="Slack" className={classes.icons}>
                                    <FontAwesomeIcon icon={faSlack} />
                                </span>
                            </Link>
                            <Link
                                href="https://www.facebook.com/umwics"
                                target="_blank"
                                rel="noreferrer"
                            >
                                <span aria-label="Facebook" className={classes.icons}>
                                    <FontAwesomeIcon icon={faFacebook} />
                                </span>
                            </Link>
                            <Link
                                href="https://instagram.com/umwics"
                                target="_blank"
                                rel="noreferrer"
                            >
                                <span aria-label="Instagram" className={classes.icons}>
                                    <FontAwesomeIcon icon={faInstagram} />
                                </span>
                            </Link>
                        </Typography>
                    </Grid>
                </Grid>
            </Container>
        </footer>
    );
};

export default Footer;
