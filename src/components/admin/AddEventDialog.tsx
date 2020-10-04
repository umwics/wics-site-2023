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
import { KeyboardDatePicker } from "formik-material-ui-pickers";
import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { Event, eventTypeLabels } from "../../interfaces";
import { addEventSchema } from "../../lib/validators";
import ArrayField from "../ArrayField";
import DynamicForm from "../DynamicForm";
import TransitionSlide from "../TransitionSlide";
import UploadImages from "./UploadImages";

interface Props {
    open: boolean;
    initialValues?: Event;
    addEvent?: (
        event: Event,
        images: { file: File | null; url: string }[],
        progressCallback?: (progress: number) => any
    ) => any;
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

const defaultInitialValues: Event = {
    id: "",
    name: "",
    title: "",
    term: "",
    type: "otherEvent",
    location: "",
    description: "",
    date: new Date().toISOString(),
    photoCredits: [],
    images: []
};

const AddEventDialog: React.FC<Props> = ({ open, initialValues, addEvent, handleClose }: Props) => {
    const classes = useStyles();

    const composedInitialValues = { ...defaultInitialValues, ...initialValues };
    const editing = !!composedInitialValues.id;

    const [images, setImages] = useState<{ file: File | null; url: string }[]>([]);
    const [uploading, setUploading] = useState<boolean>(false);
    const [uploadingProgress, setUploadingProgress] = useState<number>(0);

    const handleImageUpload = (selectedFiles: FileList, previews: string[]) => {
        const newImages = Array.from(selectedFiles, (file, idx) => ({ file, url: previews[idx] }));
        setImages([...images, ...newImages]);
    };

    const handleClearImage = (idx: number) => {
        setImages([...images.slice(0, idx), ...images.slice(idx + 1, images.length)]);
    };

    const handleClearImages = () => {
        setImages([]);
    };

    const imageUploadProgress = (progress: number) => {
        setUploadingProgress(progress);
    };

    useEffect(() => {
        if (!uploading) setUploadingProgress(0);
    }, [uploading]);

    useEffect(() => {
        if (!open) setImages([]);
        else {
            setImages([...composedInitialValues.images.map(url => ({ file: null, url }))]);
        }
    }, [open]);

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            TransitionComponent={TransitionSlide}
            aria-labelledby="form-dialog-title"
        >
            <DialogTitle id="form-dialog-title">
                <Typography component="p" variant="h6">
                    {editing ? "Edit Event" : "Add Event"}
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
                    validationSchema={addEventSchema}
                    initialValues={composedInitialValues}
                    onSubmit={async (data: Event, { setSubmitting }) => {
                        const newImages = images.some(image => !!image.file);

                        setSubmitting(true);
                        newImages && setUploading(true);

                        // date picker gives the date as a date object, however we store it as string
                        const event = {
                            ...data,
                            date:
                                typeof data.date !== "string"
                                    ? (data.date as Date).toISOString()
                                    : data.date
                        };

                        // handle submit
                        addEvent && (await addEvent(event, [...images], imageUploadProgress));
                        handleClose && handleClose();

                        newImages && setUploading(false);
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
                                fullWidth: true
                            }
                        },
                        {
                            component: Field,
                            props: {
                                component: TextField,
                                variant: "outlined",
                                name: "term",
                                label: "Term",
                                fullWidth: true
                            }
                        },
                        {
                            component: Field,
                            props: {
                                component: TextField,
                                select: true,
                                variant: "outlined",
                                name: "type",
                                label: "Type",
                                children: Object.entries(eventTypeLabels).map(([value, label]) => (
                                    <MenuItem key={value} value={value}>
                                        {label}
                                    </MenuItem>
                                )),
                                fullWidth: true
                            }
                        },
                        {
                            component: Field,
                            props: {
                                component: TextField,
                                variant: "outlined",
                                name: "location",
                                label: "Location",
                                fullWidth: true
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
                            component: Field,
                            props: {
                                component: KeyboardDatePicker,
                                variant: "inline",
                                inputVariant: "outlined",
                                name: "date",
                                label: "Date",
                                format: "MM/dd/yyyy",
                                type: "string",
                                fullWidth: true
                            }
                        },
                        {
                            component: ArrayField,
                            props: {
                                name: "photoCredits",
                                addLabel: "Add Photo Credit",
                                schema: Yup.array().of(
                                    Yup.object().default(() => ({
                                        props: {
                                            component: TextField,
                                            variant: "outlined",
                                            fullWidth: true
                                        },
                                        fieldLabel: (idx: number) => `Photo Credit ${idx + 1}`,
                                        initialValue: ""
                                    }))
                                )
                            }
                        },
                        {
                            component: UploadImages,
                            props: {
                                addLabel: "Add Image",
                                fieldLabel: (idx: number) => `Image ${idx + 1}`,
                                images,
                                onChange: handleImageUpload,
                                clearImage: handleClearImage,
                                clearImages: handleClearImages
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

export default AddEventDialog;
