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
import { AvatarGroup } from "@material-ui/lab";
import React from "react";
import { Company, hasPermission, Member } from "../../interfaces";
import { useAuth } from "../../lib/auth";

interface Props {
    companies: Company[];
    members: Member[];
    editCompany?: (company: Company) => any;
    deleteCompany?: (company: Company) => any;
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
    memberGroup: {
        display: "flex",
        justifyContent: "flex-end"
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

const CompanyList: React.FC<Props> = ({
    companies,
    members,
    editCompany,
    deleteCompany
}: Props) => {
    const classes = useStyles();
    const auth = useAuth();

    return (
        <TableContainer component={Paper} className={classes.tableContainer}>
            <Table className={classes.table} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell align="right">Display Name</TableCell>
                        <TableCell align="right">Email</TableCell>
                        <TableCell align="right">Members</TableCell>
                        <TableCell align="right"></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {companies.map(company => (
                        <TableRow hover key={company.id}>
                            <TableCell component="th" scope="row" align="center">
                                <div className={classes.identification}>
                                    <Avatar className={classes.avatar} src={company.image} />
                                    <Typography>{company.name}</Typography>
                                </div>
                            </TableCell>
                            <TableCell align="right">{company.displayName}</TableCell>
                            <TableCell align="right">{company.email}</TableCell>
                            <TableCell align="right">
                                <div className={classes.memberGroup}>
                                    <AvatarGroup max={3}>
                                        {company.members.map(cmember => {
                                            const member = members.find(
                                                member => member.id === cmember.memberId
                                            );

                                            return (
                                                member && (
                                                    <Tooltip
                                                        key={member.id}
                                                        title={member.name}
                                                        placement="top"
                                                    >
                                                        <Avatar
                                                            alt={member.name}
                                                            src={member.image}
                                                        />
                                                    </Tooltip>
                                                )
                                            );
                                        })}
                                    </AvatarGroup>
                                </div>
                            </TableCell>
                            <TableCell align="right">
                                {auth?.user && hasPermission(auth?.user, "write") && (
                                    <div className={classes.actions}>
                                        <Tooltip title="Edit" placement="top">
                                            <IconButton
                                                aria-label="edit"
                                                size="small"
                                                className={classes.edit}
                                                onClick={() => editCompany && editCompany(company)}
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
                                                    deleteCompany && deleteCompany(company)
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

export default CompanyList;
