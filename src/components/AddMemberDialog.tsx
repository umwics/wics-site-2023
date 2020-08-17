import {
    Button,
    Card,
    CardHeader,
    CardMedia,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Grid,
    IconButton,
    LinearProgress
} from "@material-ui/core";
import { fade, makeStyles, Theme } from "@material-ui/core/styles";
import { Add, Clear } from "@material-ui/icons";
import { Field, FieldArray, Form, Formik } from "formik";
import { TextField } from "formik-material-ui";
import React, { useEffect, useState } from "react";
import { Member } from "../interfaces";
import { addMemberSchema } from "../lib/validators";
import TransitionSlide from "./TransitionSlide";
import UploadImage from "./UploadImage";

interface Props {
    className?: string;
    open: boolean;
    initialValues?: Member;
    addMember?: (member: Member, image?: File, progressCallback?: (progress: number) => any) => any;
    handleClickOpen?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    handleClose?: () => void;
}

const useStyles = makeStyles((theme: Theme) => ({
    form: {
        width: "100%", // Fix IE 11 issue.
        marginTop: theme.spacing(3)
    },
    group: {
        borderLeft: `1px dashed ${fade(theme.palette.text.primary, 0.4)}`,
        margin: theme.spacing(1, 0, 1, 3)
    },
    groupRow: {
        display: "flex"
    },
    deleteButton: {
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
    imageUpload: {
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
    uploadContainer: {
        display: "flex",
        flexDirection: "column"
    },
    imageFieldContainer: {
        width: "100%",
        display: "flex"
    },
    imageContainer: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: theme.spacing(1)
    },
    card: {
        width: "100%"
    },
    media: {
        paddingTop: "100%"
    },
    progressRoot: {
        width: "100%"
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
    className,
    open,
    initialValues = defaultInitialValues,
    addMember,
    handleClickOpen,
    handleClose
}: Props) => {
    const classes = useStyles();

    const editing = !!initialValues.id;

    const [image, setImage] = useState<{ file: File; url: string } | null>(null);
    const [uploading, setUploading] = useState<boolean>(false);
    const [uploadingProgress, setUploadingProgress] = useState<number>(0);

    const handleImageUpload = (selectedFile: FileList, preview: string[]) => {
        setImage({ file: selectedFile[0], url: preview[0] });
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
        <div className={className}>
            <Button variant="contained" color="primary" onClick={handleClickOpen}>
                Add Member
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                TransitionComponent={TransitionSlide}
                aria-labelledby="form-dialog-title"
            >
                <DialogTitle id="form-dialog-title">
                    {editing ? "Edit Member" : "Add Member"}
                </DialogTitle>
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
                    {({ values, isSubmitting }) => (
                        <Form className={classes.form}>
                            <DialogContent>
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
                                    <Grid item className={classes.group} xs={12}>
                                        <FieldArray name="facts">
                                            {arrayHelpers => (
                                                <Grid container item spacing={2} xs={12}>
                                                    {values.facts.map((_fact, idx) => (
                                                        <Grid
                                                            container
                                                            item
                                                            key={idx}
                                                            className={classes.groupRow}
                                                            spacing={2}
                                                            xs={12}
                                                        >
                                                            <Grid item xs={10} sm={11}>
                                                                <Field
                                                                    component={TextField}
                                                                    variant="outlined"
                                                                    name={`facts[${idx}]`}
                                                                    label={`Fact ${idx + 1}`}
                                                                    fullWidth
                                                                />
                                                            </Grid>
                                                            <Grid
                                                                item
                                                                className={classes.deleteButton}
                                                                xs={2}
                                                                sm={1}
                                                            >
                                                                <IconButton
                                                                    onClick={() =>
                                                                        arrayHelpers.remove(idx)
                                                                    }
                                                                >
                                                                    <Clear />
                                                                </IconButton>
                                                            </Grid>
                                                        </Grid>
                                                    ))}
                                                    <Grid item>
                                                        <Button
                                                            variant="text"
                                                            color="primary"
                                                            startIcon={<Add />}
                                                            onClick={() => arrayHelpers.push("")}
                                                        >
                                                            Add Fact
                                                        </Button>
                                                    </Grid>
                                                </Grid>
                                            )}
                                        </FieldArray>
                                    </Grid>
                                    <Grid item className={classes.group} xs={12}>
                                        <FieldArray name="links">
                                            {arrayHelpers => (
                                                <Grid container item spacing={2} xs={12}>
                                                    {values.links.map((_link, idx) => (
                                                        <Grid
                                                            container
                                                            item
                                                            key={idx}
                                                            className={classes.groupRow}
                                                            spacing={2}
                                                            xs={12}
                                                        >
                                                            <Grid
                                                                container
                                                                item
                                                                spacing={2}
                                                                xs={10}
                                                                sm={11}
                                                            >
                                                                <Grid item xs={12} sm={6}>
                                                                    <Field
                                                                        component={TextField}
                                                                        variant="outlined"
                                                                        name={`links[${idx}].title`}
                                                                        label={`Link Title ${
                                                                            idx + 1
                                                                        }`}
                                                                        fullWidth
                                                                    />
                                                                </Grid>
                                                                <Grid item xs={12} sm={6}>
                                                                    <Field
                                                                        component={TextField}
                                                                        variant="outlined"
                                                                        name={`links[${idx}].link`}
                                                                        label={`Link ${idx + 1}`}
                                                                        fullWidth
                                                                    />
                                                                </Grid>
                                                            </Grid>
                                                            <Grid
                                                                item
                                                                className={classes.deleteButton}
                                                                xs={2}
                                                                sm={1}
                                                            >
                                                                <IconButton
                                                                    onClick={() =>
                                                                        arrayHelpers.remove(idx)
                                                                    }
                                                                >
                                                                    <Clear />
                                                                </IconButton>
                                                            </Grid>
                                                        </Grid>
                                                    ))}
                                                    <Grid item>
                                                        <Button
                                                            variant="text"
                                                            color="primary"
                                                            startIcon={<Add />}
                                                            onClick={() =>
                                                                arrayHelpers.push({
                                                                    title: "",
                                                                    link: ""
                                                                })
                                                            }
                                                        >
                                                            Add Link
                                                        </Button>
                                                    </Grid>
                                                </Grid>
                                            )}
                                        </FieldArray>
                                    </Grid>
                                    <Grid item className={classes.uploadContainer} xs={12}>
                                        <div className={classes.imageFieldContainer}>
                                            <Grid item xs={10} sm={11}>
                                                <Field
                                                    component={TextField}
                                                    variant="outlined"
                                                    name="image"
                                                    label="Image URL"
                                                    disabled={!!image}
                                                    fullWidth
                                                />
                                            </Grid>
                                            <Grid item xs={2} sm={1}>
                                                <UploadImage
                                                    className={classes.imageUpload}
                                                    onChange={handleImageUpload}
                                                    multiple={false}
                                                />
                                            </Grid>
                                        </div>
                                        {(image || values.image) && (
                                            <div className={classes.imageContainer}>
                                                <Card className={classes.card}>
                                                    <CardHeader
                                                        action={
                                                            <IconButton
                                                                onClick={() => setImage(null)}
                                                                aria-label="close"
                                                            >
                                                                <Clear />
                                                            </IconButton>
                                                        }
                                                        title={image?.file.name || "URL Image"}
                                                        subheader={image?.file.type}
                                                    />
                                                    <CardMedia
                                                        className={classes.media}
                                                        image={image?.url || values.image}
                                                        title={image?.file.name || "URL Image"}
                                                    />
                                                </Card>
                                            </div>
                                        )}
                                        {uploading && (
                                            <div className={classes.progressRoot}>
                                                <LinearProgress
                                                    variant="determinate"
                                                    value={uploadingProgress}
                                                />
                                            </div>
                                        )}
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
                            </DialogContent>
                        </Form>
                    )}
                </Formik>
            </Dialog>
        </div>
    );
};

export default AddMemberDialog;
