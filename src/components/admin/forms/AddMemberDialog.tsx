import { LinearProgress } from "@material-ui/core";
import { makeStyles, Theme } from "@material-ui/core/styles";
import React, { useEffect, useState } from "react";
import { Member, memberPositionLabels } from "../../../interfaces";
import { addMemberSchema } from "../../../lib/validators";
import ArrayField from "../../ArrayField";
import ArrayFieldObjectIterator from "../../ArrayFieldObjectIterator";
import DynamicForm from "../../DynamicForm";
import SelectInput from "../../inputs/SelectInput";
import TextInput from "../../inputs/TextInput";
import FormDialogContainer from "../FormDialogContainer";
import FormSubmit from "../FormSubmit";
import UploadImage from "../UploadImage";

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
        <FormDialogContainer
            open={open}
            title={editing ? "Edit Member" : "Add Member"}
            handleClose={handleClose}
        >
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
            >
                <TextInput name="name" label="Name" fullWidth autoFocus required />
                <TextInput name="displayName" label="Display Name" fullWidth />
                <TextInput name="title" label="Title" fullWidth required />
                <TextInput name="email" label="Email Address" fullWidth />
                <TextInput
                    name="description"
                    label="Description"
                    rows={2}
                    rowsMax={4}
                    multiline
                    fullWidth
                />
                <ArrayField name="facts" addLabel="Add Fact" initialValue="">
                    <TextInput label={(idx: number) => `Fact ${idx + 1}`} fullWidth />
                </ArrayField>
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
                <ArrayField name="positions" addLabel="Add Position" initialValue="activeMember">
                    <SelectInput
                        label={(idx: number) => `Position ${idx + 1}`}
                        choices={Object.entries(memberPositionLabels).map(([value, label]) => ({
                            value,
                            label
                        }))}
                        fullWidth
                    />
                </ArrayField>
                <TextInput name="rank" label="Rank" type="number" fullWidth />
                <UploadImage name="image" label="Image URL" />
                {uploading && <LinearProgress variant="determinate" value={uploadingProgress} />}
                <FormSubmit submitText={editing ? "Edit" : "Add"} handleClose={handleClose} />
            </DynamicForm>
        </FormDialogContainer>
    );
};

export default AddMemberDialog;
