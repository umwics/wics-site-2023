import { AppBar, Button, Toolbar, Typography } from "@material-ui/core";
import { makeStyles, Theme } from "@material-ui/core/styles";
import { NextSeo } from "next-seo";
import Link from "next/link";
import React from "react";
import { useAuth } from "../lib/auth";
import ProfileDropdown from "./admin/ProfileDropdown";
import Drawer from "./Drawer";
import DrawerContent from "./DrawerContent";
import ToggleDarkMode from "./ToggleDarkMode";

interface Props {
    title?: string;
}

const useStyles = makeStyles((theme: Theme) => ({
    title: {
        flexGrow: 1,
        fontFamily: "Roboto"
    },
    appbar: {
        backgroundColor: theme.palette.type === "light" ? "#fff" : undefined,
        borderBottom: `1px solid ${theme.palette.divider}`
    },
    sectionDesktop: {
        display: "none",
        fontFamily: "Roboto",
        [theme.breakpoints.up("md")]: {
            display: "flex"
        }
    },
    appbarmenu: {
        fontFamily: "Roboto"
    }
}));

const Header: React.FC<Props> = ({ title }: Props) => {
    const classes = useStyles();
    const auth = useAuth();

    return (
        <React.Fragment>
            <NextSeo title={title} />
            <AppBar position="sticky" color="default" elevation={0} className={classes.appbar}>
                <Toolbar>
                    <Drawer content={DrawerContent} />
                    <Typography component="h1" variant="h6" className={classes.title}>
                        {title}
                    </Typography>
                    <nav className={classes.sectionDesktop}>
                        <Link href="/" passHref>
                            <Button component="a" color="inherit" className={classes.appbarmenu}>
                                Home
                            </Button>
                        </Link>
                        <Link href="/about" passHref>
                            <Button component="a" color="inherit" className={classes.appbarmenu}>
                                About
                            </Button>
                        </Link>
                        <Link href="/members" passHref>
                            <Button component="a" color="inherit" className={classes.appbarmenu}>
                                Members
                            </Button>
                        </Link>
                        <Link href="/events" passHref>
                            <Button component="a" color="inherit" className={classes.appbarmenu}>
                                Events
                            </Button>
                        </Link>
                        <Link href="/outreach" passHref>
                            <Button component="a" color="inherit" className={classes.appbarmenu}>
                                Outreach
                            </Button>
                        </Link>
                        <Link href="/mentors" passHref>
                            <Button component="a" color="inherit" className={classes.appbarmenu}>
                                Mentors
                            </Button>
                        </Link>
                        <Link href="/coop" passHref>
                            <Button component="a" color="inherit" className={classes.appbarmenu}>
                                Co-op
                            </Button>
                        </Link>
                        <Link href="/resources" passHref>
                            <Button component="a" color="inherit" className={classes.appbarmenu}>
                                Resources
                            </Button>
                        </Link>
                    </nav>
                    <ToggleDarkMode />
                    {auth?.user && <ProfileDropdown />}
                </Toolbar>
            </AppBar>
        </React.Fragment>
    );
};

export default Header;
