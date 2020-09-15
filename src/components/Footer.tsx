import { faFacebook, faInstagram, faSlack } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Box, Container, Link, Typography } from "@material-ui/core";
import { makeStyles, Theme } from "@material-ui/core/styles";
import React from "react";

const useStyles = makeStyles((theme: Theme) => ({
    alignCenter: {
        textAlign: "center"
    },
    icons: {
        textAlign: "right",
        display: "inline",
        marginLeft: 10,
        fontSize: 24,
        textDecoration: "none",
        textDecorationLine: "none",
        cursor: "pointer",
        color: "#5f6368"
    },
    "@global": {
        ul: {
            margin: 0,
            padding: 0,
            listStyle: "none"
        }
    },
    appBar: {
        borderBottom: `1px solid ${theme.palette.divider}`
    },
    toolbar: {
        flexWrap: "wrap"
    },
    toolbarTitle: {
        flexGrow: 1
    },
    link: {
        margin: theme.spacing(1, 1.5)
    },
    heroContent: {
        padding: theme.spacing(8, 0, 6)
    },
    cardHeader: {
        backgroundColor:
            theme.palette.type === "light" ? theme.palette.grey[200] : theme.palette.grey[700]
    },
    cardPricing: {
        display: "flex",
        justifyContent: "center",
        alignItems: "baseline",
        marginBottom: theme.spacing(2)
    },
    footer: {
        marginTop: "auto",
        paddingTop: theme.spacing(3),
        paddingBottom: theme.spacing(3),
        [theme.breakpoints.up("md")]: {
            paddingTop: theme.spacing(6),
            paddingBottom: theme.spacing(6)
        }
    },
    subfooter: {
        borderTop: `1px solid ${theme.palette.divider}`
    }
}));

const Copyright: React.FC = () => {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {"Copyright © "}
            <Link color="inherit" href="https://github.com/umwics/wics-site-2020/">
                University of Manitoba Women in Computer Science
            </Link>{" "}
            {new Date().getFullYear()}
            {"."}
        </Typography>
    );
};

const SocialLinks: React.FC = () => {
    const classes = useStyles();
    return (
        <Typography variant="body2" color="textSecondary" align="center">
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
            <Link href="https://www.facebook.com/umwics" target="_blank" rel="noreferrer">
                <span aria-label="Facebook" className={classes.icons}>
                    <FontAwesomeIcon icon={faFacebook} />
                </span>
            </Link>
            <Link href="https://instagram.com/umwics" target="_blank" rel="noreferrer">
                <span aria-label="Instagram" className={classes.icons}>
                    <FontAwesomeIcon icon={faInstagram} />
                </span>
            </Link>
        </Typography>
    );
};

const Footer: React.FC = () => {
    const classes = useStyles();

    return (
        <footer className={classes.footer}>
            <Container maxWidth="lg" component="footer" className={classes.subfooter}>
                <Box mt={5}>
                    <SocialLinks />
                </Box>
                <Box mt={5}>
                    <Copyright />
                </Box>
            </Container>
        </footer>
    );
};

export default Footer;
