import { IconButton, SwipeableDrawer } from "@material-ui/core";
import { makeStyles, Theme } from "@material-ui/core/styles";
import { Menu } from "@material-ui/icons";
import React, { createContext, useCallback, useContext, useState } from "react";

export interface DrawerContextInstance {
    openDrawer: (event: React.KeyboardEvent | React.MouseEvent) => any;
    closeDrawer: (event: React.KeyboardEvent | React.MouseEvent) => any;
}

const DrawerContext = createContext<DrawerContextInstance>({} as DrawerContextInstance);

interface DrawerProviderProps {
    children: React.ReactNode;
}

const useStyles = makeStyles((theme: Theme) => ({
    menuButton: {
        marginRight: theme.spacing(2)
    }
}));

const Drawer: React.FC<DrawerProviderProps> = ({ children }: DrawerProviderProps) => {
    const classes = useStyles();

    const [open, setOpen] = useState(false);

    const toggleDrawer = useCallback(
        (event: React.KeyboardEvent | React.MouseEvent, open: boolean) => {
            if (
                event &&
                event.type === "keydown" &&
                ((event as React.KeyboardEvent).key === "Tab" ||
                    (event as React.KeyboardEvent).key === "Shift")
            ) {
                return;
            }

            setOpen(open);
        },
        []
    );

    const handleOpen = useCallback((event: React.KeyboardEvent | React.MouseEvent) => {
        toggleDrawer(event, true);
    }, []);

    const handleClose = useCallback((event: React.KeyboardEvent | React.MouseEvent) => {
        toggleDrawer(event, false);
    }, []);

    return (
        <DrawerContext.Provider
            value={{
                openDrawer: handleOpen,
                closeDrawer: handleClose
            }}
        >
            <IconButton
                className={classes.menuButton}
                onClick={handleOpen}
                edge="start"
                color="inherit"
                aria-label="menu"
            >
                <Menu />
            </IconButton>
            <SwipeableDrawer
                anchor="left"
                open={open}
                onClose={handleClose}
                onOpen={handleOpen}
                keepMounted
            >
                {children}
            </SwipeableDrawer>
        </DrawerContext.Provider>
    );
};

export const useDrawer = (): DrawerContextInstance => {
    return useContext(DrawerContext);
};

export default Drawer;
