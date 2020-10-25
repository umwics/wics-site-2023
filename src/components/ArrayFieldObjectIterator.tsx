import { Grid } from "@material-ui/core";
import React, { cloneElement } from "react";
import UploadImage from "./admin/UploadImage";
import ArrayField from "./ArrayField";

interface Props {
    children: React.ReactElement[];
    fullWidth?: boolean;
}

interface HiddenProps {
    name?: string;
    label?: string;
}

const fullWidthCheck = (field: React.ReactElement) => {
    return field.type === ArrayField || field.type === UploadImage;
};

const ArrayFieldObjectIterator: React.FC<Props> = ({
    children,
    name,
    label = "",
    fullWidth
}: Props & HiddenProps) => {
    const idx = parseInt(label) || 0;

    const fields = children.map(child =>
        cloneElement(child, {
            name: `${name}.${child.props.name}`,
            label:
                (typeof child.props.label === "function" && child.props.label(idx)) ||
                child.props.label ||
                label
        })
    );

    return (
        <Grid container spacing={2}>
            {fields.map((field, idx) => (
                <Grid key={idx} item xs={12} sm={fullWidth || fullWidthCheck(field) ? 12 : 6}>
                    {field}
                </Grid>
            ))}
        </Grid>
    );
};

export default ArrayFieldObjectIterator;
