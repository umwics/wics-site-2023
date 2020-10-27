import {
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
import { hasPermission, TreeLink } from "../../../interfaces";
import { useAuth } from "../../../lib/auth";

interface Props {
    socialLinks: TreeLink[];
    editSocialLink?: (socialLink: TreeLink) => any;
    deleteSocialLink?: (socialLink: TreeLink) => any;
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

const SocialLinkList: React.FC<Props> = ({
    socialLinks,
    editSocialLink,
    deleteSocialLink
}: Props) => {
    const classes = useStyles();
    const auth = useAuth();

    return (
        <TableContainer component={Paper} className={classes.tableContainer}>
            <Table className={classes.table} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Title</TableCell>
                        <TableCell align="right">Subheader</TableCell>
                        <TableCell align="right">Link Name</TableCell>
                        <TableCell align="right">Link</TableCell>
                        <TableCell align="right"></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {socialLinks.map(socialLink => (
                        <TableRow hover key={socialLink.id}>
                            <TableCell component="th" scope="row" align="center">
                                <Typography>{socialLink.title}</Typography>
                            </TableCell>
                            <TableCell align="right">{socialLink.subheader}</TableCell>
                            <TableCell align="right">{socialLink.linkName}</TableCell>
                            <TableCell align="right">{socialLink.linkHref}</TableCell>
                            <TableCell align="right">
                                {auth.user && hasPermission(auth.user, "write") && (
                                    <div className={classes.actions}>
                                        <Tooltip title="Edit" placement="top">
                                            <IconButton
                                                aria-label="edit"
                                                size="small"
                                                className={classes.edit}
                                                onClick={() =>
                                                    editSocialLink && editSocialLink(socialLink)
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
                                                    deleteSocialLink && deleteSocialLink(socialLink)
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

export default SocialLinkList;
