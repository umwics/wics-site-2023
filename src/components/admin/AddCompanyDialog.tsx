import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
    LinearProgress,
    TextField as MuiTextField,
    Typography
} from "@material-ui/core";
import { makeStyles, Theme } from "@material-ui/core/styles";
import { Close } from "@material-ui/icons";
import match from "autosuggest-highlight/match";
import parse from "autosuggest-highlight/parse";
import { Field, useFormikContext } from "formik";
import { TextField } from "formik-material-ui";
import { Autocomplete, AutocompleteRenderInputParams } from "formik-material-ui-lab";
import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { Company, Member } from "../../interfaces";
import { addCompanySchema } from "../../lib/validators";
import ArrayField, { ArrayComponentProps } from "../ArrayField";
import DynamicForm from "../DynamicForm";
import TransitionSlide from "../TransitionSlide";
import UploadImage from "./UploadImage";

interface Props {
    open: boolean;
    members: Member[];
    initialValues?: Company;
    addCompany?: (company: Company, progressCallback?: (progress: number) => any) => any;
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
    members,
    initialValues,
    addCompany,
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
                    initialValues={composedInitialValues}
                    onSubmit={async (data: Company, { setSubmitting }) => {
                        const uploadingImage = typeof data.image !== "string";

                        setSubmitting(true);
                        uploadingImage && setUploading(true);

                        // handle submit
                        addCompany && (await addCompany(data, imageUploadProgress));
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
                            component: ArrayField,
                            props: {
                                name: "links",
                                addLabel: "Add Link",
                                schema: Yup.array().of(
                                    Yup.object().default(() => ({
                                        title: Yup.object().default(() => ({
                                            props: {
                                                component: TextField,
                                                variant: "outlined",
                                                fullWidth: true
                                            },
                                            fieldLabel: (idx: number) => `Link Title ${idx + 1}`,
                                            initialValue: ""
                                        })),
                                        link: Yup.object().default(() => ({
                                            props: {
                                                component: TextField,
                                                variant: "outlined",
                                                fullWidth: true
                                            },
                                            fieldLabel: (idx: number) => `Link ${idx + 1}`,
                                            initialValue: ""
                                        }))
                                    }))
                                )
                            }
                        },
                        {
                            component: ArrayField,
                            props: {
                                name: "members",
                                addLabel: "Add Member",
                                schema: Yup.array().of(
                                    Yup.object().default(() => ({
                                        memberId: Yup.object().default(() => ({
                                            component: ({ name, label }: ArrayComponentProps) => (
                                                <Field
                                                    component={Autocomplete}
                                                    name={name}
                                                    options={members.map(member => member.id)}
                                                    getOptionLabel={(memberId: string) =>
                                                        members.find(
                                                            member => member.id === memberId
                                                        )?.name || ""
                                                    }
                                                    renderInput={(
                                                        params: AutocompleteRenderInputParams
                                                    ) => (
                                                        <MuiTextField
                                                            {...params}
                                                            variant="outlined"
                                                            label={label}
                                                            fullWidth
                                                        />
                                                    )}
                                                    renderOption={(
                                                        memberId: string,
                                                        { inputValue }: any
                                                    ) => {
                                                        const name =
                                                            members.find(
                                                                member => member.id === memberId
                                                            )?.name || "";

                                                        const matches = match(name, inputValue);
                                                        const parts = parse(name, matches);

                                                        return (
                                                            <div>
                                                                {parts.map((part, index) => (
                                                                    <span
                                                                        key={index}
                                                                        style={{
                                                                            fontWeight: part.highlight
                                                                                ? 700
                                                                                : 400
                                                                        }}
                                                                    >
                                                                        {part.text}
                                                                    </span>
                                                                ))}
                                                            </div>
                                                        );
                                                    }}
                                                />
                                            ),
                                            fieldLabel: (idx: number) => `Member ${idx + 1}`,
                                            initialValue: null
                                        })),
                                        term: Yup.object().default(() => ({
                                            props: {
                                                component: TextField,
                                                variant: "outlined",
                                                fullWidth: true
                                            },
                                            fieldLabel: (idx: number) => `Member Term ${idx + 1}`,
                                            initialValue: ""
                                        })),
                                        tools: Yup.array().of(
                                            Yup.object().default(() => ({
                                                props: {
                                                    component: TextField,
                                                    variant: "outlined",
                                                    fullWidth: true
                                                },
                                                fieldLabel: (idx: number) =>
                                                    `Member Tool ${idx + 1}`,
                                                initialValue: ""
                                            }))
                                        )
                                    }))
                                )
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

export default AddCompanyDialog;
