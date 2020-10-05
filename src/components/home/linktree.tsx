import { Link } from "@material-ui/core";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import React from "react";
import { LinkTree as ILinkTree } from "../../interfaces";

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
            alignItems: "center"
        }
    })
);

const linktree: ILinkTree = {
    links: [
        {
            id: "1",
            title: "All links",
            subheader: "Linktree",
            body: "Discover our upcoming events, scholarship, etc!  ",
            linkName: "https://linktr.ee/umwics",
            linkHref: "https://linktr.ee/umwics"
        },
        {
            id: "2",
            title: "Communication",
            subheader: "Slack",
            body: "Join us on Slack!  ",
            linkName: "https://umwics.slack.com",
            linkHref: "https://umwics.slack.com"
        },
        {
            id: "3",
            title: "Social",
            subheader: "Instagram",
            body: "Follow us on Instagram!  ",
            linkName: "https://instagram.com/umwics",
            linkHref: "https://instagram.com/umwics"
        },
        {
            id: "4",
            title: "Social",
            subheader: "Facebook",
            body: "Follow us on Facebook!  ",
            linkName: "https://www.facebook.com/umwics",
            linkHref: "https://www.facebook.com/umwics"
        },
        {
            id: "5",
            title: "Social",
            subheader: "UM Computer Science Discord",
            body:
                "UManitoba Computer Science Discord Signup Use this form to gain access to the University of Manitoba Computer Science Discord server!  ",
            linkName: "UM CS Discord Signup",
            linkHref:
                "https://docs.google.com/forms/d/e/1FAIpQLScGRauKBaXhVEFI9d1nqAh4ezSWhBMbMnXqaX4gqr0XPTyr6Q/viewform"
        },
        {
            id: "6",
            title: "Calendar",
            subheader: "Events Calendar",
            body: "Checkout our upcoming events!  ",
            linkName: "Calendar",
            linkHref: "/events#calendar"
        }
    ]
};

const LinkTree: React.FC = () => {
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState<string | false>(false);

    const handleChange = (panel: string, isExpanded: boolean) => {
        setExpanded(isExpanded ? panel : false);
    };

    return (
        <div className={classes.root}>
            {linktree.links.map(treeLink => (
                <Accordion
                    key={treeLink.id}
                    expanded={expanded === treeLink.id}
                    onChange={(_event, isExpanded) => handleChange(treeLink.id, isExpanded)}
                >
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1bh-content"
                        id="panel1bh-header"
                    >
                        <Typography className={classes.heading}>{treeLink.title}</Typography>
                        <Typography className={classes.secondaryHeading}>
                            {treeLink.subheader}
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography className={classes.thirdHeading}>
                            {treeLink.body}
                            <Link href={treeLink.linkHref} target="_blank" rel="noreferrer">
                                {treeLink.linkName}
                            </Link>
                        </Typography>
                    </AccordionDetails>
                </Accordion>
            ))}
        </div>
    );
};

export default LinkTree;
