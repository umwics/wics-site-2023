import { Card, CardHeader, CardMedia, Grid, IconButton } from "@material-ui/core";
import { makeStyles, Theme } from "@material-ui/core/styles";
import { Clear } from "@material-ui/icons";
import { Field, getIn, useFormikContext } from "formik";
import { TextField } from "formik-material-ui";
import React from "react";
import UploadImageButton from "./UploadImageButton";

interface Props {
    name: string;
    label?: string;
    onChange?: (selectedFile: File, preview: string) => any;
    clearImage?: () => any;
}

const useStyles = makeStyles((theme: Theme) => ({
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
    }
}));

const UploadImage: React.FC<Props> = ({
    name,
    label = "Image URL",
    onChange,
    clearImage
}: Props) => {
    const classes = useStyles();
    const { values, setFieldValue } = useFormikContext<any>();

    const formikValue = getIn(values, name);

    const handleImageUpload = (selectedFile: FileList, preview: string[]) => {
        setFieldValue(name, { file: selectedFile[0], url: preview[0] });
        onChange && onChange(selectedFile[0], preview[0]);
    };

    const handleClearImage = () => {
        setFieldValue(name, "");
        clearImage && clearImage();
    };

    return (
        <div className={classes.uploadContainer}>
            <div className={classes.imageFieldContainer}>
                <Grid item xs={10} sm={11}>
                    <Field
                        component={TextField}
                        name={name}
                        label={label}
                        disabled={!!formikValue?.file}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={2} sm={1}>
                    <UploadImageButton
                        className={classes.imageUpload}
                        labelId={`icon-button-file-${name}`}
                        onChange={handleImageUpload}
                        multiple={false}
                    />
                </Grid>
            </div>
            {formikValue && (
                <div className={classes.imageContainer}>
                    <Card className={classes.card}>
                        <CardHeader
                            action={
                                <IconButton onClick={handleClearImage} aria-label="close">
                                    <Clear />
                                </IconButton>
                            }
                            title={formikValue.file?.name || "URL Image"}
                            subheader={formikValue.file?.type}
                        />
                        <CardMedia
                            className={classes.media}
                            image={formikValue.url || formikValue}
                            title={formikValue.file?.name || "URL Image"}
                        />
                    </Card>
                </div>
            )}
        </div>
    );
};

export default UploadImage;
