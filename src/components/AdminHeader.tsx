import { AppBar, Button, Toolbar, Typography } from "@material-ui/core";
import { makeStyles, Theme } from "@material-ui/core/styles";
import { NextSeo } from "next-seo";
import Link from "next/link";
import React from "react";
import { useAuth } from "../lib/auth";
import Drawer from "./Drawer";
import DrawerAdminContent from "./DrawerAdminContent";
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

const AdminHeader: React.FC<Props> = ({ title }: Props) => {
    const classes = useStyles();
    const auth = useAuth();

    return (
        <React.Fragment>
            <NextSeo title={title ? title + " | " + process.env.siteDisplayName : undefined} />
            <AppBar position="sticky" color="default" elevation={0} className={classes.style}>
                <Toolbar>
                    <Drawer content={DrawerAdminContent} />
                    <Typography component="h1" variant="h6" className={classes.title}>
                        {title}
                    </Typography>
                    <nav>
                        <Link href="/" passHref>
                            <Button component="a" color="inherit">
                                Home
                            </Button>
                        </Link>
                        <Link href="/docs/[[...slug]]" as="/docs" passHref>
                            <Button component="a" color="inherit">
                                Docs
                            </Button>
                        </Link>
                        {auth?.user && (
                            <Link href="/admin" passHref>
                                <Button component="a" color="inherit">
                                    Admin
                                </Button>
                            </Link>
                        )}
                        {!auth?.user && (
                            <Link href="/login" passHref>
                                <Button component="a" color="inherit">
                                    Login
                                </Button>
                            </Link>
                        )}
                    </nav>
                    {auth?.user && <ProfileDropdown />}
                </Toolbar>
            </AppBar>
        </React.Fragment>
    );
};

export default AdminHeader;
