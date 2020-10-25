import { Button, Grid, IconButton } from "@material-ui/core";
import { fade, makeStyles, Theme } from "@material-ui/core/styles";
import { Add, Clear } from "@material-ui/icons";
import { FieldArray, FieldArrayConfig, getIn, useFormikContext } from "formik";
import React, { cloneElement } from "react";

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

interface Props extends Omit<FieldArrayConfig, "children"> {
    children: React.ReactElement;
    addLabel?: string;
    initialValue: any;
}

const ArrayField: React.FC<Props> = ({
    children,
    addLabel,
    initialValue,
    ...fieldArrayProps
}: Props) => {
    const classes = useStyles();
    const { values } = useFormikContext();

    const formikValues = getIn(values, fieldArrayProps.name);

    return (
        <FieldArray {...fieldArrayProps}>
            {arrayHelpers => (
                <Grid className={classes.group} container item spacing={2} xs={12}>
                    {formikValues.map((_element: any, idx: number) => {
                        const child = cloneElement(children, {
                            name: `${fieldArrayProps.name}[${idx}]`,
                            label:
                                (typeof children.props.label === "function" &&
                                    children.props.label(idx)) ||
                                children.props.label ||
                                idx
                        });

                        return (
                            <Grid
                                key={idx}
                                className={classes.groupRow}
                                container
                                item
                                spacing={2}
                                xs={12}
                            >
                                <Grid item xs={10} sm={11}>
                                    {child}
                                </Grid>
                                <Grid item className={classes.deleteButton} xs={2} sm={1}>
                                    <IconButton onClick={() => arrayHelpers.remove(idx)}>
                                        <Clear />
                                    </IconButton>
                                </Grid>
                            </Grid>
                        );
                    })}
                    <Grid item>
                        <Button
                            variant="text"
                            color="primary"
                            startIcon={<Add />}
                            onClick={() => arrayHelpers.push(initialValue)}
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
