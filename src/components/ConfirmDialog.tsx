import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle
} from "@material-ui/core";
import React from "react";
import TransitionSlide from "./TransitionSlide";

export interface OptionProps {
    title?: string;
    description?: string;
    confirmText?: string;
    cancelText?: string;
    onCancel?: () => void;
    onConfirm?: () => void;
    onClose?: () => void;
}

interface Props extends OptionProps {
    open: boolean;
}

const ConfirmDialog: React.FC<Props> = ({
    open,
    title = "Are you sure?",
    description = "",
    confirmText = "Ok",
    cancelText = "Cancel",
    onCancel,
    onConfirm,
    onClose
}: Props) => {
    return (
        <Dialog
            TransitionComponent={TransitionSlide}
            open={open}
            onClose={onClose}
            aria-labelledby="form-dialog-title"
        >
            {title && <DialogTitle id="form-dialog-title">{title}</DialogTitle>}
            {description && (
                <DialogContent>
                    <DialogContentText>{description}</DialogContentText>
                </DialogContent>
            )}
            <DialogActions>
                <Button onClick={onCancel} variant="contained">
                    {cancelText}
                </Button>
                <Button onClick={onConfirm} variant="contained" color="primary">
                    {confirmText}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ConfirmDialog;
