import { LinearProgress } from "@material-ui/core";
import { makeStyles, Theme } from "@material-ui/core/styles";
import React, { useEffect, useState } from "react";
import { Carousel } from "../../../interfaces";
import { addCarouselSchema } from "../../../lib/validators";
import ArrayField from "../../ArrayField";
import ArrayFieldObjectIterator from "../../ArrayFieldObjectIterator";
import DynamicForm from "../../DynamicForm";
import BooleanInput from "../../inputs/BooleanInput";
import NumberInput from "../../inputs/NumberInput";
import TextInput from "../../inputs/TextInput";
import FormDialogContainer from "../FormDialogContainer";
import FormSubmit from "../FormSubmit";
import UploadImage from "../UploadImage";

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
        <FormDialogContainer
            open={open}
            title={editing ? "Edit Carousel" : "Add Carousel"}
            handleClose={handleClose}
        >
            <DynamicForm
                className={classes.form}
                validateOnChange={false}
                validateOnBlur={true}
                validationSchema={addCarouselSchema}
                initialValues={composedInitialValues}
                onSubmit={async (data: Carousel, { setSubmitting }) => {
                    const newImages = data.slides.some(slide => typeof slide.image !== "string");

                    setSubmitting(true);
                    newImages && setUploading(true);

                    // handle submit
                    addCarousel && (await addCarousel(data, imageUploadProgress));
                    handleClose && handleClose();

                    newImages && setUploading(false);
                    setSubmitting(false);
                }}
            >
                <TextInput name="name" label="Name" fullWidth autoFocus required />
                <BooleanInput name="autoplay" Label={{ label: "Auto Play" }} />
                <BooleanInput name="indicators" Label={{ label: "Indicators" }} />
                <TextInput name="interval" label="Interval" type="number" fullWidth />
                <TextInput name="timeout" label="Timeout" type="number" fullWidth />
                <TextInput name="startAt" label="Start At" type="number" fullWidth />
                <ArrayField
                    name="slides"
                    addLabel="Add Slide"
                    initialValue={{
                        title: "",
                        subtitle: "",
                        body: "",
                        linkName: "",
                        linkHref: "",
                        linkAs: "",
                        position: 0,
                        alt: "",
                        image: ""
                    }}
                >
                    <ArrayFieldObjectIterator>
                        <TextInput
                            name="title"
                            label={(idx: number) => `Slide ${idx + 1} Title`}
                            fullWidth
                        />
                        <TextInput
                            name="subtitle"
                            label={(idx: number) => `Slide ${idx + 1} Subtitle`}
                            fullWidth
                        />
                        <TextInput
                            name="body"
                            label={(idx: number) => `Slide ${idx + 1} Body`}
                            fullWidth
                        />
                        <TextInput
                            name="linkName"
                            label={(idx: number) => `Slide ${idx + 1} Link Name`}
                            fullWidth
                        />
                        <TextInput
                            name="linkHref"
                            label={(idx: number) => `Slide ${idx + 1} Link Href`}
                            fullWidth
                        />
                        <TextInput
                            name="linkAs"
                            label={(idx: number) => `Slide ${idx + 1} Link As`}
                            fullWidth
                        />
                        <NumberInput
                            name="position"
                            label={(idx: number) => `Slide ${idx + 1} Position`}
                            fullWidth
                        />
                        <TextInput
                            name="alt"
                            label={(idx: number) => `Slide ${idx + 1} Alt`}
                            fullWidth
                        />
                        <UploadImage
                            name="image"
                            label={
                                (((idx: number) =>
                                    `Slide ${idx + 1} Image URL`) as unknown) as string
                            }
                        />
                    </ArrayFieldObjectIterator>
                </ArrayField>
                {uploading && <LinearProgress variant="determinate" value={uploadingProgress} />}
                <FormSubmit submitText={editing ? "Edit" : "Add"} handleClose={handleClose} />
            </DynamicForm>
        </FormDialogContainer>
    );
};

export default AddCarouselDialog;
