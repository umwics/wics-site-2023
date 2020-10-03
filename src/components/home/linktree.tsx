import { Link } from "@material-ui/core";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import React from "react";
import Calendar from "../events/calendar";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: "100%"
        },
        heading: {
            fontSize: theme.typography.pxToRem(15),
            flexBasis: "33.33%",
            flexShrink: 0
        },
        secondaryHeading: {
            fontSize: theme.typography.pxToRem(15),
            color: theme.palette.text.secondary
        },
        thirdHeading: {
            align: "center"
        }
    })
);

export default function ControlledAccordions() {
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState<string | false>(false);

    // eslint-disable-next-line @typescript-eslint/ban-types
    const handleChange = (panel: string) => (event: React.ChangeEvent<{}>, isExpanded: boolean) => {
        setExpanded(isExpanded ? panel : false);
    };

    return (
        <div className={classes.root}>
            <Accordion expanded={expanded === "panel1"} onChange={handleChange("panel1")}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1bh-content"
                    id="panel1bh-header"
                >
                    <Typography className={classes.heading}>All links</Typography>
                    <Typography className={classes.secondaryHeading}>Linktree</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography className={classes.thirdHeading}>
                        Discover our upcoming events, scholarship, etc! &nbsp;&nbsp;
                        <Link href="https://linktr.ee/umwics" target="_blank" rel="noreferrer">
                            https://linktr.ee/umwics
                        </Link>
                    </Typography>
                </AccordionDetails>
            </Accordion>
            <Accordion expanded={expanded === "panel2"} onChange={handleChange("panel2")}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2bh-content"
                    id="panel2bh-header"
                >
                    <Typography className={classes.heading}>Communication</Typography>
                    <Typography className={classes.secondaryHeading}>Slack</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        Join us on Slack!&nbsp;&nbsp;
                        <Link href="https://umwics.slack.com/" target="_blank" rel="noreferrer">
                            https://umwics.slack.com/
                        </Link>
                    </Typography>
                </AccordionDetails>
            </Accordion>
            <Accordion expanded={expanded === "panel3"} onChange={handleChange("panel3")}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel3bh-content"
                    id="panel3bh-header"
                >
                    <Typography className={classes.heading}>Social</Typography>
                    <Typography className={classes.secondaryHeading}>Instagram</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography className={classes.thirdHeading}>
                        Follow us on Instagram!&nbsp;&nbsp;
                        <Link href="https://instagram.com/umwics" target="_blank" rel="noreferrer">
                            https://instagram.com/umwics
                        </Link>
                    </Typography>
                </AccordionDetails>
            </Accordion>
            <Accordion expanded={expanded === "panel4"} onChange={handleChange("panel4")}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel4bh-content"
                    id="panel4bh-header"
                >
                    <Typography className={classes.heading}>Social</Typography>
                    <Typography className={classes.secondaryHeading}>Facebook</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography className={classes.thirdHeading}>
                        Follow us on Facebook!&nbsp;&nbsp;
                        <Link
                            href="https://www.facebook.com/umwics"
                            target="_blank"
                            rel="noreferrer"
                        >
                            https://www.facebook.com/umwics
                        </Link>
                    </Typography>
                </AccordionDetails>
            </Accordion>

            <Accordion expanded={expanded === "panel5"} onChange={handleChange("panel5")}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel5bh-content"
                    id="panel5bh-header"
                >
                    <Typography className={classes.heading}>Social</Typography>
                    <Typography className={classes.secondaryHeading}>
                        UM Computer Science Discord
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography className={classes.thirdHeading}>
                        UManitoba Computer Science Discord Signup Use this form to gain access to
                        the University of Manitoba Computer Science Discord server!&nbsp;&nbsp;
                        <Link
                            href="https://docs.google.com/forms/d/e/1FAIpQLScGRauKBaXhVEFI9d1nqAh4ezSWhBMbMnXqaX4gqr0XPTyr6Q/viewform"
                            target="_blank"
                            rel="noreferrer"
                        >
                            UM CS Discord Signup
                        </Link>
                    </Typography>
                </AccordionDetails>
            </Accordion>

            <Accordion expanded={expanded === "panel6"} onChange={handleChange("panel6")}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel6bh-content"
                    id="panel6bh-header"
                >
                    <Typography className={classes.heading}>Calendar</Typography>
                    <Typography className={classes.secondaryHeading}>Events Calendar</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography className={classes.thirdHeading}>
                        Checkout our upcoming events!&nbsp;&nbsp;
                        <Calendar />
                    </Typography>
                </AccordionDetails>
            </Accordion>
        </div>
    );
}
