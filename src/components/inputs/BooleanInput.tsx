import { Field, FieldAttributes } from "formik";
import { CheckboxWithLabel } from "formik-material-ui";
import React from "react";

const BooleanInput: React.FC<FieldAttributes<any>> = (props: FieldAttributes<any>) => {
    return <Field {...props} component={CheckboxWithLabel} type="checkbox" />;
};

export default BooleanInput;
