import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
    LinearProgress,
    MenuItem,
    Typography
} from "@material-ui/core";
import { makeStyles, Theme } from "@material-ui/core/styles";
import { Close } from "@material-ui/icons";
import { Field, useFormikContext } from "formik";
import { TextField } from "formik-material-ui";
import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { Resource, resourceTypeLabels } from "../../interfaces";
import { addResourceSchema } from "../../lib/validators";
import ArrayField from "../ArrayField";
import DynamicForm from "../DynamicForm";
import TransitionSlide from "../TransitionSlide";
import UploadImage from "./UploadImage";

interface Props {
    open: boolean;
    initialValues?: Resource;
    addResource?: (resource: Resource, progressCallback?: (progress: number) => any) => any;
    handleClose?: () => void;
}

const useStyles = makeStyles((theme: Theme) => ({
    form: {
        width: "100%", // Fix IE 11 issue.
        marginTop: theme.spacing(2)
    },
    closeButton: {
        position: "absolute",
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500]
    }
}));

const defaultInitialValues: Resource = {
    id: "",
    name: "",
    title: "",
    description: "",
    types: [],
    link: "",
    image: ""
};

const AddResourceDialog: React.FC<Props> = ({
    open,
    initialValues,
    addResource,
    handleClose
}: Props) => {
    const classes = useStyles();

    const composedInitialValues = { ...defaultInitialValues, ...initialValues };
    const editing = !!composedInitialValues.id;

    const [uploading, setUploading] = useState<boolean>(false);
    const [uploadingProgress, setUploadingProgress] = useState<number>(0);

    const imageUploadProgress = (progress: number) => {
        setUploadingProgress(progress);
    };

    useEffect(() => {
        if (!uploading) setUploadingProgress(0);
    }, [uploading]);

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            TransitionComponent={TransitionSlide}
            aria-labelledby="form-dialog-title"
        >
            <DialogTitle id="form-dialog-title">
                <Typography component="p" variant="h6">
                    {editing ? "Edit Resource" : "Add Resource"}
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
            <DialogContent dividers>
                <DynamicForm
                    className={classes.form}
                    validateOnChange={false}
                    validateOnBlur={true}
                    validationSchema={addResourceSchema}
                    initialValues={composedInitialValues}
                    onSubmit={async (data: Resource, { setSubmitting }) => {
                        const uploadingImage = typeof data.image !== "string";

                        setSubmitting(true);
                        uploadingImage && setUploading(true);

                        // handle submit
                        addResource && (await addResource(data, imageUploadProgress));
                        handleClose && handleClose();

                        uploadingImage && setUploading(false);
                        setSubmitting(false);
                    }}
                    fields={[
                        {
                            component: Field,
                            props: {
                                component: TextField,
                                variant: "outlined",
                                name: "name",
                                label: "Name",
                                fullWidth: true,
                                autoFocus: true,
                                required: true
                            }
                        },
                        {
                            component: Field,
                            props: {
                                component: TextField,
                                variant: "outlined",
                                name: "title",
                                label: "Title",
                                fullWidth: true,
                                required: false
                            }
                        },
                        {
                            component: Field,
                            props: {
                                component: TextField,
                                variant: "outlined",
                                name: "description",
                                label: "Description",
                                rows: 2,
                                rowsMax: 4,
                                multiline: true,
                                fullWidth: true
                            }
                        },
                        {
                            component: ArrayField,
                            props: {
                                name: "types",
                                addLabel: "Add Type",
                                schema: Yup.array().of(
                                    Yup.object().default(() => ({
                                        props: {
                                            component: TextField,
                                            select: true,
                                            variant: "outlined",
                                            children: Object.entries(resourceTypeLabels).map(
                                                ([value, label]) => (
                                                    <MenuItem key={value} value={value}>
                                                        {label}
                                                    </MenuItem>
                                                )
                                            ),
                                            fullWidth: true
                                        },
                                        fieldLabel: (idx: number) => `Resource ${idx + 1}`,
                                        initialValue: "learnToCode"
                                    }))
                                )
                            }
                        },
                        {
                            component: Field,
                            props: {
                                component: TextField,
                                variant: "outlined",
                                name: "link",
                                label: "Link",
                                fullWidth: true,
                                required: false
                            }
                        },
                        {
                            component: UploadImage,
                            props: {
                                name: "image",
                                label: "Image URL"
                            }
                        },
                        {
                            component: uploading ? LinearProgress : () => null,
                            props: {
                                variant: "determinate",
                                value: uploadingProgress
                            }
                        },
                        {
                            component: () => {
                                const { isSubmitting } = useFormikContext();

                                return (
                                    <DialogActions>
                                        <Button onClick={handleClose} variant="contained">
                                            Cancel
                                        </Button>
                                        <Button
                                            type="submit"
                                            variant="contained"
                                            color="primary"
                                            disabled={isSubmitting}
                                        >
                                            {editing ? "Edit" : "Add"}
                                        </Button>
                                    </DialogActions>
                                );
                            }
                        }
                    ]}
                />
            </DialogContent>
        </Dialog>
    );
};

export default AddResourceDialog;
