import { Typography } from "@material-ui/core";
import { makeStyles, Theme } from "@material-ui/core/styles";
import React from "react";

interface Props {
    className?: string;
    largeSrc: string;
    smallSrc: string;
}

const useCalendarStyles = makeStyles((_theme: Theme) => ({
    calendar: {
        marginTop: 30,
        marginBottom: 30,
        alignItems: "center",
        justifyContent: "center"
    },
    calendarSmall: {
        display: "none",
        "@media (min-width:800px)": {
            display: "none"
        },
        "@media (max-width:800px)": {
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            marginTop: 30,
            marginBottom: 30
        }
    },
    calendarLarge: {
        display: "none",
        "@media (min-width:800px)": {
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            marginTop: 30,
            marginBottom: 30
        },
        "@media (max-width:800px)": {
            display: "none"
        }
    },
    outline: {
        textAlign: "center",
        backgroundColor: "#00bfa5",
        borderRadius: 2,
        height: 4,
        width: 40,
        marginBottom: 25
    },
    centered: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    }
}));

const Calendar: React.FC<Props> = ({ className, largeSrc, smallSrc }: Props) => {
    const classes = useCalendarStyles();

    return (
        <div id="calendar" className={className}>
            <Typography component="h3" variant="h3" align="center" color="textPrimary" gutterBottom>
                Calendar
            </Typography>
            <div className={classes.centered}>
                <div className={classes.outline}></div>
            </div>
            <div className={classes.calendarLarge}>
                <iframe
                    src={largeSrc}
                    width="800"
                    height="600"
                    frameBorder="0"
                    scrolling="no"
                ></iframe>
            </div>

            <div className={classes.calendarSmall}>
                <iframe
                    src={smallSrc}
                    width="80%"
                    height="600"
                    frameBorder="0"
                    scrolling="no"
                ></iframe>
            </div>
        </div>
    );
};

export default Calendar;
