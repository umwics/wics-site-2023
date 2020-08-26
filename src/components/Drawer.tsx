import { IconButton, SwipeableDrawer } from "@material-ui/core";
import { makeStyles, Theme } from "@material-ui/core/styles";
import { Menu } from "@material-ui/icons";
import React from "react";

interface Props {
    content: React.ComponentType<{
        onClick?: (event: React.MouseEvent) => any;
        onKeyDown?: (event: React.KeyboardEvent) => any;
    }>;
}

const useStyles = makeStyles((theme: Theme) => ({
    menuButton: {
        marginRight: theme.spacing(2)
    }
}));

const Drawer: React.FC<Props> = ({ content: DrawerContent }: Props) => {
    const classes = useStyles();

    const [open, setOpen] = React.useState(false);

    const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
        if (
            event &&
            event.type === "keydown" &&
            ((event as React.KeyboardEvent).key === "Tab" ||
                (event as React.KeyboardEvent).key === "Shift")
        ) {
            return;
        }

        setOpen(open);
    };

    return (
        <React.Fragment>
            <IconButton
                className={classes.menuButton}
                onClick={toggleDrawer(true)}
                edge="start"
                color="inherit"
                aria-label="menu"
            >
                <Menu />
            </IconButton>
            <SwipeableDrawer
                anchor="left"
                open={open}
                onClose={toggleDrawer(false)}
                onOpen={toggleDrawer(true)}
            >
                <DrawerContent onClick={toggleDrawer(false)} onKeyDown={toggleDrawer(false)} />
            </SwipeableDrawer>
        </React.Fragment>
    );
};

export default Drawer;
