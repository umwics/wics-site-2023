import { Dialog, DialogContent, DialogTitle, IconButton, Typography } from "@material-ui/core";
import { makeStyles, Theme } from "@material-ui/core/styles";
import { Close } from "@material-ui/icons";
import React from "react";
import TransitionSlide from "../TransitionSlide";

interface Props {
    children: React.ReactNode;
    open: boolean;
    title: string;
    handleClose?: () => void;
}

const useStyles = makeStyles((theme: Theme) => ({
    closeButton: {
        position: "absolute",
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500]
    }
}));

const FormDialogContainer: React.FC<Props> = ({ children, open, title, handleClose }: Props) => {
    const classes = useStyles();

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            TransitionComponent={TransitionSlide}
            aria-labelledby="form-dialog-title"
        >
            <DialogTitle id="form-dialog-title" disableTypography>
                <Typography component="p" variant="h6">
                    {title}
                </Typography>
                {handleClose && (
                    <IconButton
                        aria-label="close"
                        className={classes.closeButton}
                        onClick={handleClose}
                    >
                        <Close />
                    </IconButton>
                )}
            </DialogTitle>
            <DialogContent dividers>{children}</DialogContent>
        </Dialog>
    );
};

export default FormDialogContainer;
