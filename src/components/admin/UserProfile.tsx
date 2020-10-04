import {
    Avatar,
    Button,
    Container,
    Divider,
    Grid,
    makeStyles,
    MenuItem,
    TextField,
    Theme,
    Typography
} from "@material-ui/core";
import { AccountCircle } from "@material-ui/icons";
import React from "react";
import { AuditLog, hasPermission, User, userRoleLabels } from "../../interfaces";
import { useAuth } from "../../lib/auth";
import { parseUserRole } from "../../utils/parsers";
import AuditLogs from "./AuditLogs";

interface Props {
    user: User;
    updateUser?: (user: User) => any;
    deleteUser?: (user: User) => any;
}

const useStyles = makeStyles((theme: Theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
    },
    profileDetails: {
        display: "flex",
        flexDirection: "column"
    },
    smallDivider: {
        margin: theme.spacing(1, 0)
    },
    divider: {
        margin: theme.spacing(2, 0)
    }
}));

const useAvatarStyles = makeStyles((theme: Theme) => ({
    root: {
        width: theme.spacing(8),
        height: theme.spacing(8),
        marginBottom: theme.spacing(2)
    },
    colorDefault: {
        color: theme.palette.text.primary,
        backgroundColor: "transparent"
    }
}));

// TODO: Create audit logs
const auditLogs: AuditLog[] = [
    {
        id: "1",
        executorId: "2gyYGeeIQYUGOCUOPrk1X8YAkkL2",
        action: "create",
        collection: "events",
        timestamp: "0"
    },
    {
        id: "2",
        executorId: "2gyYGeeIQYUGOCUOPrk1X8YAkkL2",
        action: "delete",
        collection: "members",
        timestamp: "1"
    }
];

const UserProfile: React.FC<Props> = ({ user, updateUser, deleteUser }: Props) => {
    const classes = useStyles();
    const avatarClasses = useAvatarStyles();
    const auth = useAuth();

    const manageUser = auth.user && hasPermission(auth.user, "manage");
    const manageDelete = auth.user?.id == user.id || manageUser;

    return (
        <Container component="main" maxWidth="md">
            <div className={classes.paper}>
                <Grid container spacing={4}>
                    <Grid container item md={3} xs={12} justify="center">
                        <div className={classes.profileDetails}>
                            <Avatar
                                classes={avatarClasses}
                                src={user.avatarURL}
                                alt={user.username}
                            >
                                <AccountCircle />
                            </Avatar>
                            <Typography component="h1" variant="h4" noWrap gutterBottom>
                                {user.username}
                            </Typography>
                            <Typography
                                component="h3"
                                variant="subtitle2"
                                color="textSecondary"
                                noWrap
                                gutterBottom
                            >
                                {user.email}
                            </Typography>
                            <Typography
                                component="h3"
                                variant="subtitle2"
                                color="textSecondary"
                                noWrap
                                gutterBottom
                            >
                                {user.provider} Account
                            </Typography>
                            <Divider className={classes.divider} light />
                            {manageUser ? (
                                <TextField
                                    id="role-select"
                                    className={classes.smallDivider}
                                    select
                                    value={user.role}
                                    onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                                        updateUser &&
                                        updateUser({
                                            ...user,
                                            role: parseUserRole(event.target.value)
                                        })
                                    }
                                    disabled={!manageUser}
                                    variant="standard"
                                >
                                    {Object.entries(userRoleLabels).map(([value, label]) => (
                                        <MenuItem key={value} value={value}>
                                            {label}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            ) : (
                                <Typography
                                    component="h2"
                                    variant="h6"
                                    color="textSecondary"
                                    noWrap
                                    gutterBottom
                                >
                                    {userRoleLabels[user.role]}
                                </Typography>
                            )}
                            {manageDelete && (
                                <Button
                                    className={classes.smallDivider}
                                    onClick={() => deleteUser && deleteUser({ ...user })}
                                    variant="outlined"
                                    color="secondary"
                                >
                                    Delete Account
                                </Button>
                            )}
                        </div>
                    </Grid>
                    <Grid item md={9} xs={12}>
                        <AuditLogs title={`Audit Logs`} logs={auditLogs} users={[user]} />
                    </Grid>
                </Grid>
            </div>
        </Container>
    );
};

export default UserProfile;
