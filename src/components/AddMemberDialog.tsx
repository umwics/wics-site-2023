import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Grid,
    IconButton,
    Typography
} from "@material-ui/core";
import { makeStyles, Theme } from "@material-ui/core/styles";
import { Close } from "@material-ui/icons";
import { Field, Form, Formik } from "formik";
import { TextField } from "formik-material-ui";
import React, { useEffect, useState } from "react";
import { Member } from "../interfaces";
import { addMemberSchema } from "../lib/validators";
import ArrayTextField from "./ArrayTextField";
import TransitionSlide from "./TransitionSlide";
import UploadImage from "./UploadImage";

interface Props {
    open: boolean;
    initialValues?: Member;
    addMember?: (member: Member, image?: File, progressCallback?: (progress: number) => any) => any;
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

const defaultInitialValues: Member = {
    id: "",
    name: "",
    displayName: "",
    title: "",
    email: "",
    description: "",
    facts: [],
    links: [],
    image: ""
};

const AddMemberDialog: React.FC<Props> = ({
    open,
    initialValues = defaultInitialValues,
    addMember,
    handleClose
}: Props) => {
    const classes = useStyles();

    const editing = !!initialValues.id;

    const [image, setImage] = useState<{ file: File; url: string } | null>(null);
    const [uploading, setUploading] = useState<boolean>(false);
    const [uploadingProgress, setUploadingProgress] = useState<number>(0);

    const handleImageUpload = (selectedFile: File, preview: string) => {
        setImage({ file: selectedFile, url: preview });
    };

    const imageUploadProgress = (progress: number) => {
        setUploadingProgress(progress);
    };

    useEffect(() => {
        if (!uploading) setUploadingProgress(0);
    }, [uploading]);

    useEffect(() => {
        if (!open) setImage(null);
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
                    {editing ? "Edit Member" : "Add Member"}
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
                <Formik
                    validateOnChange={false}
                    validateOnBlur={true}
                    validationSchema={addMemberSchema}
                    initialValues={initialValues}
                    onSubmit={async (data: Member, { setSubmitting }) => {
                        setSubmitting(true);
                        image && setUploading(true);

                        // handle submit
                        if (addMember) {
                            if (image) await addMember(data, image.file, imageUploadProgress);
                            else addMember(data);
                        }
                        handleClose && handleClose();

                        image && setUploading(false);
                        setSubmitting(false);
                    }}
                >
                    {({ values, isSubmitting, ...formikProps }) => (
                        <Form className={classes.form}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <Field
                                        component={TextField}
                                        variant="outlined"
                                        name="name"
                                        label="Name"
                                        fullWidth
                                        autoFocus
                                        required
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Field
                                        component={TextField}
                                        variant="outlined"
                                        name="displayName"
                                        label="Display Name"
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Field
                                        component={TextField}
                                        variant="outlined"
                                        name="title"
                                        label="Title"
                                        fullWidth
                                        required
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Field
                                        component={TextField}
                                        variant="outlined"
                                        name="email"
                                        label="Email Address"
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Field
                                        component={TextField}
                                        variant="outlined"
                                        name="description"
                                        label="Description"
                                        rows={2}
                                        rowsMax={4}
                                        multiline
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <ArrayTextField
                                        name="facts"
                                        addLabel="Add Fact"
                                        schema={{
                                            fieldLabel: idx => `Fact ${idx + 1}`,
                                            initialValue: ""
                                        }}
                                        formikProps={{ values, isSubmitting, ...formikProps }}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <ArrayTextField
                                        name="links"
                                        addLabel="Add Link"
                                        schema={{
                                            title: {
                                                fieldLabel: idx => `Link Title ${idx + 1}`,
                                                initialValue: ""
                                            },
                                            link: {
                                                fieldLabel: idx => `Link ${idx + 1}`,
                                                initialValue: ""
                                            }
                                        }}
                                        formikProps={{ values, isSubmitting, ...formikProps }}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <UploadImage
                                        uploading={uploading}
                                        uploadingProgress={uploadingProgress}
                                        image={image}
                                        formikProps={{ values, isSubmitting, ...formikProps }}
                                        onChange={handleImageUpload}
                                        clearImage={() => setImage(null)}
                                    />
                                </Grid>
                            </Grid>
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
                        </Form>
                    )}
                </Formik>
            </DialogContent>
        </Dialog>
    );
};

export default AddMemberDialog;
