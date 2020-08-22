import { Grid } from "@material-ui/core";
import { FieldAttributes, Form, Formik, FormikConfig, FormikProps, FormikValues } from "formik";
import React from "react";

interface Field<T = any> {
    component: React.ComponentType<T>;
    props?: FieldAttributes<T> & { children?: React.ReactElement<any, any> };
}

interface DynamicFieldFormikProps<Values> {
    field: Field;
    formikProps: FormikProps<Values>;
}

interface DynamicFormCustomProps {
    className?: string;
    fields: Field[];
}

const DynamicField = <Values extends FormikValues = FormikValues>({
    field,
    formikProps
}: DynamicFieldFormikProps<Values>) => {
    const { component: Component, props } = field;

    return (
        <Grid item xs={12}>
            <Component {...props} formikProps={formikProps} />
        </Grid>
    );
};

const DynamicForm = <Values extends FormikValues = FormikValues, ExtraProps = unknown>({
    fields,
    className,
    ...formikProps
}: FormikConfig<Values> & DynamicFormCustomProps & ExtraProps): JSX.Element => {
    return (
        <Formik {...formikProps}>
            {props => (
                <Form className={className}>
                    <Grid container spacing={2}>
                        {fields.map((field, idx) => (
                            <DynamicField key={idx} field={field} formikProps={props} />
                        ))}
                    </Grid>
                </Form>
            )}
        </Formik>
    );
};

export default DynamicForm;
