import { makeStyles, Theme } from "@material-ui/core/styles";
import { NextPage } from "next";
import React from "react";

const useStyles = makeStyles((theme: Theme) => ({
    paper: {
        marginTop: theme.spacing(8),
    }
}));


const calendar: NextPage = () => {
    const classes = useStyles();

    return (

                <div className={classes.paper}>
                <div className="calendar calendar-large">
    <iframe
        src="https://calendar.google.com/calendar/b/1/embed?showTitle=0&amp;showCalendars=0&amp;height=600&amp;wkst=1&amp;bgcolor=%23FFFFFF&amp;src=uofmwics%40gmail.com&amp;color=%231B887A&amp;ctz=America%2FWinnipeg"
        width="800" height="600" frameBorder="0" scrolling="no"></iframe>
</div>

<div className="calendar calendar-small">
    <iframe
        src="https://calendar.google.com/calendar/b/1/embed?showTitle=0&amp;showPrint=0&amp;showTabs=0&amp;showCalendars=0&amp;showTz=0&amp;mode=AGENDA&amp;height=600&amp;wkst=1&amp;bgcolor=%23FFFFFF&amp;src=uofmwics%40gmail.com&amp;color=%231B887A&amp;ctz=America%2FWinnipeg"
        width="80%" height="600" frameBorder="0" scrolling="no"></iframe>
</div>

                </div>
    );
};

export default calendar;
