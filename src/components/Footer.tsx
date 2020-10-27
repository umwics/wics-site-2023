import { faFacebook, faInstagram, faSlack } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Box, Container, Grid, Link as MuiLink, Typography } from "@material-ui/core";
import { makeStyles, Theme } from "@material-ui/core/styles";
import Link from "next/link";
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
    },
    footerLinks: {
        marginTop: theme.spacing(5),
        paddingTop: theme.spacing(3),
        paddingBottom: theme.spacing(3),
        [theme.breakpoints.up("sm")]: {
            paddingTop: theme.spacing(4),
            paddingBottom: theme.spacing(6)
        }
    }
}));

const footers = [
    {
        title: "ABOUT US",
        description: [
            { name: "About WICS", link: "/about" },
            { name: "Members", link: "/members" },
            { name: "Join us", link: "/about#joinus" },
            { name: "Contact us", link: "/contact" }
        ]
    },
    {
        title: "EVENTS & PROGRAMS",
        description: [
            { name: "Event Calendar", link: "/events#calendar" },
            { name: "Mentor Mingle", link: "/events#mentorMingle" },
            { name: "Other Events", link: "/events#otherEvent" },
            { name: "Outreach", link: "/outreach" }
        ]
    },
    {
        title: "RESOURCES",
        description: [
            { name: "Co-op", link: "/coop" },
            { name: "CS Resources", link: "/resources" }
        ]
    },
    {
        title: "ADMIN",
        description: [
            { name: "API Docs", link: "/docs" },
            { name: "Login", link: "/login" }
        ]
    }
];

const Copyright: React.FC = () => {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {"Copyright © "}
            <MuiLink color="inherit" href="https://github.com/umwics/wics-site-2020/">
                University of Manitoba Women in Computer Science
            </MuiLink>{" "}
            {new Date().getFullYear()}
            {"."}
        </Typography>
    );
};

const SocialLinks: React.FC = () => {
    const classes = useStyles();
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            <MuiLink href="mailto:uofmwics@gmail.com">
                <span aria-label="Email" className={classes.icons}>
                    <FontAwesomeIcon icon={faEnvelope} />
                </span>
            </MuiLink>
            <MuiLink href="https://umwics.slack.com/" target="_blank" rel="noreferrer">
                <span aria-label="Slack" className={classes.icons}>
                    <FontAwesomeIcon icon={faSlack} />
                </span>
            </MuiLink>
            <MuiLink href="https://www.facebook.com/umwics" target="_blank" rel="noreferrer">
                <span aria-label="Facebook" className={classes.icons}>
                    <FontAwesomeIcon icon={faFacebook} />
                </span>
            </MuiLink>
            <MuiLink href="https://instagram.com/umwics" target="_blank" rel="noreferrer">
                <span aria-label="Instagram" className={classes.icons}>
                    <FontAwesomeIcon icon={faInstagram} />
                </span>
            </MuiLink>
        </Typography>
    );
};

const Footer: React.FC = () => {
    const classes = useStyles();

    return (
        <footer className={classes.footer}>
            <Container maxWidth="lg" component="footer" className={classes.subfooter}>
                <Container maxWidth="md" className={classes.footerLinks}>
                    <Grid container spacing={4} justify="space-evenly">
                        {footers.map(footer => (
                            <Grid item xs={6} sm={3} key={footer.title}>
                                <Typography variant="h6" color="textPrimary" gutterBottom>
                                    {footer.title}
                                </Typography>
                                <ul>
                                    {footer.description.map((item, idx) => (
                                        <li key={idx}>
                                            <Link href={item.link} passHref>
                                                <MuiLink
                                                    component="a"
                                                    variant="subtitle1"
                                                    color="textSecondary"
                                                >
                                                    {item.name}
                                                </MuiLink>
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </Grid>
                        ))}
                    </Grid>
                </Container>
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
