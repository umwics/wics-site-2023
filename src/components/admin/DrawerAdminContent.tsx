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
import { Cloud, CollectionsBookmark, ExpandLess, ExpandMore } from "@material-ui/icons";
import Link from "next/link";
import React, { useState } from "react";
import { useAuth } from "../../lib/auth";
import { useDrawer } from "../Drawer";

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

const collections = ["users", "members", "companies", "events", "resources", "carousels"];
const apiDocs = ["users", "members", "companies", "events", "resources", "carousels"];

const DrawerAdminContent: React.FC = () => {
    const { closeDrawer } = useDrawer();
    const classes = useStyles();
    const auth = useAuth();

    const [collectionsOpen, setCollectionsOpen] = useState(true);
    const [apiOpen, setApiOpen] = useState(true);

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
                                UMWics Admin
                            </MuiLink>
                        </Link>
                    </ListSubheader>
                }
            >
                <Divider />
                {auth.user && (
                    <React.Fragment>
                        <ListItem button onClick={() => setCollectionsOpen(!collectionsOpen)}>
                            <ListItemIcon>
                                <CollectionsBookmark />
                            </ListItemIcon>
                            <ListItemText primary="Collections" />
                            {collectionsOpen ? <ExpandLess /> : <ExpandMore />}
                        </ListItem>
                        <Collapse in={collectionsOpen} className={classes.group} timeout="auto">
                            <List
                                component="div"
                                onClick={closeDrawer}
                                onKeyDown={closeDrawer}
                                dense
                                disablePadding
                            >
                                {collections.map(text => (
                                    <Link key={text} href={`/admin/${text}`} passHref>
                                        <ListItem button component="a">
                                            <ListItemText primary={text} />
                                        </ListItem>
                                    </Link>
                                ))}
                            </List>
                        </Collapse>
                    </React.Fragment>
                )}
                <ListItem button onClick={() => setApiOpen(!apiOpen)}>
                    <ListItemIcon>
                        <Cloud />
                    </ListItemIcon>
                    <ListItemText primary="API" />
                    {apiOpen ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse in={apiOpen} className={classes.group} timeout="auto">
                    <List
                        component="div"
                        onClick={closeDrawer}
                        onKeyDown={closeDrawer}
                        dense
                        disablePadding
                    >
                        <Link href="/docs/[[...slug]]" as="/docs" passHref>
                            <ListItem button component="a">
                                <ListItemText primary="Overview" />
                            </ListItem>
                        </Link>
                        {apiDocs.map(text => (
                            <Link key={text} href="/docs/[[...slug]]" as={`/docs/${text}`} passHref>
                                <ListItem button component="a">
                                    <ListItemText primary={text} />
                                </ListItem>
                            </Link>
                        ))}
                    </List>
                </Collapse>
            </List>
        </div>
    );
};

export default DrawerAdminContent;
