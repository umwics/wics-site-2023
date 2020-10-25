import { LinearProgress } from "@material-ui/core";
import { makeStyles, Theme } from "@material-ui/core/styles";
import React, { useEffect, useState } from "react";
import { Event, eventTypeLabels } from "../../../interfaces";
import { addEventSchema } from "../../../lib/validators";
import ArrayField from "../../ArrayField";
import DynamicForm from "../../DynamicForm";
import DateInput from "../../inputs/DateInput";
import SelectInput from "../../inputs/SelectInput";
import TextInput from "../../inputs/TextInput";
import FormDialogContainer from "../FormDialogContainer";
import FormSubmit from "../FormSubmit";
import UploadImages from "../UploadImages";

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
        <FormDialogContainer
            open={open}
            title={editing ? "Edit Event" : "Add Event"}
            handleClose={handleClose}
        >
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
            >
                <TextInput name="name" label="Name" fullWidth autoFocus required />
                <TextInput name="title" label="Title" fullWidth />
                <TextInput name="term" label="Term" fullWidth />
                <SelectInput
                    choices={Object.entries(eventTypeLabels).map(([value, label]) => ({
                        value,
                        label
                    }))}
                    name="type"
                    label="Type"
                    fullWidth
                />
                <TextInput name="location" label="Location" fullWidth />
                <TextInput
                    name="description"
                    label="Description"
                    rows={2}
                    rowsMax={4}
                    multiline
                    fullWidth
                />
                <DateInput
                    variant="inline"
                    name="date"
                    label="Date"
                    format="MM/dd/yyyy"
                    type="string"
                    fullWidth
                />
                <ArrayField name="photoCredits" addLabel="Add Photo Credit" initialValue="">
                    <TextInput label={(idx: number) => `Photo Credit ${idx + 1}`} fullWidth />
                </ArrayField>
                <UploadImages
                    addLabel="Add Image"
                    fieldLabel={(idx: number) => `Image ${idx + 1}`}
                    images={images}
                    onChange={handleImageUpload}
                    clearImage={handleClearImage}
                    clearImages={handleClearImages}
                />
                {uploading && <LinearProgress variant="determinate" value={uploadingProgress} />}
                <FormSubmit submitText={editing ? "Edit" : "Add"} handleClose={handleClose} />
            </DynamicForm>
        </FormDialogContainer>
    );
};

export default AddEventDialog;
