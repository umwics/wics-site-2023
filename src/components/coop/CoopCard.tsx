import {
    Avatar,
    Button,
    Card,
    CardActionArea,
    CardActions,
    CardContent,
    CardMedia,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText
} from "@material-ui/core";
import { makeStyles, Theme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { Close } from "@material-ui/icons";
import React, { useState } from "react";
import { Company, Member } from "../../interfaces";

interface Props {
    company: Company;
    members: Member[];
}

interface DialogProps {
    open: boolean;
    company: Company;
    members: Member[];
    onClose?: () => void;
}

const useStyles = makeStyles((theme: Theme) => ({
    card: {
        height: "100%",
        display: "flex",
        flexDirection: "column"
    },
    cardMedia: {
        paddingTop: "56.25%" // 16:9
    },
    cardContent: {
        flexGrow: 1
    },
    rootCard: {
        margin: theme.spacing(2)
    },
    cardbutton: {
        margin: theme.spacing(0.5)
    }
}));

const useDialogStyles = makeStyles((theme: Theme) => ({
    modalImgContainer: {
        overflow: "hidden",
        width: "100%",
        height: 150,
        alignContent: "center",
        marginBottom: 10,
        "& img": {
            width: "100%",
            height: 150,
            objectFit: "cover"
        }
    },
    root: {
        width: "100%",
        maxWidth: "80ch",
        backgroundColor: theme.palette.background.paper
    },
    inline: {
        display: "inline"
    },
    dialogTitle: {
        margin: 0,
        padding: theme.spacing(2)
    },
    closeButton: {
        position: "absolute",
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500]
    }
}));

const useDialogContentStyles = makeStyles((theme: Theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(2)
    }
}));

const useDialogActionsStyles = makeStyles((theme: Theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(1)
    }
}));

const CoopDialog: React.FC<DialogProps> = ({
    open,
    company,
    members,
    onClose: handleClose
}: DialogProps) => {
    const classes = useDialogStyles();
    const contentClasses = useDialogContentStyles();
    const actionsClasses = useDialogActionsStyles();

    return (
        <Dialog
            onClose={handleClose}
            aria-labelledby={`customized-dialog-title-${company.id}`}
            open={open}
        >
            <DialogTitle className={classes.dialogTitle}>
                <Typography variant="h6">{company.name}</Typography>
                <IconButton
                    aria-label="close"
                    className={classes.closeButton}
                    onClick={handleClose}
                >
                    <Close />
                </IconButton>
            </DialogTitle>
            <DialogContent classes={contentClasses} dividers>
                <Typography gutterBottom>
                    <div className={classes.modalImgContainer}>
                        <img src={company.image}></img>
                    </div>
                    {company.description}
                </Typography>
                <List className={classes.root}>
                    {company.members.map(cmember => {
                        const member = members.find(member => member.id === cmember.memberId);

                        return (
                            <ListItem key={cmember.memberId} alignItems="flex-start">
                                <ListItemAvatar>
                                    <Avatar src={member?.image} alt={member?.name} />
                                </ListItemAvatar>
                                <ListItemText
                                    primary={member?.name}
                                    secondary={
                                        <React.Fragment>
                                            <Typography
                                                component="span"
                                                variant="body2"
                                                className={classes.inline}
                                                color="textPrimary"
                                            >
                                                {cmember.term}
                                            </Typography>
                                            {" — Tools: "}
                                            {cmember.tools.join(", ")}
                                        </React.Fragment>
                                    }
                                />
                            </ListItem>
                        );
                    })}
                </List>
            </DialogContent>
            <DialogActions classes={actionsClasses}>
                <Button href={company.links[0]?.link} target="_blank" color="primary">
                    Read more about it
                </Button>
            </DialogActions>
        </Dialog>
    );
};

const CoopCard: React.FC<Props> = ({ company, members }: Props) => {
    const classes = useStyles();

    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <React.Fragment>
            <Card className={classes.rootCard}>
                <CardActionArea onClick={handleClickOpen}>
                    <CardMedia
                        className={classes.cardMedia}
                        image={company.image}
                        title={company.name}
                    />
                    <CardContent className={classes.cardContent}>
                        <Typography gutterBottom variant="h5" component="h2">
                            {company.name}
                        </Typography>
                        <Typography>{company.description}</Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions>
                    <div>
                        <span>
                            <Button
                                variant="outlined"
                                color="primary"
                                onClick={handleClickOpen}
                                className={classes.cardbutton}
                            >
                                More
                            </Button>
                        </span>
                        <Button
                            href={company.links[0]?.link}
                            variant="outlined"
                            color="primary"
                            target="_blank"
                            className={classes.cardbutton}
                        >
                            Website
                        </Button>
                    </div>
                </CardActions>
            </Card>
            <CoopDialog open={open} company={company} members={members} onClose={handleClose} />
        </React.Fragment>
    );
};

export default CoopCard;
