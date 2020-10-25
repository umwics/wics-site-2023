import { LinearProgress } from "@material-ui/core";
import { makeStyles, Theme } from "@material-ui/core/styles";
import React, { useEffect, useState } from "react";
import { Resource, resourceTypeLabels } from "../../../interfaces";
import { addResourceSchema } from "../../../lib/validators";
import ArrayField from "../../ArrayField";
import DynamicForm from "../../DynamicForm";
import SelectInput from "../../inputs/SelectInput";
import TextInput from "../../inputs/TextInput";
import FormDialogContainer from "../FormDialogContainer";
import FormSubmit from "../FormSubmit";
import UploadImage from "../UploadImage";

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
        <FormDialogContainer
            open={open}
            title={editing ? "Edit Carousel" : "Add Carousel"}
            handleClose={handleClose}
        >
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
            >
                <TextInput name="name" label="Name" fullWidth autoFocus required />
                <TextInput name="title" label="Title" fullWidth />
                <TextInput
                    name="description"
                    label="Description"
                    rows={2}
                    rowsMax={4}
                    multiline
                    fullWidth
                />
                <ArrayField name="types" addLabel="Add Type" initialValue="learnToCode">
                    <SelectInput
                        label={(idx: number) => `Resource ${idx + 1}`}
                        choices={Object.entries(resourceTypeLabels).map(([value, label]) => ({
                            value,
                            label
                        }))}
                        fullWidth
                    />
                </ArrayField>
                <TextInput name="link" label="Link" fullWidth />
                <UploadImage name="image" label="Image URL" />
                {uploading && <LinearProgress variant="determinate" value={uploadingProgress} />}
                <FormSubmit submitText={editing ? "Edit" : "Add"} handleClose={handleClose} />
            </DynamicForm>
        </FormDialogContainer>
    );
};

export default AddResourceDialog;
