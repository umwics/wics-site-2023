import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
    Typography
} from "@material-ui/core";
import { makeStyles, Theme } from "@material-ui/core/styles";
import { Close } from "@material-ui/icons";
import { Field } from "formik";
import { TextField } from "formik-material-ui";
import React, { useEffect, useState } from "react";
import { Company } from "../interfaces";
import { addCompanySchema } from "../lib/validators";
import ArrayTextField from "./ArrayTextField";
import DynamicForm from "./DynamicForm";
import TransitionSlide from "./TransitionSlide";
import UploadImage from "./UploadImage";

interface Props {
    open: boolean;
    initialValues?: Company;
    addCompany?: (
        company: Company,
        image?: File,
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

const defaultInitialValues: Company = {
    id: "",
    name: "",
    displayName: "",
    email: "",
    description: "",
    links: [],
    members: [],
    image: ""
};

const AddCompanyDialog: React.FC<Props> = ({
    open,
    initialValues = defaultInitialValues,
    addCompany,
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
                    {editing ? "Edit Company" : "Add Company"}
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
                    validationSchema={addCompanySchema}
                    initialValues={initialValues}
                    onSubmit={async (data: Company, { setSubmitting }) => {
                        setSubmitting(true);
                        image && setUploading(true);

                        // handle submit
                        if (addCompany) {
                            if (image) await addCompany(data, image.file, imageUploadProgress);
                            else addCompany(data);
                        }
                        handleClose && handleClose();

                        image && setUploading(false);
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
                                name: "displayName",
                                label: "Display Name",
                                fullWidth: true
                            }
                        },
                        {
                            component: Field,
                            props: {
                                component: TextField,
                                variant: "outlined",
                                name: "email",
                                label: "Email Address",
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
                            component: ArrayTextField,
                            props: {
                                name: "links",
                                addLabel: "Add Link",
                                schema: {
                                    title: {
                                        fieldLabel: (idx: number) => `Link Title ${idx + 1}`,
                                        initialValue: ""
                                    },
                                    link: {
                                        fieldLabel: (idx: number) => `Link ${idx + 1}`,
                                        initialValue: ""
                                    }
                                }
                            }
                        },
                        {
                            component: ArrayTextField,
                            props: {
                                name: "members",
                                addLabel: "Add Member",
                                schema: {
                                    memberId: {
                                        // component: Autocomplete,
                                        // props: {
                                        //     options: [
                                        //         { title: "The Shawshank Redemption", year: 1994 },
                                        //         { title: "The Godfather", year: 1972 }
                                        //     ],
                                        //     getOptionLabel: (option: any) => option.title,
                                        //     renderInput: (
                                        //         params: AutocompleteRenderInputParams
                                        //     ) => <MuiTextField {...params} />
                                        // },
                                        fieldLabel: (idx: number) => `Member ${idx + 1}`,
                                        initialValue: ""
                                    },
                                    term: {
                                        fieldLabel: (idx: number) => `Member Term ${idx + 1}`,
                                        initialValue: ""
                                    },
                                    tools: {
                                        fieldLabel: (idx: number) => `Member Tool ${idx + 1}`,
                                        initialValue: "",
                                        isArray: true
                                    }
                                }
                            }
                        },
                        {
                            component: UploadImage,
                            props: {
                                uploading,
                                uploadingProgress,
                                image,
                                onChange: handleImageUpload,
                                clearImage: () => setImage(null)
                            }
                        },
                        {
                            component: ({ formikProps }) => (
                                <DialogActions>
                                    <Button onClick={handleClose} variant="contained">
                                        Cancel
                                    </Button>
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        color="primary"
                                        disabled={formikProps.isSubmitting}
                                    >
                                        {editing ? "Edit" : "Add"}
                                    </Button>
                                </DialogActions>
                            )
                        }
                    ]}
                />
            </DialogContent>
        </Dialog>
    );
};

export default AddCompanyDialog;
