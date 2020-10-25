import { Button, DialogActions } from "@material-ui/core";
import { useFormikContext } from "formik";
import React from "react";

interface Props {
    submitText?: string;
    cancelText?: string;
    handleClose?: () => void;
}

const FormSubmit: React.FC<Props> = ({
    submitText = "Submit",
    cancelText = "Cancel",
    handleClose
}: Props) => {
    const { isSubmitting } = useFormikContext();

    return (
        <DialogActions>
            <Button onClick={handleClose} variant="contained">
                {cancelText}
            </Button>
            <Button type="submit" variant="contained" color="primary" disabled={isSubmitting}>
                {submitText}
            </Button>
        </DialogActions>
    );
};

export default FormSubmit;
