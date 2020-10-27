import { Link } from "@material-ui/core";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import React from "react";
import { LinkTree as ILinkTree } from "../../interfaces";

interface Props {
    linktree: ILinkTree;
}

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

const LinkTree: React.FC<Props> = ({ linktree }: Props) => {
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
