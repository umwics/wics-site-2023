import { Field, FieldAttributes } from "formik";
import { TextField } from "formik-material-ui";
import React from "react";

const TextInput: React.FC<FieldAttributes<any>> = (props: FieldAttributes<any>) => {
    return <Field {...props} component={TextField} />;
};

export default TextInput;
