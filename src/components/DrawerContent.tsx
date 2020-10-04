import {
    Collapse,
    Divider,
    Link as MuiLink,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    ListSubheader
} from "@material-ui/core";
import { fade, makeStyles, Theme } from "@material-ui/core/styles";
import { Cloud, ExpandLess, ExpandMore, Pages } from "@material-ui/icons";
import Link from "next/link";
import React, { useState } from "react";
import { useDrawer } from "./Drawer";

const useStyles = makeStyles((theme: Theme) => ({
    toolbar: {
        ...theme.mixins.toolbar,
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
    title: {
        color: theme.palette.text.secondary,
        marginBottom: theme.spacing(0.5),
        "&:hover": {
            color: theme.palette.primary.main
        }
    },
    list: {
        width: 250
    },
    group: {
        borderLeft: `1px dashed ${fade(theme.palette.text.primary, 0.4)}`,
        marginLeft: theme.spacing(3)
    }
}));

const pages = ["about", "members", "events", "outreach", "mentors", "coop", "resources"];

const DrawerContent: React.FC = () => {
    const { closeDrawer } = useDrawer();
    const classes = useStyles();

    const [pagesOpen, setPagesOpen] = useState(true);

    return (
        <div className={classes.list} role="presentation">
            <List
                component="nav"
                subheader={
                    <ListSubheader
                        id="nested-list-subheader"
                        className={classes.toolbar}
                        component="div"
                        disableSticky
                    >
                        <Link href="/" passHref>
                            <MuiLink
                                component="a"
                                className={classes.title}
                                onClick={closeDrawer}
                                color="inherit"
                                variant="subtitle1"
                            >
                                UMWics
                            </MuiLink>
                        </Link>
                    </ListSubheader>
                }
            >
                <Divider />
                <ListItem button onClick={() => setPagesOpen(!pagesOpen)}>
                    <ListItemIcon>
                        <Pages />
                    </ListItemIcon>
                    <ListItemText primary="Pages" />
                    {pagesOpen ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse in={pagesOpen} className={classes.group} timeout="auto">
                    <List
                        component="div"
                        onClick={closeDrawer}
                        onKeyDown={closeDrawer}
                        dense
                        disablePadding
                    >
                        <Link href="/" passHref>
                            <ListItem button component="a">
                                <ListItemText primary="Home" />
                            </ListItem>
                        </Link>
                        {pages.map(page => (
                            <Link key={page} href={`/${page}`} passHref>
                                <ListItem button component="a">
                                    <ListItemText primary={page} />
                                </ListItem>
                            </Link>
                        ))}
                    </List>
                </Collapse>
                <Link href="/docs/[[...slug]]" as="/docs" passHref>
                    <ListItem button component="a">
                        <ListItemIcon>
                            <Cloud />
                        </ListItemIcon>
                        <ListItemText primary="API" />
                    </ListItem>
                </Link>
            </List>
        </div>
    );
};

export default DrawerContent;
