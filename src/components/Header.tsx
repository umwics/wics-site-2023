import { AppBar, Button, Toolbar, Typography } from "@material-ui/core";
import { makeStyles, Theme } from "@material-ui/core/styles";
import { NextSeo } from "next-seo";
import Link from "next/link";
import React from "react";
import { useAuth } from "../lib/auth";
import ProfileDropdown from "./admin/ProfileDropdown";
import Drawer from "./Drawer";
import DrawerContent from "./DrawerContent";
import HideOnScroll from "./HideOnScroll";
import ToggleDarkMode from "./ToggleDarkMode";

interface Props {
    title?: string;
}

const useStyles = makeStyles((theme: Theme) => ({
    title: {
        flexGrow: 1,
        fontFamily: "Roboto",
        color: theme.palette.type === "dark" ? "#fff" : undefined
    },
    appbar: {
        backgroundColor: theme.palette.type === "light" ? "#fff" : undefined,
        borderBottom: `1px solid ${theme.palette.divider}`,
        boxShadow: "0 2px 6px 0 rgba(0,0,0,.12)",
        color: "#5f6368"
    },
    sectionDesktop: {
        display: "none",
        fontFamily: "Roboto",
        [theme.breakpoints.up("md")]: {
            display: "flex"
        }
    },
    appbarmenu: {
        fontFamily: "Roboto",
        fontSize: "14px",
        textTransform: "none",
        fontWeight: 400,
        color: theme.palette.type === "dark" ? "#fff" : undefined
    },
    logo: {
        width: "30px",
        marginRight: "10px",
        verticalAlign: "middle"
    }
}));

const Header: React.FC<Props> = ({ title }: Props) => {
    const classes = useStyles();
    const auth = useAuth();

    return (
        <React.Fragment>
            <NextSeo title={title} />
            <HideOnScroll>
                <AppBar position="sticky" color="default" elevation={0} className={classes.appbar}>
                    <Toolbar>
                        <Drawer>
                            <DrawerContent />
                        </Drawer>
                        <Typography component="h1" variant="h6" className={classes.title}>
                            <img className={classes.logo} src="favicon/favicon-32.png" />
                            {title}
                        </Typography>
                        <nav className={classes.sectionDesktop}>
                            <Link href="/" passHref>
                                <Button
                                    component="a"
                                    color="inherit"
                                    className={classes.appbarmenu}
                                >
                                    Home
                                </Button>
                            </Link>

                            <Link href="/about" passHref>
                                <Button
                                    component="a"
                                    color="inherit"
                                    className={classes.appbarmenu}
                                >
                                    About
                                </Button>
                            </Link>
                            <Link href="/members" passHref>
                                <Button
                                    component="a"
                                    color="inherit"
                                    className={classes.appbarmenu}
                                >
                                    Members
                                </Button>
                            </Link>
                            <Link href="/events" passHref>
                                <Button
                                    component="a"
                                    color="inherit"
                                    className={classes.appbarmenu}
                                >
                                    Events
                                </Button>
                            </Link>
                            <Link href="/outreach" passHref>
                                <Button
                                    component="a"
                                    color="inherit"
                                    className={classes.appbarmenu}
                                >
                                    Outreach
                                </Button>
                            </Link>
                            <Link href="/mentors" passHref>
                                <Button
                                    component="a"
                                    color="inherit"
                                    className={classes.appbarmenu}
                                >
                                    Mentors
                                </Button>
                            </Link>
                            <Link href="/coop" passHref>
                                <Button
                                    component="a"
                                    color="inherit"
                                    className={classes.appbarmenu}
                                >
                                    Co-op
                                </Button>
                            </Link>
                            <Link href="/resources" passHref>
                                <Button
                                    component="a"
                                    color="inherit"
                                    className={classes.appbarmenu}
                                >
                                    Resources
                                </Button>
                            </Link>
                            <Link href="/contact" passHref>
                                <Button
                                    component="a"
                                    color="inherit"
                                    className={classes.appbarmenu}
                                >
                                    Contact
                                </Button>
                            </Link>
                        </nav>
                        <ToggleDarkMode />
                        {auth.user && <ProfileDropdown />}
                    </Toolbar>
                </AppBar>
            </HideOnScroll>
        </React.Fragment>
    );
};

export default Header;
