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

const useStyles = makeStyles((_theme: Theme) => ({
    title: {
        flexGrow: 1
    }
}));

const Header: React.FC<Props> = ({ title }: Props) => {
    const classes = useStyles();
    const auth = useAuth();

    return (
        <React.Fragment>
            <NextSeo title={title ? title + " | " + process.env.siteDisplayName : undefined} />

            <AppBar position="static">
                <Toolbar>
                    <Drawer />
                    <Typography variant="h6" className={classes.title}>
                        {title}
                    </Typography>
                    <nav>
                        <Link href="/" passHref>
                            <Button component="a" color="inherit">
                                Home
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
