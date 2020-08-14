import {
    Avatar,
    MenuItem,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    Typography
} from "@material-ui/core";
import { makeStyles, Theme } from "@material-ui/core/styles";
import Link from "next/link";
import React, { useState } from "react";
import { User } from "../interfaces";
import { useAuth } from "../lib/auth";
import { updateUser } from "../lib/db";
import { parseUserRole } from "../utils/parsers";

interface Props {
    users: User[];
}

const useStyles = makeStyles((theme: Theme) => ({
    tableContainer: {
        marginTop: theme.spacing(4)
    },
    table: {
        minWidth: theme.breakpoints.width("sm")
    },
    identification: {
        display: "flex",
        alignItems: "center",
        flexDirection: "row"
    },
    avatar: {
        marginRight: theme.spacing(2)
    }
}));

const UserList: React.FC<Props> = ({ users }: Props) => {
    const classes = useStyles();
    const auth = useAuth();

    const [visibleUsers, setVisibleUsers] = useState([...users]);

    const updateUserRole = async (event: React.ChangeEvent<HTMLInputElement>, user: User) => {
        const newUser = { ...user, role: parseUserRole(event.target.value) };

        await updateUser(user.id, newUser);
        setVisibleUsers([newUser, ...visibleUsers.filter(checkUser => checkUser.id !== user.id)]);
    };

    return (
        <TableContainer component={Paper} className={classes.tableContainer}>
            <Table className={classes.table} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Username</TableCell>
                        <TableCell align="right">Account Provider</TableCell>
                        <TableCell align="right">Email</TableCell>
                        <TableCell align="right">Role</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {visibleUsers.map(user => (
                        <TableRow hover key={user.id}>
                            <TableCell component="th" scope="row" align="center">
                                <div className={classes.identification}>
                                    <Avatar className={classes.avatar} src={user.avatarURL} />
                                    <Link href="/admin/users/[id]" as={`/admin/users/${user.id}`}>
                                        <a>
                                            <Typography>{user.username}</Typography>
                                        </a>
                                    </Link>
                                </div>
                            </TableCell>
                            <TableCell align="right">{user.provider}</TableCell>
                            <TableCell align="right">{user.email}</TableCell>
                            <TableCell align="right">
                                <TextField
                                    id="role-select"
                                    select
                                    value={user.role}
                                    onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                                        updateUserRole(event, user)
                                    }
                                    disabled={user.id === auth?.user?.id}
                                    variant="standard"
                                >
                                    {[
                                        { value: "owner", label: "Owner" },
                                        { value: "admin", label: "Admin" },
                                        { value: "user", label: "User" }
                                    ].map(option => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default UserList;
