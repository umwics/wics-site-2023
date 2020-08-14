import { IconButton } from "@material-ui/core";
import { makeStyles, Theme } from "@material-ui/core/styles";
import { PhotoCamera } from "@material-ui/icons";
import React, { useEffect, useState } from "react";

interface Props {
    className?: string;
    multiple?: boolean;
    onChange?: (selectedFile: FileList | File, preview: string[] | string | undefined) => any;
}

const useStyles = makeStyles((_theme: Theme) => ({
    input: {
        display: "none"
    }
}));

const UploadImage: React.FC<Props> = ({ className, multiple, onChange }: Props) => {
    const classes = useStyles();

    const [selectedFile, setSelectedFile] = useState<FileList | File | undefined>(undefined);

    useEffect(() => {
        if (!selectedFile) return;

        let objectUrl: string[] | string;
        if (selectedFile instanceof FileList) {
            objectUrl = [];
            for (let i = 0; i < selectedFile.length; i++)
                objectUrl.push(URL.createObjectURL(selectedFile[i]));
        } else {
            objectUrl = URL.createObjectURL(selectedFile);
        }

        onChange && onChange(selectedFile, objectUrl);

        // free memory when ever this component is unmounted
        return () =>
            objectUrl instanceof Array
                ? objectUrl.forEach(url => URL.revokeObjectURL(url))
                : URL.revokeObjectURL(objectUrl);
    }, [selectedFile]);

    const handleSelectFile = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            if (multiple) setSelectedFile(event.target.files);
            else setSelectedFile(event.target.files[0]);

            return;
        }

        setSelectedFile(undefined);
    };

    return (
        <React.Fragment>
            <input
                accept="image/*"
                id="icon-button-file"
                className={classes.input}
                type="file"
                onChange={handleSelectFile}
                multiple={multiple}
            />
            <label htmlFor="icon-button-file" className={className}>
                <IconButton color="primary" aria-label="upload picture" component="span">
                    <PhotoCamera />
                </IconButton>
            </label>
        </React.Fragment>
    );
};

export default UploadImage;
