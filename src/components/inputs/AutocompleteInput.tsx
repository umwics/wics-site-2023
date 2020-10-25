import { TextField } from "@material-ui/core";
import match from "autosuggest-highlight/match";
import parse from "autosuggest-highlight/parse";
import { Field, FieldAttributes } from "formik";
import { Autocomplete, AutocompleteRenderInputParams } from "formik-material-ui-lab";
import React from "react";

interface Props extends FieldAttributes<any> {
    choices: { id: string; label: string }[];
    highlight?: boolean;
}

const AutocompleteInput: React.FC<Props> = ({
    name,
    choices,
    highlight = false,
    ...props
}: Props) => {
    const renderOption = (choiceId: string, { inputValue }: any) => {
        const name = choices.find(choice => choice.id === choiceId)?.label || "";

        const matches = match(name, inputValue);
        const parts = parse(name, matches);

        return (
            <div>
                {parts.map((part, index) => (
                    <span
                        key={index}
                        style={{
                            fontWeight: part.highlight ? 700 : 400
                        }}
                    >
                        {part.text}
                    </span>
                ))}
            </div>
        );
    };

    return (
        <Field
            component={Autocomplete}
            name={name}
            options={choices.map(choice => choice.id)}
            getOptionLabel={(choiceId: string) =>
                choices.find(choice => choice.id === choiceId)?.label || ""
            }
            renderInput={(params: AutocompleteRenderInputParams) => (
                <TextField {...props} {...params} />
            )}
            renderOption={highlight ? renderOption : undefined}
        />
    );
};

export default AutocompleteInput;
