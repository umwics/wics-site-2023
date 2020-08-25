import { AppBar, Button, makeStyles, Theme, Toolbar, Typography } from "@material-ui/core";
import { NextSeo } from "next-seo";
import Link from "next/link";
import React from "react";
import { useAuth } from "../lib/auth";
import Drawer from "./Drawer";
import ProfileDropdown from "./ProfileDropdown";

interface Props {
    title?: string;
}

const useStyles = makeStyles((theme: Theme) => ({
    title: {
        flexGrow: 1
    },
    style: {
        backgroundColor: theme.palette.grey[50]
    }
}));

const Header: React.FC<Props> = ({ title }: Props) => {
    const classes = useStyles();
    const auth = useAuth();

    return (
        <React.Fragment>
            <NextSeo title={title ? title + " | " + process.env.siteDisplayName : undefined} />

            <AppBar position="sticky" color="default" elevation={0} className={classes.style}>
                <Toolbar>
                    <Drawer />
                    <Typography component="h1" variant="h6" className={classes.title}>
                        {title}
                    </Typography>
                    <nav>
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
                        <Link href="/admin" passHref>
                            <Button component="a" color="inherit">
                                Admin
                            </Button>
                        </Link>
                        <Link href="/login" passHref>
                            <Button component="a" color="inherit">
                                Login
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
