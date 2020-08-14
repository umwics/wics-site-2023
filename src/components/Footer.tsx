import { makeStyles, Theme } from "@material-ui/core/styles";
import React from "react";

const useStyles = makeStyles((theme: Theme) => ({
    footer: {
        paddingTop: theme.spacing(8),
        marginTop: "auto"
    }
}));

const Footer: React.FC = () => {
    const classes = useStyles();

    return (
        <footer className={classes.footer}>
            <hr />
            <span>I&apos;m here to stay (Footer)</span>
        </footer>
    );
};

export default Footer;
