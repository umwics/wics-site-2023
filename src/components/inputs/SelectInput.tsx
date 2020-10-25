import { MenuItem } from "@material-ui/core";
import { Field, FieldAttributes } from "formik";
import { TextField } from "formik-material-ui";
import React from "react";

interface Props extends FieldAttributes<any> {
    choices: { value: string; label: string }[];
}

const SelectInput: React.FC<Props> = ({ choices, ...props }: Props) => {
    return (
        <Field {...props} component={TextField} select>
            {choices.map(({ value, label }) => (
                <MenuItem key={value} value={value}>
                    {label}
                </MenuItem>
            ))}
        </Field>
    );
};

export default SelectInput;
