import { Button, Grid, IconButton } from "@material-ui/core";
import { fade, makeStyles, Theme } from "@material-ui/core/styles";
import { Add, Clear } from "@material-ui/icons";
import {
    Field,
    FieldArray,
    FieldArrayConfig,
    FieldAttributes,
    getIn,
    useFormikContext
} from "formik";
import React from "react";
import * as Yup from "yup";

export interface ArrayComponentProps {
    name: string;
    label: string;
}

interface SchemaElement<T = any> {
    component?: React.ComponentType<T>;
    props?: FieldAttributes<T> & { children?: React.ReactElement<any, any> };
    fieldLabel?: (idx: number) => string;
    initialValue?: string;
}

interface SchemaRow {
    [key: string]: SchemaElement | Schema;
}

type Schema = Yup.ArraySchema<SchemaElement | SchemaRow | Schema>;

const isFlat = (schema: Schema): boolean => {
    return (
        schema.innerType.type === "array" ||
        !Object.entries(
            (schema.innerType as Yup.ObjectSchema<
                Yup.ObjectSchema<SchemaRow | SchemaElement>
            >).default()
        ).some(([_key, value]) => Yup.isSchema(value))
    );
};

const initialValues = (schema: Schema): any => {
    if (schema.innerType.type === "object") {
        const initialValue: any = {};
        const fields = (schema.innerType as Yup.ObjectSchema<
            Yup.ObjectSchema<SchemaRow | SchemaElement>
        >).default();

        if (isFlat(schema)) {
            return (fields as SchemaElement).initialValue || "";
        } else {
            for (const [key, value] of Object.entries(fields)) {
                if (value.type === "object")
                    initialValue[key] =
                        (value as Yup.ObjectSchema<SchemaElement>).default().initialValue || "";
                else initialValue[key] = [];
            }
        }

        return initialValue;
    }

    return [];
};

interface Props extends FieldArrayConfig {
    addLabel?: string;
    schema: Schema;
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

const ArrayField: React.FC<Props> = ({ addLabel, schema, ...fieldArrayProps }: Props) => {
    const classes = useStyles();
    const { values } = useFormikContext();

    const formikValues = getIn(values, fieldArrayProps.name);

    const flat = isFlat(schema);
    const newValue = initialValues(schema);

    const fields: { name: string; field: Yup.ObjectSchema<SchemaElement> | Schema }[] = [];
    if (flat) {
        fields.push({
            name: "",
            field: schema.innerType as Yup.ObjectSchema<SchemaElement> | Schema
        });
    } else {
        const schemaFields = (schema.innerType as Yup.ObjectSchema<
            Yup.ObjectSchema<SchemaRow | SchemaElement>
        >).default();

        for (const [key, value] of Object.entries(schemaFields)) {
            fields.push({ name: key, field: value as Yup.ObjectSchema<SchemaElement> | Schema });
        }
    }

    const lastFullWidth = fields.length % 2 !== 0;

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
                                    if (field.field.type === "array") {
                                        return (
                                            <ArrayField
                                                key={field.name}
                                                name={`${fieldArrayProps.name}[${idx}]${
                                                    field.name ? "." + field.name : ""
                                                }`}
                                                schema={field.field as Schema}
                                            />
                                        );
                                    }

                                    const fullWidth =
                                        lastFullWidth && fieldIdx === fields.length - 1;
                                    const rowField = (field.field as Yup.ObjectSchema<
                                        SchemaElement
                                    >).default() as SchemaElement;

                                    const FieldComponent = rowField.component || Field;
                                    const fieldProps: ArrayComponentProps = {
                                        name: `${`${fieldArrayProps.name}[${idx}]`}${
                                            flat ? "" : "." + field.name
                                        }`,
                                        label:
                                            (rowField.fieldLabel && rowField.fieldLabel(idx)) ||
                                            field.name + (idx + 1)
                                    };

                                    return (
                                        <Grid key={field.name} item xs={12} sm={fullWidth ? 12 : 6}>
                                            <FieldComponent {...fieldProps} {...rowField.props} />
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

export default ArrayField;
