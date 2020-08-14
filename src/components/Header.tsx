import { AppBar, Button, makeStyles, Theme, Toolbar, Typography } from "@material-ui/core";
import { NextSeo } from "next-seo";
import { useRouter } from "next/router";
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
    const router = useRouter();
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
                        <Button onClick={() => router.push("/")} color="inherit">
                            Home
                        </Button>
                        <Button onClick={() => router.push("/admin")} color="inherit">
                            Admin
                        </Button>
                        <Button onClick={() => router.push("/login")} color="inherit">
                            Login
                        </Button>
                    </nav>
                    {auth?.user && <ProfileDropdown />}
                </Toolbar>
            </AppBar>
        </React.Fragment>
    );
};

export default Header;
