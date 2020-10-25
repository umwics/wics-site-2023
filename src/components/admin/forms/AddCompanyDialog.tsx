import { LinearProgress } from "@material-ui/core";
import { makeStyles, Theme } from "@material-ui/core/styles";
import React, { useEffect, useState } from "react";
import { Company, Member } from "../../../interfaces";
import { addCompanySchema } from "../../../lib/validators";
import ArrayField from "../../ArrayField";
import ArrayFieldObjectIterator from "../../ArrayFieldObjectIterator";
import DynamicForm from "../../DynamicForm";
import AutocompleteInput from "../../inputs/AutocompleteInput";
import TextInput from "../../inputs/TextInput";
import FormDialogContainer from "../FormDialogContainer";
import FormSubmit from "../FormSubmit";
import UploadImage from "../UploadImage";

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
        <FormDialogContainer
            open={open}
            title={editing ? "Edit Company" : "Add Company"}
            handleClose={handleClose}
        >
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
            >
                <TextInput name="name" label="Name" fullWidth autoFocus required />
                <TextInput name="displayName" label="Display Name" fullWidth />
                <TextInput name="email" label="Email Address" fullWidth />
                <TextInput
                    name="description"
                    label="Description"
                    rows={2}
                    rowsMax={4}
                    multiline
                    fullWidth
                />
                <ArrayField name="links" addLabel="Add Link" initialValue={{ title: "", link: "" }}>
                    <ArrayFieldObjectIterator>
                        <TextInput
                            name="title"
                            label={(idx: number) => `Link Title ${idx + 1}`}
                            fullWidth
                        />
                        <TextInput
                            name="link"
                            label={(idx: number) => `Link ${idx + 1}`}
                            fullWidth
                        />
                    </ArrayFieldObjectIterator>
                </ArrayField>
                <ArrayField
                    name="members"
                    addLabel="Add Member"
                    initialValue={{ memberId: null, term: "", tools: [] }}
                >
                    <ArrayFieldObjectIterator>
                        <AutocompleteInput
                            name="memberId"
                            label={(idx: number) => `Member ${idx + 1}`}
                            choices={members.map(member => ({ id: member.id, label: member.name }))}
                            highlight
                            fullWidth
                        />
                        <TextInput
                            name="term"
                            label={(idx: number) => `Member Term ${idx + 1}`}
                            fullWidth
                        />
                        <ArrayField name="tools" addLabel="Add Tool" initialValue="">
                            <TextInput
                                label={(idx: number) => `Member Tool ${idx + 1}`}
                                fullWidth
                            />
                        </ArrayField>
                    </ArrayFieldObjectIterator>
                </ArrayField>
                <UploadImage name="image" label="Image URL" />
                {uploading && <LinearProgress variant="determinate" value={uploadingProgress} />}
                <FormSubmit submitText={editing ? "Edit" : "Add"} handleClose={handleClose} />
            </DynamicForm>
        </FormDialogContainer>
    );
};

export default AddCompanyDialog;
