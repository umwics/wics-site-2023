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
import React from "react";
import { useAuth } from "../lib/auth";

interface Props {
    onClick?: (event: React.MouseEvent) => any;
    onKeyDown?: (event: React.KeyboardEvent) => any;
}

const useStyles = makeStyles((theme: Theme) => ({
    toolbar: {
        ...theme.mixins.toolbar,
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
    list: {
        width: 250
    },
    group: {
        borderLeft: `1px dashed ${fade(theme.palette.text.primary, 0.4)}`,
        marginLeft: theme.spacing(3)
    }
}));

const DrawerAdminContent: React.FC<Props> = ({ onClick, onKeyDown }: Props) => {
    const classes = useStyles();
    const auth = useAuth();

    const [collectionsOpen, setCollectionsOpen] = React.useState(true);
    const [apiOpen, setApiOpen] = React.useState(true);

    return (
        <div className={classes.list} role="presentation">
            <List
                component="nav"
                subheader={
                    <ListSubheader
                        className={classes.toolbar}
                        component="div"
                        id="nested-list-subheader"
                    >
                        <Link href="/" passHref>
                            <MuiLink component="a" color="inherit" variant="h6">
                                UMWics Admin
                            </MuiLink>
                        </Link>
                    </ListSubheader>
                }
            >
                <Divider />
                {auth?.user && (
                    <React.Fragment>
                        <ListItem button onClick={() => setCollectionsOpen(!collectionsOpen)}>
                            <ListItemIcon>
                                <CollectionsBookmark />
                            </ListItemIcon>
                            <ListItemText primary="Collections" />
                            {collectionsOpen ? <ExpandLess /> : <ExpandMore />}
                        </ListItem>
                        <Collapse
                            in={collectionsOpen}
                            className={classes.group}
                            timeout="auto"
                            unmountOnExit
                        >
                            <List
                                component="div"
                                onClick={onClick}
                                onKeyDown={onKeyDown}
                                dense
                                disablePadding
                            >
                                {["users", "members", "companies", "events"].map(text => (
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
                <Collapse in={apiOpen} className={classes.group} timeout="auto" unmountOnExit>
                    <List
                        component="div"
                        onClick={onClick}
                        onKeyDown={onKeyDown}
                        dense
                        disablePadding
                    >
                        <Link href="/docs/[[...slug]]" as="/docs" passHref>
                            <ListItem button component="a">
                                <ListItemText primary="Overview" />
                            </ListItem>
                        </Link>
                        {["users", "members", "companies", "events"].map(text => (
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
