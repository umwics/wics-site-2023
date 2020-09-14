import {
    Button,
    CardActionArea,
    Dialog,
    IconButton,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText
} from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import MuiDialogActions from "@material-ui/core/DialogActions";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import { createStyles, makeStyles, Theme, WithStyles, withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import React from "react";

const item = {
    id: "moc",
    name: "Master of Code",
    displayName: "Master of Code",
    email: "",
    description: "Master of Code is an Artificial Intelligence solutions company.",
    links: "https://masterofcode.com/careers-winnipeg",
    members: [],
    image: "img/coop/MasterOfCode.png"
};

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        cardGrid: {
            paddingTop: theme.spacing(8),
            paddingBottom: theme.spacing(8)
        },
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
        rootcard: {
            margin: theme.spacing(2)
        },
        cardbutton: {
            margin: 5
        },
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
        large: {
            width: theme.spacing(10),
            height: theme.spacing(10)
        },
        root: {
            width: "100%",
            maxWidth: "80ch",
            backgroundColor: theme.palette.background.paper
        },
        inline: {
            display: "inline"
        }
    })
);

const styles = (theme: Theme) =>
    createStyles({
        root: {
            margin: 0,
            padding: theme.spacing(2)
        },
        closeButton: {
            position: "absolute",
            right: theme.spacing(1),
            top: theme.spacing(1),
            color: theme.palette.grey[500]
        }
    });

export interface DialogTitleProps extends WithStyles<typeof styles> {
    id: string;
    children: React.ReactNode;
    onClose: () => void;
}

const DialogTitle = withStyles(styles)((props: DialogTitleProps) => {
    const { children, classes, onClose, ...other } = props;
    return (
        <MuiDialogTitle disableTypography className={classes.root} {...other}>
            <Typography variant="h6">{children}</Typography>
            {onClose ? (
                <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
                    <CloseIcon />
                </IconButton>
            ) : null}
        </MuiDialogTitle>
    );
});

const DialogContent = withStyles((theme: Theme) => ({
    root: {
        padding: theme.spacing(2)
    }
}))(MuiDialogContent);

const DialogActions = withStyles((theme: Theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(1)
    }
}))(MuiDialogActions);

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default function RecipeReviewCard() {
    const classes = useStyles();

    const [open, setOpen] = React.useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Card className={classes.rootcard}>
            <CardActionArea onClick={handleClickOpen}>
                <CardMedia className={classes.cardMedia} image={item.image} title={item.name} />
                <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" component="h2">
                        {item.name}
                    </Typography>
                    <Typography>{item.description}</Typography>
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
                        variant="outlined"
                        color="primary"
                        href={item.links}
                        target="_blank"
                        className={classes.cardbutton}
                    >
                        Website
                    </Button>
                    <Dialog
                        onClose={handleClose}
                        aria-labelledby="customized-dialog-title"
                        open={open}
                    >
                        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
                            {item.name}
                        </DialogTitle>
                        <DialogContent dividers>
                            <Typography gutterBottom>
                                <div className={classes.modalImgContainer}>
                                    <img src={item.image}></img>
                                </div>
                                {item.description}
                            </Typography>

                            <Typography gutterBottom>
                                <List className={classes.root}>
                                    {item.members.map(member => (
                                        // eslint-disable-next-line react/jsx-key
                                        <ListItem alignItems="flex-start">
                                            <ListItemAvatar>
                                                <Avatar alt={member.name} src={member.image} />
                                            </ListItemAvatar>
                                            <ListItemText
                                                primary={member.name}
                                                secondary={
                                                    <React.Fragment>
                                                        <Typography
                                                            component="span"
                                                            variant="body2"
                                                            className={classes.inline}
                                                            color="textPrimary"
                                                        >
                                                            {member.term}
                                                        </Typography>
                                                        {" — Tools: "}
                                                        {member.tools}
                                                    </React.Fragment>
                                                }
                                            />
                                        </ListItem>
                                    ))}
                                </List>
                            </Typography>
                        </DialogContent>
                        <DialogActions>
                            <Button href={item.links} target="_blank" color="primary">
                                Read more about it
                            </Button>
                        </DialogActions>
                    </Dialog>
                </div>
            </CardActions>
        </Card>
    );
}
