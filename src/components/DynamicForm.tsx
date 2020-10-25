import { Grid } from "@material-ui/core";
import { Form, Formik, FormikConfig, FormikValues } from "formik";
import React from "react";

interface DynamicFormCustomProps {
    className?: string;
    children?: React.ReactNode;
}

const DynamicForm = <Values extends FormikValues = FormikValues, ExtraProps = unknown>({
    className,
    children,
    ...props
}: FormikConfig<Values> & DynamicFormCustomProps & ExtraProps): JSX.Element => {
    const fields = React.Children.toArray(children);

    return (
        <Formik {...props}>
            {_ => (
                <Form className={className}>
                    <Grid container spacing={2}>
                        {fields.map((field, idx) => (
                            <Grid key={idx} item xs={12}>
                                {field}
                            </Grid>
                        ))}
                    </Grid>
                </Form>
            )}
        </Formik>
    );
};

export default DynamicForm;
