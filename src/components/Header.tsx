import { AppBar, Button, Toolbar, Typography } from "@material-ui/core";
import { makeStyles, Theme } from "@material-ui/core/styles";
import { NextSeo } from "next-seo";
import Link from "next/link";
import React from "react";
import { useAuth } from "../lib/auth";
import Drawer from "./Drawer";
import DrawerContent from "./DrawerContent";
import ProfileDropdown from "./ProfileDropdown";

interface Props {
    title?: string;
}

const useStyles = makeStyles((theme: Theme) => ({
    title: {
        flexGrow: 1
    },
    appbar: {
        backgroundColor: theme.palette.grey[50]
    },
    sectionDesktop: {
        display: "none",
        [theme.breakpoints.up("md")]: {
            display: "flex"
        }
    }
}));

const Header: React.FC<Props> = ({ title }: Props) => {
    const classes = useStyles();
    const auth = useAuth();

    return (
        <React.Fragment>
            <NextSeo title={title ? title + " | " + process.env.siteDisplayName : undefined} />

            <AppBar position="sticky" color="default" elevation={0} className={classes.appbar}>
                <Toolbar>
                    <Drawer content={DrawerContent} />
                    <Typography component="h1" variant="h6" className={classes.title}>
                        {title}
                    </Typography>
                    <nav className={classes.sectionDesktop}>
                        <Link href="/" passHref>
                            <Button component="a" color="inherit">
                                Home
                            </Button>
                        </Link>
                        <Link href="/about" passHref>
                            <Button component="a" color="inherit">
                                About
                            </Button>
                        </Link>
                        <Link href="/members" passHref>
                            <Button component="a" color="inherit">
                                Members
                            </Button>
                        </Link>
                        <Link href="/events" passHref>
                            <Button component="a" color="inherit">
                                Events
                            </Button>
                        </Link>
                        <Link href="/outreach" passHref>
                            <Button component="a" color="inherit">
                                Outreach
                            </Button>
                        </Link>
                        <Link href="/mentors" passHref>
                            <Button component="a" color="inherit">
                                Mentors
                            </Button>
                        </Link>
                        <Link href="/coop" passHref>
                            <Button component="a" color="inherit">
                                Co-op
                            </Button>
                        </Link>
                        <Link href="/resources" passHref>
                            <Button component="a" color="inherit">
                                Resources
                            </Button>
                        </Link>
                    </nav>
                    {auth?.user && <ProfileDropdown />}
                </Toolbar>
            </AppBar>
        </React.Fragment>
    );
};

export default Header;
