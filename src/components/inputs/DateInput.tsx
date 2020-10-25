import { Field, FieldAttributes } from "formik";
import { KeyboardDatePicker } from "formik-material-ui-pickers";
import React from "react";

const DateInput: React.FC<FieldAttributes<any>> = (props: FieldAttributes<any>) => {
    return <Field {...props} component={KeyboardDatePicker} />;
};

export default DateInput;
