import { IconButton, InputAdornment } from "@material-ui/core";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import { Field, FieldAttributes } from "formik";
import { TextField } from "formik-material-ui";
import React, { useState } from "react";

const PasswordInput: React.FC<FieldAttributes<any>> = (props: FieldAttributes<any>) => {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <Field
            {...props}
            component={TextField}
            autoComplete="current-password"
            type={showPassword ? "text" : "password"}
            InputProps={{
                endAdornment: (
                    <InputAdornment position="end">
                        <IconButton
                            aria-label="toggle password visibility"
                            onClick={() => setShowPassword(!showPassword)}
                            onMouseDown={(event: React.MouseEvent<HTMLButtonElement>) =>
                                event.preventDefault()
                            }
                            edge="end"
                        >
                            {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                    </InputAdornment>
                )
            }}
        />
    );
};

export default PasswordInput;
