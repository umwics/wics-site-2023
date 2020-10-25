import {
    Grid,
    GridList,
    GridListTile,
    GridListTileBar,
    IconButton,
    ListSubheader
} from "@material-ui/core";
import { makeStyles, Theme } from "@material-ui/core/styles";
import { Clear } from "@material-ui/icons";
import React from "react";
import UploadImageButton from "./UploadImageButton";

interface Props {
    uploading?: boolean;
    addLabel?: string;
    fieldLabel?: (idx: number) => string;
    uploadingProgress?: number;
    images: { file: File | null; url: string }[];
    onChange?: (selectedFiles: FileList, previews: string[]) => any;
    clearImages?: () => any;
    clearImage?: (idx: number) => any;
}

const useStyles = makeStyles((_theme: Theme) => ({
    imageUpload: {
        height: "100%",
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center"
    },
    uploadContainer: {
        display: "flex",
        flexDirection: "column"
    },
    icon: {
        color: "rgba(255, 255, 255, 0.70)"
    }
}));

const UploadImages: React.FC<Props> = ({
    // addLabel,
    fieldLabel,
    images,
    onChange,
    // clearImages,
    clearImage
}: Props) => {
    const classes = useStyles();

    const handleImageUpload = (selectedFiles: FileList, previews: string[]) => {
        onChange && onChange(selectedFiles, previews);
    };

    return (
        <div className={classes.uploadContainer}>
            <Grid container>
                <Grid item xs={12}>
                    <GridList cellHeight={180} cols={3}>
                        <GridListTile key="Previews" cols={3} style={{ height: "auto" }}>
                            <ListSubheader component="div">Previews</ListSubheader>
                        </GridListTile>
                        {images.map(({ url }, idx) => (
                            <GridListTile key={idx}>
                                <img src={url} />
                                <GridListTileBar
                                    title={(fieldLabel && fieldLabel(idx)) || idx}
                                    subtitle={<span>file</span>}
                                    titlePosition="bottom"
                                    actionIcon={
                                        <IconButton
                                            className={classes.icon}
                                            onClick={() => clearImage && clearImage(idx)}
                                            aria-label="close"
                                        >
                                            <Clear />
                                        </IconButton>
                                    }
                                />
                            </GridListTile>
                        ))}
                    </GridList>
                </Grid>
                <Grid item xs={12}>
                    <div className={classes.imageUpload}>
                        <UploadImageButton onChange={handleImageUpload} multiple={true} />
                    </div>
                </Grid>
            </Grid>
        </div>
    );
};

export default UploadImages;
