import { faFacebook, faInstagram, faSlack } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { makeStyles, Theme } from "@material-ui/core/styles";
import React from "react";

import {
    Container,
    Grid,
    Link,
    Typography
} from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) => ({
    footer: {
        paddingTop: theme.spacing(4),
        fontFamily: 'Lato',
        paddingBottom: theme.spacing(4),
        color: '#fff',
        backgroundColor: "#333333"
    },
    alignRight: {
        textAlign: 'right',
    },
    icons: {
        textAlign: 'right',
        display: 'inline',
        marginLeft: 10,
        fontSize: 24,
        textDecoration: 'none',
        textDecorationLine: 'none',
        cursor: 'pointer',
        color: '#fff'
    }

}));

const Footer: React.FC = () => {
    const classes = useStyles();

    return (
        <footer className={classes.footer}>
            <Container>
                <Grid container spacing={2}>

                    <Grid item xs>
                        <p>Copyright © 2020 University of Manitoba Women in Computer Science</p>
                    </Grid>
                        
                    <Grid item xs={6}>
                        <Typography className={classes.alignRight}>
                            <Link href="mailto:uofmwics@gmail.com"><span aria-label="Email" className={classes.icons}><FontAwesomeIcon icon={faEnvelope}/></span></Link>
                            <Link href="https://umwics.slack.com/" target="_blank" rel="noreferrer"><span aria-label="Slack" className={classes.icons}><FontAwesomeIcon icon={faSlack} /></span></Link>
                            <Link href="https://www.facebook.com/umwics" target="_blank" rel="noreferrer"><span aria-label="Facebook" className={classes.icons}><FontAwesomeIcon icon={faFacebook} /></span></Link>
                            <Link href="https://instagram.com/umwics" target="_blank" rel="noreferrer"><span aria-label="Instagram" className={classes.icons}><FontAwesomeIcon icon={faInstagram} /></span></Link>
                        </Typography>
                    </Grid>

                </Grid>
            </Container>
        </footer>
    );
};

export default Footer;
