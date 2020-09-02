import { useMediaQuery } from "@material-ui/core";
import {
    createMuiTheme,
    ThemeOptions,
    ThemeProvider as MuiThemeProvider
} from "@material-ui/core/styles";
import React, { createContext, Reducer, useCallback, useContext, useEffect } from "react";
import { getCookie, setCookie } from "../utils/cookie";

type ThemeContextInstance = React.Dispatch<Action> | undefined;

const ThemeContext = createContext<ThemeContextInstance | undefined>(undefined);

type Action =
    | { type: "SET_SPACING"; payload: number }
    | { type: "RESET_COLORS" }
    | { type: "CHANGE"; payload: ThemeOptions };

interface ThemeProviderProps {
    children: React.ReactNode;
}

const defaultTheme: ThemeOptions = {
    spacing: 8,
    direction: "ltr",
    palette: {
        type: "light"
    }
    // typography: {
    // },
    // shape: {
    // },
    // overrides: {
    // },
    // props: {
    // }
};

const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }: ThemeProviderProps) => {
    const [themeOptions, dispatch] = React.useReducer<Reducer<ThemeOptions, Action>, ThemeOptions>(
        (prevState: ThemeOptions, action: Action) => {
            switch (action.type) {
                case "SET_SPACING":
                    return {
                        ...prevState,
                        spacing: action.payload
                    };
                case "RESET_COLORS":
                    return {
                        ...prevState,
                        palette: defaultTheme.palette
                    };
                case "CHANGE":
                    return {
                        ...prevState,
                        ...action.payload
                    };
                default:
                    throw new Error(`Unrecognized type ${(action as Action).type}`);
            }
        },
        defaultTheme,
        initial => initial // typescript doesnt like being undefined
    );

    const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
    const preferredType = prefersDarkMode ? "dark" : "light";

    const { palette } = themeOptions;
    const paletteType = palette?.type || preferredType;

    useEffect(() => {
        if (process.browser) {
            const nextPaletteType = getCookie("paletteType");

            dispatch({
                type: "CHANGE",
                payload: { palette: { type: (nextPaletteType as "light" | "dark") || paletteType } }
            });
        }
    }, []);

    useEffect(() => {
        setCookie("paletteType", paletteType, { maxAge: 31536000 });
    }, [paletteType]);

    const theme = React.useMemo(() => {
        const nextTheme = createMuiTheme(themeOptions);

        return nextTheme;
    }, [themeOptions]);

    return (
        <MuiThemeProvider theme={theme}>
            <ThemeContext.Provider value={dispatch}>{children}</ThemeContext.Provider>
        </MuiThemeProvider>
    );
};

export const useChangeTheme = (): ((themeChanges: Partial<ThemeOptions>) => ThemeOptions) => {
    const dispatch = useContext(ThemeContext);
    return useCallback(
        themeChanges =>
            (dispatch && dispatch({ type: "CHANGE", payload: themeChanges })) || defaultTheme,
        [dispatch]
    );
};

export const useDispatchTheme = (): ThemeContextInstance => {
    return useContext(ThemeContext);
};

export default ThemeProvider;
