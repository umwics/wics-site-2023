import { makeStyles, Theme } from "@material-ui/core/styles";
import React from "react";
import { TreeLink } from "../../../interfaces";
import { addSocialLinkSchema } from "../../../lib/validators";
import DynamicForm from "../../DynamicForm";
import TextInput from "../../inputs/TextInput";
import FormDialogContainer from "../FormDialogContainer";
import FormSubmit from "../FormSubmit";

interface Props {
    open: boolean;
    initialValues?: TreeLink;
    addSocialLink?: (socialLink: TreeLink) => any;
    handleClose?: () => void;
}

const useStyles = makeStyles((theme: Theme) => ({
    form: {
        width: "100%", // Fix IE 11 issue.
        marginTop: theme.spacing(2)
    }
}));

const defaultInitialValues: TreeLink = {
    id: "",
    title: "",
    subheader: "",
    body: "",
    linkName: "",
    linkHref: ""
};

const AddSocialLinkDialog: React.FC<Props> = ({
    open,
    initialValues,
    addSocialLink,
    handleClose
}: Props) => {
    const classes = useStyles();

    const composedInitialValues = { ...defaultInitialValues, ...initialValues };
    const editing = !!composedInitialValues.id;

    return (
        <FormDialogContainer
            open={open}
            title={editing ? "Edit Social Link" : "Add Social Link"}
            handleClose={handleClose}
        >
            <DynamicForm
                className={classes.form}
                validateOnChange={false}
                validateOnBlur={true}
                validationSchema={addSocialLinkSchema}
                initialValues={composedInitialValues}
                onSubmit={async (data: TreeLink, { setSubmitting }) => {
                    setSubmitting(true);

                    // handle submit
                    addSocialLink && (await addSocialLink(data));
                    handleClose && handleClose();

                    setSubmitting(false);
                }}
            >
                <TextInput name="title" label="Title" fullWidth autoFocus />
                <TextInput name="subheader" label="Subheader" fullWidth />
                <TextInput name="body" label="Body" rows={2} rowsMax={4} multiline fullWidth />
                <TextInput name="linkName" label="Link Name" fullWidth />
                <TextInput name="linkHref" label="Link" fullWidth required />
                <FormSubmit submitText={editing ? "Edit" : "Add"} handleClose={handleClose} />
            </DynamicForm>
        </FormDialogContainer>
    );
};

export default AddSocialLinkDialog;
