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
import { hasPermission, Resource, resourceTypeLabels } from "../../interfaces";
import { useAuth } from "../../lib/auth";

interface Props {
    resources: Resource[];
    editResource?: (resource: Resource) => any;
    deleteResource?: (resource: Resource) => any;
}

const useStyles = makeStyles((theme: Theme) => ({
    tableContainer: {
        marginTop: theme.spacing(4)
    },
    table: {
        minWidth: theme.breakpoints.width("sm"),
        tableLayout: "fixed",
        overflow: "hidden"
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

const ResourceList: React.FC<Props> = ({ resources, editResource, deleteResource }: Props) => {
    const classes = useStyles();
    const auth = useAuth();

    return (
        <TableContainer component={Paper} className={classes.tableContainer}>
            <Table className={classes.table} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell width="20%">Name</TableCell>
                        <TableCell align="right" width="20%">
                            Title
                        </TableCell>
                        <TableCell align="right" width="10%">
                            Type
                        </TableCell>
                        <TableCell align="right" width="40%">
                            Link
                        </TableCell>
                        <TableCell align="right" width="10%"></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {resources.map(resource => (
                        <TableRow hover key={resource.id}>
                            <TableCell component="th" scope="row" align="center">
                                <div className={classes.identification}>
                                    <Avatar className={classes.avatar} src={resource.image} />
                                    <Typography>{resource.name}</Typography>
                                </div>
                            </TableCell>
                            <TableCell align="right">{resource.title}</TableCell>
                            <TableCell align="right">
                                {resourceTypeLabels[resource.types[0]] || ""}
                            </TableCell>
                            <TableCell align="right">{resource.link}</TableCell>
                            <TableCell align="right">
                                {auth?.user && hasPermission(auth?.user, "write") && (
                                    <div className={classes.actions}>
                                        <Tooltip title="Edit" placement="top">
                                            <IconButton
                                                aria-label="edit"
                                                size="small"
                                                className={classes.edit}
                                                onClick={() =>
                                                    editResource && editResource(resource)
                                                }
                                            >
                                                <Edit />
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip title="Delete" placement="top">
                                            <IconButton
                                                aria-label="delete"
                                                size="small"
                                                className={classes.delete}
                                                onClick={() =>
                                                    deleteResource && deleteResource(resource)
                                                }
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

export default ResourceList;
