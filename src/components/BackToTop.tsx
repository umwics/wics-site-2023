import { Fab, useScrollTrigger, Zoom } from "@material-ui/core";
import { makeStyles, Theme } from "@material-ui/core/styles";
import { KeyboardArrowUp } from "@material-ui/icons";
import React from "react";

interface Props {
    window?: () => Window;
}

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        position: "fixed",
        bottom: theme.spacing(2),
        right: theme.spacing(2)
    },
    anchor: {
        position: "absolute",
        visibility: "hidden",
        top: 0
    }
}));

const useFabStyles = makeStyles((theme: Theme) => ({
    root: {
        "& $label": {
            transition: "0.3s cubic-bezier(0.47, 1.64, 0.41, 0.8)"
        },
        "&:hover": {
            "& $label": {
                transform: "scale(1.3)"
            }
        }
    },
    label: {
        color: theme.palette.secondary.contrastText
    }
}));

const BackToTop: React.FC<Props> = ({ window }: Props) => {
    const classes = useStyles();
    const fabClasses = useFabStyles();

    const trigger = useScrollTrigger({
        target: window ? window() : undefined,
        disableHysteresis: true,
        threshold: 100
    });

    const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
        const anchor = ((event.target as HTMLDivElement).ownerDocument || document).querySelector(
            "#back-to-top-anchor"
        );

        if (anchor) {
            anchor.scrollIntoView({ behavior: "smooth", block: "center" });
        }
    };

    return (
        <React.Fragment>
            <div id="back-to-top-anchor" className={classes.anchor} />
            <Zoom in={trigger}>
                <div onClick={handleClick} role="presentation" className={classes.root}>
                    <Fab
                        classes={fabClasses}
                        color="secondary"
                        size="small"
                        aria-label="scroll back to top"
                    >
                        <KeyboardArrowUp />
                    </Fab>
                </div>
            </Zoom>
        </React.Fragment>
    );
};

export default BackToTop;
