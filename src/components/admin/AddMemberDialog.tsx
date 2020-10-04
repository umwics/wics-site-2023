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
import { Member, memberPositionLabels } from "../../interfaces";
import { addMemberSchema } from "../../lib/validators";
import ArrayField from "../ArrayField";
import DynamicForm from "../DynamicForm";
import TransitionSlide from "../TransitionSlide";
import UploadImage from "./UploadImage";

interface Props {
    open: boolean;
    initialValues?: Member;
    addMember?: (member: Member, progressCallback?: (progress: number) => any) => any;
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
    positions: [],
    rank: 0,
    image: ""
};

const AddMemberDialog: React.FC<Props> = ({
    open,
    initialValues,
    addMember,
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
                <DynamicForm
                    className={classes.form}
                    validateOnChange={false}
                    validateOnBlur={true}
                    validationSchema={addMemberSchema}
                    initialValues={composedInitialValues}
                    onSubmit={async (data: Member, { setSubmitting }) => {
                        const uploadingImage = typeof data.image !== "string";

                        setSubmitting(true);
                        uploadingImage && setUploading(true);

                        // handle submit
                        addMember && (await addMember(data, imageUploadProgress));
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
                                name: "title",
                                label: "Title",
                                fullWidth: true,
                                required: true
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
                                name: "facts",
                                addLabel: "Add Fact",
                                schema: Yup.array().of(
                                    Yup.object().default(() => ({
                                        props: {
                                            component: TextField,
                                            variant: "outlined",
                                            fullWidth: true
                                        },
                                        fieldLabel: (idx: number) => `Fact ${idx + 1}`,
                                        initialValue: ""
                                    }))
                                )
                            }
                        },
                        {
                            component: ArrayField,
                            props: {
                                name: "links",
                                addLabel: "Add Link",
                                schema: Yup.array().of(
                                    Yup.object().default({
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
                                    })
                                )
                            }
                        },
                        {
                            component: ArrayField,
                            props: {
                                name: "positions",
                                addLabel: "Add Position",
                                schema: Yup.array().of(
                                    Yup.object().default(() => ({
                                        props: {
                                            component: TextField,
                                            select: true,
                                            variant: "outlined",
                                            children: Object.entries(memberPositionLabels).map(
                                                ([value, label]) => (
                                                    <MenuItem key={value} value={value}>
                                                        {label}
                                                    </MenuItem>
                                                )
                                            ),
                                            fullWidth: true
                                        },
                                        fieldLabel: (idx: number) => `Position ${idx + 1}`,
                                        initialValue: "activeMember"
                                    }))
                                )
                            }
                        },
                        {
                            component: Field,
                            props: {
                                component: TextField,
                                variant: "outlined",
                                name: "rank",
                                label: "Rank",
                                type: "number",
                                fullWidth: true
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

export default AddMemberDialog;
