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
import React from "react";

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

const DrawerContent: React.FC<Props> = ({ onClick, onKeyDown }: Props) => {
    const classes = useStyles();

    const [pagesOpen, setPagesOpen] = React.useState(true);

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
                <Collapse in={pagesOpen} className={classes.group} timeout="auto" unmountOnExit>
                    <List
                        component="div"
                        onClick={onClick}
                        onKeyDown={onKeyDown}
                        dense
                        disablePadding
                    >
                        <Link href="/" passHref>
                            <ListItem button component="a">
                                <ListItemText primary="Home" />
                            </ListItem>
                        </Link>
                        {[
                            "about",
                            "members",
                            "events",
                            "outreach",
                            "mentors",
                            "coop",
                            "resources"
                        ].map(page => (
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
