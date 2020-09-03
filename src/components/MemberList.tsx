import {
    Avatar,
    IconButton,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Tooltip,
    Typography
} from "@material-ui/core";
import { blue, red } from "@material-ui/core/colors";
import { makeStyles, Theme } from "@material-ui/core/styles";
import { Delete, Edit } from "@material-ui/icons";
import React from "react";
import { hasPermission, Member } from "../interfaces";
import { useAuth } from "../lib/auth";

interface Props {
    members: Member[];
    editMember?: (member: Member) => any;
    deleteMember?: (member: Member) => any;
}

const useStyles = makeStyles((theme: Theme) => ({
    tableContainer: {
        marginTop: theme.spacing(4)
    },
    table: {
        minWidth: theme.breakpoints.width("sm")
    },
    actions: {
        display: "inline-flex"
    },
    identification: {
        display: "flex",
        alignItems: "center",
        flexDirection: "row"
    },
    avatar: {
        marginRight: theme.spacing(2)
    },
    edit: {
        "&:hover": {
            color: blue["A700"]
        }
    },
    delete: {
        "&:hover": {
            color: red["A700"]
        }
    }
}));

const MemberList: React.FC<Props> = ({ members, editMember, deleteMember }: Props) => {
    const classes = useStyles();
    const auth = useAuth();

    return (
        <TableContainer component={Paper} className={classes.tableContainer}>
            <Table className={classes.table} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell align="right">Display Name</TableCell>
                        <TableCell align="right">Title</TableCell>
                        <TableCell align="right">Email</TableCell>
                        <TableCell align="right"></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {members.map(member => (
                        <TableRow hover key={member.id}>
                            <TableCell component="th" scope="row" align="center">
                                <div className={classes.identification}>
                                    <Avatar className={classes.avatar} src={member.image} />
                                    <Typography>{member.name}</Typography>
                                </div>
                            </TableCell>
                            <TableCell align="right">{member.displayName}</TableCell>
                            <TableCell align="right">{member.title}</TableCell>
                            <TableCell align="right">{member.email}</TableCell>
                            <TableCell align="right">
                                {auth?.user && hasPermission(auth?.user, "write") && (
                                    <div className={classes.actions}>
                                        <Tooltip title="Edit" placement="top">
                                            <IconButton
                                                aria-label="edit"
                                                size="small"
                                                className={classes.edit}
                                                onClick={() => editMember && editMember(member)}
                                            >
                                                <Edit />
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip title="Delete" placement="top">
                                            <IconButton
                                                aria-label="delete"
                                                size="small"
                                                className={classes.delete}
                                                onClick={() => deleteMember && deleteMember(member)}
                                            >
                                                <Delete />
                                            </IconButton>
                                        </Tooltip>
                                    </div>
                                )}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default MemberList;
