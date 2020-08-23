import { Button, Grid, IconButton } from "@material-ui/core";
import { fade, makeStyles, Theme } from "@material-ui/core/styles";
import { Add, Clear } from "@material-ui/icons";
import { Field, FieldArray, FieldArrayConfig, FieldAttributes, FormikProps } from "formik";
import { TextField } from "formik-material-ui";
import React from "react";
import { deepValue } from "../utils/deepValue";

interface RowSchema<T = any> {
    component?: React.ComponentType<T>;
    props?: FieldAttributes<T> & { children?: React.ReactElement<any, any> };
    fieldLabel?: (idx: number) => string;
    initialValue?: string;
    isArray?: boolean;
}

interface Schema {
    [key: string]: Schema | RowSchema;
}

const isSchema = (row: Schema | RowSchema): boolean => {
    return Object.entries(row).some(([_key, value]) => typeof value === "object");
};

const initialValues = (row: Schema | RowSchema): any => {
    if (isSchema(row)) {
        const initialValue: any = {};
        for (const [key, value] of Object.entries(row)) {
            if (value.isArray || isSchema(value)) initialValue[key] = [];
            else initialValue[key] = value.initialValue || "";
        }

        return initialValue;
    } else {
        return row.initialValue || "";
    }
};

interface Props extends FieldArrayConfig {
    addLabel?: string;
    schema: Schema | RowSchema;
    formikProps: FormikProps<any>;
}

const useStyles = makeStyles((theme: Theme) => ({
    group: {
        borderLeft: `1px dashed ${fade(theme.palette.text.primary, 0.4)}`,
        margin: theme.spacing(1, 0, 1, 3)
    },
    groupRow: {
        display: "flex"
    },
    deleteButton: {
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start"
    }
}));

const ArrayTextField: React.FC<Props> = ({
    addLabel,
    schema,
    formikProps,
    ...fieldArrayProps
}: Props) => {
    const classes = useStyles();

    const flat = !isSchema(schema);
    const fields: { name: string; isSchema: boolean; field: RowSchema | Schema }[] = [];

    if (flat) {
        fields.push({ name: "", isSchema: false, field: schema });
    } else {
        for (const [key, value] of Object.entries(schema))
            fields.push({
                name: key,
                isSchema: (value as RowSchema).isArray || isSchema(value),
                field: value
            });
    }

    const lastFullWidth = fields.length % 2 !== 0;
    const newValue = initialValues(schema);

    const formikValues = deepValue(formikProps.values, fieldArrayProps.name);

    return (
        <FieldArray {...fieldArrayProps}>
            {arrayHelpers => (
                <Grid className={classes.group} container item spacing={2} xs={12}>
                    {formikValues.map((_element: any, idx: number) => (
                        <Grid
                            container
                            item
                            key={idx}
                            className={classes.groupRow}
                            spacing={2}
                            xs={12}
                        >
                            <Grid
                                container={!flat}
                                item
                                spacing={flat ? undefined : 2}
                                xs={10}
                                sm={11}
                            >
                                {fields.map((field, fieldIdx) => {
                                    if (field.isSchema) {
                                        return (
                                            <ArrayTextField
                                                key={field.name}
                                                name={`${fieldArrayProps.name}[${idx}].${field.name}`}
                                                schema={field.field}
                                                formikProps={formikProps}
                                            />
                                        );
                                    }

                                    const fullWidth =
                                        lastFullWidth && fieldIdx === fields.length - 1;
                                    const rowField = field.field as RowSchema;

                                    return (
                                        <Grid key={field.name} item xs={12} sm={fullWidth ? 12 : 6}>
                                            <Field
                                                {...rowField.props}
                                                component={rowField.component || TextField}
                                                variant="outlined"
                                                name={`${`${fieldArrayProps.name}[${idx}]`}${
                                                    flat ? "" : "." + field.name
                                                }`}
                                                label={
                                                    (rowField.fieldLabel &&
                                                        rowField.fieldLabel(idx)) ||
                                                    field.name + (idx + 1)
                                                }
                                                fullWidth
                                            />
                                        </Grid>
                                    );
                                })}
                            </Grid>
                            <Grid item className={classes.deleteButton} xs={2} sm={1}>
                                <IconButton onClick={() => arrayHelpers.remove(idx)}>
                                    <Clear />
                                </IconButton>
                            </Grid>
                        </Grid>
                    ))}
                    <Grid item>
                        <Button
                            variant="text"
                            color="primary"
                            startIcon={<Add />}
                            onClick={() => arrayHelpers.push(newValue)}
                        >
                            {addLabel ? addLabel : `Add ${fieldArrayProps.name.split(".").pop()}`}
                        </Button>
                    </Grid>
                </Grid>
            )}
        </FieldArray>
    );
};

export default ArrayTextField;
