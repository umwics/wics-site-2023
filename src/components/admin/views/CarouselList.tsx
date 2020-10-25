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
import { Carousel, hasPermission } from "../../../interfaces";
import { useAuth } from "../../../lib/auth";

interface Props {
    carousels: Carousel[];
    editCarousel?: (carousel: Carousel) => any;
    deleteCarousel?: (carousel: Carousel) => any;
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
    slideGroup: {
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

const CarouselList: React.FC<Props> = ({ carousels, editCarousel, deleteCarousel }: Props) => {
    const classes = useStyles();
    const auth = useAuth();

    return (
        <TableContainer component={Paper} className={classes.tableContainer}>
            <Table className={classes.table} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell align="right">Auto Play</TableCell>
                        <TableCell align="right">Indicators</TableCell>
                        <TableCell align="right">Interval</TableCell>
                        <TableCell align="right">Timeout</TableCell>
                        <TableCell align="right">Slides</TableCell>
                        <TableCell align="right"></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {carousels.map(carousel => (
                        <TableRow hover key={carousel.id}>
                            <TableCell component="th" scope="row" align="center">
                                <div className={classes.identification}>
                                    <Avatar
                                        className={classes.avatar}
                                        src={carousel.slides[0]?.image}
                                    />
                                    <Typography>{carousel.name}</Typography>
                                </div>
                            </TableCell>
                            <TableCell align="right">{carousel.autoplay.toString()}</TableCell>
                            <TableCell align="right">{carousel.indicators.toString()}</TableCell>
                            <TableCell align="right">{carousel.interval}</TableCell>
                            <TableCell align="right">{carousel.timeout}</TableCell>
                            <TableCell align="right">
                                <div className={classes.slideGroup}>
                                    <AvatarGroup max={3}>
                                        {carousel.slides.map((slide, idx) => {
                                            return (
                                                slide && (
                                                    <Tooltip
                                                        key={idx}
                                                        title={slide.title}
                                                        placement="top"
                                                    >
                                                        <Avatar alt={slide.alt} src={slide.image} />
                                                    </Tooltip>
                                                )
                                            );
                                        })}
                                    </AvatarGroup>
                                </div>
                            </TableCell>
                            <TableCell align="right">
                                {auth.user && hasPermission(auth.user, "write") && (
                                    <div className={classes.actions}>
                                        <Tooltip title="Edit" placement="top">
                                            <IconButton
                                                aria-label="edit"
                                                size="small"
                                                className={classes.edit}
                                                onClick={() =>
                                                    editCarousel && editCarousel(carousel)
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
                                                    deleteCarousel && deleteCarousel(carousel)
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

export default CarouselList;
