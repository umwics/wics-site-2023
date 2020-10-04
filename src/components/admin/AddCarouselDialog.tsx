import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
    LinearProgress,
    Typography
} from "@material-ui/core";
import { makeStyles, Theme } from "@material-ui/core/styles";
import { Close } from "@material-ui/icons";
import { Field, useFormikContext } from "formik";
import { CheckboxWithLabel, TextField } from "formik-material-ui";
import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { Carousel } from "../../interfaces";
import { addCarouselSchema } from "../../lib/validators";
import ArrayField from "../ArrayField";
import DynamicForm from "../DynamicForm";
import TransitionSlide from "../TransitionSlide";
import UploadImage from "./UploadImage";

interface Props {
    open: boolean;
    initialValues?: Carousel;
    addCarousel?: (carousel: Carousel, progressCallback?: (progress: number) => any) => any;
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

const defaultInitialValues: Carousel = {
    id: "",
    name: "",
    autoplay: true,
    indicators: true,
    interval: 4000,
    timeout: 500,
    startAt: 0,
    slides: []
};

const AddCarouselDialog: React.FC<Props> = ({
    open,
    initialValues,
    addCarousel,
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
                    {editing ? "Edit Carousel" : "Add Carousel"}
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
                    validationSchema={addCarouselSchema}
                    initialValues={composedInitialValues}
                    onSubmit={async (data: Carousel, { setSubmitting }) => {
                        const newImages = data.slides.some(
                            slide => typeof slide.image !== "string"
                        );

                        setSubmitting(true);
                        newImages && setUploading(true);

                        // handle submit
                        addCarousel && (await addCarousel(data, imageUploadProgress));
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
                                component: CheckboxWithLabel,
                                name: "autoplay",
                                Label: { label: "Auto Play" },
                                type: "checkbox"
                            }
                        },
                        {
                            component: Field,
                            props: {
                                component: CheckboxWithLabel,
                                name: "indicators",
                                Label: { label: "Indicators" },
                                type: "checkbox"
                            }
                        },
                        {
                            component: Field,
                            props: {
                                component: TextField,
                                variant: "outlined",
                                name: "interval",
                                label: "Interval",
                                type: "number",
                                fullWidth: true
                            }
                        },
                        {
                            component: Field,
                            props: {
                                component: TextField,
                                variant: "outlined",
                                name: "timeout",
                                label: "Timeout",
                                type: "number",
                                fullWidth: true
                            }
                        },
                        {
                            component: Field,
                            props: {
                                component: TextField,
                                variant: "outlined",
                                name: "startAt",
                                label: "Start At",
                                type: "number",
                                fullWidth: true
                            }
                        },
                        {
                            component: ArrayField,
                            props: {
                                name: "slides",
                                addLabel: "Add Slide",
                                schema: Yup.array().of(
                                    Yup.object().default(() => ({
                                        title: Yup.object().default(() => ({
                                            props: {
                                                component: TextField,
                                                variant: "outlined",
                                                fullWidth: true
                                            },
                                            fieldLabel: (idx: number) => `Slide ${idx + 1} Title`,
                                            initialValue: ""
                                        })),
                                        subtitle: Yup.object().default(() => ({
                                            props: {
                                                component: TextField,
                                                variant: "outlined",
                                                fullWidth: true
                                            },
                                            fieldLabel: (idx: number) =>
                                                `Slide ${idx + 1} Subtitle`,
                                            initialValue: ""
                                        })),
                                        body: Yup.object().default(() => ({
                                            props: {
                                                component: TextField,
                                                variant: "outlined",
                                                fullWidth: true
                                            },
                                            fieldLabel: (idx: number) => `Slide ${idx + 1} Body`,
                                            initialValue: ""
                                        })),
                                        linkName: Yup.object().default(() => ({
                                            props: {
                                                component: TextField,
                                                variant: "outlined",
                                                fullWidth: true
                                            },
                                            fieldLabel: (idx: number) =>
                                                `Slide ${idx + 1} Link Name`,
                                            initialValue: ""
                                        })),
                                        linkHref: Yup.object().default(() => ({
                                            props: {
                                                component: TextField,
                                                variant: "outlined",
                                                fullWidth: true
                                            },
                                            fieldLabel: (idx: number) =>
                                                `Slide ${idx + 1} Link Href`,
                                            initialValue: ""
                                        })),
                                        linkAs: Yup.object().default(() => ({
                                            props: {
                                                component: TextField,
                                                variant: "outlined",
                                                fullWidth: true
                                            },
                                            fieldLabel: (idx: number) => `Slide ${idx + 1} Link As`,
                                            initialValue: ""
                                        })),
                                        position: Yup.object().default(() => ({
                                            props: {
                                                component: TextField,
                                                variant: "outlined",
                                                type: "number",
                                                fullWidth: true
                                            },
                                            fieldLabel: (idx: number) =>
                                                `Slide ${idx + 1} Position`,
                                            initialValue: 0
                                        })),
                                        alt: Yup.object().default(() => ({
                                            props: {
                                                component: TextField,
                                                variant: "outlined",
                                                fullWidth: true
                                            },
                                            fieldLabel: (idx: number) => `Slide ${idx + 1} Alt`,
                                            initialValue: ""
                                        })),
                                        image: Yup.object().default(() => ({
                                            component: UploadImage,
                                            fieldLabel: (idx: number) =>
                                                `Slide ${idx + 1} Image URL`,
                                            initialValue: ""
                                        }))
                                    }))
                                )
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

export default AddCarouselDialog;
