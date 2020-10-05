import { AppBar, Button, Toolbar, Typography } from "@material-ui/core";
import { makeStyles, Theme } from "@material-ui/core/styles";
import { NextSeo } from "next-seo";
import Link from "next/link";
import React from "react";
import { useAuth } from "../../lib/auth";
import Drawer from "../Drawer";
import HideOnScroll from "../HideOnScroll";
import ToggleDarkMode from "../ToggleDarkMode";
import DrawerAdminContent from "./DrawerAdminContent";
import ProfileDropdown from "./ProfileDropdown";

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
    appbarmenu: {
        fontFamily: "Roboto"
    }
}));

const AdminHeader: React.FC<Props> = ({ title }: Props) => {
    const classes = useStyles();
    const auth = useAuth();

    return (
        <React.Fragment>
            <NextSeo title={title} />
            <HideOnScroll>
                <AppBar position="sticky" color="default" elevation={0} className={classes.appbar}>
                    <Toolbar>
                        <Drawer>
                            <DrawerAdminContent />
                        </Drawer>
                        <Typography component="h1" variant="h6" className={classes.title}>
                            {title}
                        </Typography>
                        <nav>
                            <Link href="/" passHref>
                                <Button
                                    component="a"
                                    color="inherit"
                                    className={classes.appbarmenu}
                                >
                                    Home
                                </Button>
                            </Link>
                            <Link href="/docs/[[...slug]]" as="/docs" passHref>
                                <Button
                                    component="a"
                                    color="inherit"
                                    className={classes.appbarmenu}
                                >
                                    Docs
                                </Button>
                            </Link>
                            {auth.user && (
                                <Link href="/admin" passHref>
                                    <Button
                                        component="a"
                                        color="inherit"
                                        className={classes.appbarmenu}
                                    >
                                        Admin
                                    </Button>
                                </Link>
                            )}
                            {!auth.user && (
                                <Link href="/login" passHref>
                                    <Button
                                        component="a"
                                        color="inherit"
                                        className={classes.appbarmenu}
                                    >
                                        Login
                                    </Button>
                                </Link>
                            )}
                        </nav>
                        <ToggleDarkMode />
                        {auth.user && <ProfileDropdown />}
                    </Toolbar>
                </AppBar>
            </HideOnScroll>
        </React.Fragment>
    );
};

export default AdminHeader;
