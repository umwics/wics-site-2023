import { makeStyles, Theme } from "@material-ui/core/styles";
import { NextPage } from "next";
import React from "react";

const useStyles = makeStyles((theme: Theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        alignContent: "center"
    },

    responsiveCal: {
        position: "relative",
        paddingBottom: "75%",
        height: 0,
        overflow: "hidden",
        "& iframe": {
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%"
        }
    }
}));

const calendar: NextPage = () => {
    const classes = useStyles();

    return (
        <div className={classes.responsiveCal}>
            <iframe
                src="https://calendar.google.com/calendar/embed?src=jgn1g4ku9fs1pv3pr08t405amo%40group.calendar.google.com&amp;ctz=America%2FWinnipeg"
                width="800"
                height="600"
                frameBorder="0"
                scrolling="no"
            ></iframe>
        </div>
    );
};

export default calendar;
