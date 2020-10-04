import {
    Avatar,
    Divider,
    Grid,
    IconButton,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    ListSubheader,
    Popover,
    Tooltip,
    Typography
} from "@material-ui/core";
import { fade, makeStyles, Theme } from "@material-ui/core/styles";
import { AccountCircle, ExitToApp, SupervisorAccount } from "@material-ui/icons";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useAuth } from "../../lib/auth";
import Link from "../Link";

const useStyles = makeStyles((theme: Theme) => ({
    subheader: {
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(1),
        color: theme.palette.text.primary,
        backgroundColor: theme.palette.background.paper
    }
}));

const usePopoverStyles = makeStyles((theme: Theme) => ({
    paper: {
        backgroundColor: fade(theme.palette.background.paper, 0.95)
    }
}));

const useAvatarStyles = makeStyles((theme: Theme) => ({
    colorDefault: {
        color: theme.palette.text.primary,
        backgroundColor: "transparent"
    }
}));

const ProfileDropdown: React.FC = () => {
    const router = useRouter();
    const classes = useStyles();
    const popoverClasses = usePopoverStyles();
    const avatarClasses = useAvatarStyles();
    const auth = useAuth();

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const subheader = (
        <ListSubheader
            id="list-subheader"
            className={classes.subheader}
            component="div"
            disableSticky
        >
            <Grid container spacing={4}>
                <Grid item xs={3}>
                    <Avatar
                        classes={avatarClasses}
                        src={auth.user?.avatarURL}
                        alt={auth.user?.username}
                    >
                        <AccountCircle />
                    </Avatar>
                </Grid>
                <Grid item xs={9}>
                    <Typography component="h3" variant="h6" gutterBottom>
                        {auth.user?.username}
                    </Typography>
                    <Typography
                        component="h4"
                        variant="subtitle2"
                        color="textSecondary"
                        gutterBottom
                    >
                        {auth.user?.email}
                    </Typography>
                    <Typography
                        component="h4"
                        variant="subtitle2"
                        color="textSecondary"
                        gutterBottom
                    >
                        {auth.user?.provider} Account
                    </Typography>
                </Grid>
            </Grid>
        </ListSubheader>
    );

    return (
        <React.Fragment>
            <Tooltip title="Profile">
                <IconButton
                    aria-label="account of current user"
                    aria-controls="profile-dropdown"
                    aria-haspopup="true"
                    onClick={handleMenu}
                >
                    <Avatar
                        classes={avatarClasses}
                        src={auth.user?.avatarURL}
                        alt={auth.user?.username}
                    >
                        <AccountCircle />
                    </Avatar>
                </IconButton>
            </Tooltip>
            <Popover
                id="profile-dropdown"
                classes={popoverClasses}
                open={open}
                anchorEl={anchorEl}
                anchorOrigin={{
                    vertical: "top",
                    horizontal: "left"
                }}
                transformOrigin={{
                    vertical: "top",
                    horizontal: "right"
                }}
                onClose={handleClose}
                keepMounted
            >
                <List component="nav" aria-labelledby="list-subheader" subheader={subheader}>
                    <Divider />
                    <ListItem
                        component={Link}
                        href="/admin/users/[id]"
                        as={`/admin/users/${auth.user?.id}`}
                        onClick={handleClose}
                        button
                    >
                        <ListItemIcon>
                            <AccountCircle />
                        </ListItemIcon>
                        <ListItemText>Profile</ListItemText>
                    </ListItem>
                    <ListItem component={Link} href={`/admin`} onClick={handleClose} button>
                        <ListItemIcon>
                            <SupervisorAccount />
                        </ListItemIcon>
                        <ListItemText>Admin</ListItemText>
                    </ListItem>
                    <ListItem
                        onClick={() => {
                            auth.signout();
                            handleClose();
                            router.push("/");
                        }}
                        color="inherit"
                        button
                    >
                        <ListItemIcon>
                            <ExitToApp />
                        </ListItemIcon>
                        <ListItemText>Sign out</ListItemText>
                    </ListItem>
                </List>
            </Popover>
        </React.Fragment>
    );
};

export default ProfileDropdown;
