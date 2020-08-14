import {
    IconButton,
    ListItemIcon,
    ListItemText,
    Menu,
    MenuItem,
    Tooltip,
    Typography
} from "@material-ui/core";
import { AccountCircle, ExitToApp } from "@material-ui/icons";
import { useRouter } from "next/router";
import React from "react";
import { useAuth } from "../lib/auth";

const ProfileDropdown: React.FC = () => {
    const router = useRouter();
    const auth = useAuth();

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div>
            <Tooltip
                title={
                    <React.Fragment>
                        <Typography component="h5" variant="subtitle1">
                            {auth?.user?.provider} Account
                        </Typography>
                        <Typography component="h6" variant="subtitle2">
                            {auth?.user?.username}
                        </Typography>
                        <Typography component="h6" variant="subtitle2">
                            {auth?.user?.email}
                        </Typography>
                    </React.Fragment>
                }
            >
                <IconButton
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={handleMenu}
                    color="inherit"
                >
                    <AccountCircle />
                </IconButton>
            </Tooltip>
            <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                    vertical: "top",
                    horizontal: "right"
                }}
                keepMounted
                transformOrigin={{
                    vertical: "top",
                    horizontal: "right"
                }}
                open={open}
                onClose={handleClose}
            >
                <MenuItem onClick={handleClose}>
                    <ListItemIcon>
                        <AccountCircle />
                    </ListItemIcon>
                    <ListItemText>Profile</ListItemText>
                </MenuItem>
                <MenuItem
                    onClick={() => {
                        auth?.signout();
                        handleClose();
                        router.push("/");
                    }}
                    color="inherit"
                >
                    <ListItemIcon>
                        <ExitToApp />
                    </ListItemIcon>
                    <ListItemText>Sign out</ListItemText>
                </MenuItem>
            </Menu>
        </div>
    );
};

export default ProfileDropdown;
