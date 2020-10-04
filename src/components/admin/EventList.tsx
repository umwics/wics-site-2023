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
import { Delete, Edit, Event as EventIcon } from "@material-ui/icons";
import React from "react";
import { Event, hasPermission } from "../../interfaces";
import { useAuth } from "../../lib/auth";

interface Props {
    events: Event[];
    editEvent?: (event: Event) => any;
    deleteEvent?: (event: Event) => any;
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

const EventList: React.FC<Props> = ({ events, editEvent, deleteEvent }: Props) => {
    const classes = useStyles();
    const auth = useAuth();

    return (
        <TableContainer component={Paper} className={classes.tableContainer}>
            <Table className={classes.table} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell align="right">Title</TableCell>
                        <TableCell align="right">Term</TableCell>
                        <TableCell align="right">Location</TableCell>
                        <TableCell align="right"></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {events.map(event => (
                        <TableRow hover key={event.id}>
                            <TableCell component="th" scope="row" align="center">
                                <div className={classes.identification}>
                                    <Avatar className={classes.avatar} src={event.images[0]}>
                                        <EventIcon />
                                    </Avatar>
                                    <Typography>{event.name}</Typography>
                                </div>
                            </TableCell>
                            <TableCell align="right">{event.title}</TableCell>
                            <TableCell align="right">{event.term}</TableCell>
                            <TableCell align="right">{event.location}</TableCell>
                            <TableCell align="right">
                                {auth.user && hasPermission(auth.user, "write") && (
                                    <div className={classes.actions}>
                                        <Tooltip title="Edit" placement="top">
                                            <IconButton
                                                aria-label="edit"
                                                size="small"
                                                className={classes.edit}
                                                onClick={() => editEvent && editEvent(event)}
                                            >
                                                <Edit />
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip title="Delete" placement="top">
                                            <IconButton
                                                aria-label="delete"
                                                size="small"
                                                className={classes.delete}
                                                onClick={() => deleteEvent && deleteEvent(event)}
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

export default EventList;
