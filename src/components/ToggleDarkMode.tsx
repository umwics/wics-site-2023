import { IconButton, Tooltip } from "@material-ui/core";
import { Theme, useTheme } from "@material-ui/core/styles";
import { Brightness4, Brightness7 } from "@material-ui/icons";
import React from "react";
import { useChangeTheme } from "./ThemeProvider";

const ToggleDarkMode: React.FC = () => {
    const theme = useTheme<Theme>();
    const changeTheme = useChangeTheme();

    const handleTogglePaletteType = () => {
        const paletteType = theme.palette.type === "light" ? "dark" : "light";

        changeTheme({ palette: { type: paletteType } });
    };

    return (
        <Tooltip title={theme.palette.type === "light" ? "toggle dark mode" : "toggle light mode"}>
            <IconButton
                color="inherit"
                onClick={handleTogglePaletteType}
                aria-label={
                    theme.palette.type === "light" ? "toggle dark mode" : "toggle light mode"
                }
                data-ga-event-category="header"
                data-ga-event-action="dark"
            >
                {theme.palette.type === "light" ? <Brightness4 /> : <Brightness7 />}
            </IconButton>
        </Tooltip>
    );
};

export default ToggleDarkMode;
