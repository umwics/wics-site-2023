import { Card, CardHeader, CardMedia, Grid, IconButton, LinearProgress } from "@material-ui/core";
import { makeStyles, Theme } from "@material-ui/core/styles";
import { Clear } from "@material-ui/icons";
import { Field, FormikProps } from "formik";
import { TextField } from "formik-material-ui";
import React from "react";
import UploadImageButton from "./UploadImageButton";

interface Props {
    uploading?: boolean;
    uploadingProgress?: number;
    image?: { file: File; url: string } | null;
    formikProps: FormikProps<any>;
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
    },
    progressRoot: {
        width: "100%"
    }
}));

const UploadImage: React.FC<Props> = ({
    uploading,
    uploadingProgress,
    image,
    formikProps,
    onChange,
    clearImage
}: Props) => {
    const classes = useStyles();

    const handleImageUpload = (selectedFile: FileList, preview: string[]) => {
        onChange && onChange(selectedFile[0], preview[0]);
    };

    return (
        <div className={classes.uploadContainer}>
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
                    <UploadImageButton
                        className={classes.imageUpload}
                        onChange={handleImageUpload}
                        multiple={false}
                    />
                </Grid>
            </div>
            {(image || formikProps.values.image) && (
                <div className={classes.imageContainer}>
                    <Card className={classes.card}>
                        <CardHeader
                            action={
                                <IconButton onClick={clearImage} aria-label="close">
                                    <Clear />
                                </IconButton>
                            }
                            title={image?.file.name || "URL Image"}
                            subheader={image?.file.type}
                        />
                        <CardMedia
                            className={classes.media}
                            image={image?.url || formikProps.values.image}
                            title={image?.file.name || "URL Image"}
                        />
                    </Card>
                </div>
            )}
            {uploading && (
                <div className={classes.progressRoot}>
                    <LinearProgress variant="determinate" value={uploadingProgress} />
                </div>
            )}
        </div>
    );
};

export default UploadImage;
