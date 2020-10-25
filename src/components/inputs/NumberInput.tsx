import { Field, FieldAttributes } from "formik";
import { TextField } from "formik-material-ui";
import React from "react";

const NumberInput: React.FC<FieldAttributes<any>> = (props: FieldAttributes<any>) => {
    return <Field {...props} component={TextField} type="number" />;
};

export default NumberInput;
