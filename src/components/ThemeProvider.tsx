import { CssBaseline, useMediaQuery } from "@material-ui/core";
import {
    createMuiTheme,
    ThemeOptions,
    ThemeProvider as MuiThemeProvider
} from "@material-ui/core/styles";
import merge from "deepmerge";
import React, {
    createContext,
    Reducer,
    useCallback,
    useContext,
    useEffect,
    useReducer
} from "react";
import { getCookie, setCookie } from "../utils/cookie";

type ThemeContextInstance = React.Dispatch<Action> | undefined;

const ThemeContext = createContext<ThemeContextInstance>(undefined);

type Action =
    | { type: "SET_SPACING"; payload: number }
    | { type: "RESET_COLORS" }
    | { type: "CHANGE"; payload: ThemeOptions };

interface ThemeProviderProps {
    children: React.ReactNode;
}

export const themeColor = "#3f51b5";

const defaultTheme: ThemeOptions = {
    spacing: 8,
    direction: "ltr",
    palette: {
        type: "light"
    },
    typography: {
        h1: {
            fontSize: "3.0rem",
            "@media (min-width:600px)": {
                fontSize: "3.5rem"
            },
            "@media (max-width:420px)": {
                fontSize: "1.5rem"
            }
        },
        h2: {
            fontSize: "2.0rem",
            "@media (min-width:600px)": {
                fontSize: "2.5rem"
            },
            "@media (max-width:420px)": {
                fontSize: "1.5rem"
            }
        },
        h3: {
            fontSize: "1.5rem",
            "@media (min-width:600px)": {
                fontSize: "1.75rem"
            },
            "@media (max-width:420px)": {
                fontSize: "1.25rem"
            }
        },
        h4: {
            fontSize: "1.25rem",
            "@media (min-width:600px)": {
                fontSize: "1.5rem"
            },
            "@media (max-width:420px)": {
                fontSize: "1.0rem"
            }
        },
        h5: {
            fontSize: "1.0rem",
            "@media (min-width:600px)": {
                fontSize: "1.25rem"
            },
            "@media (max-width:420px)": {
                fontSize: "0.75rem"
            }
        },
        h6: {
            fontSize: "0.75rem",
            "@media (min-width:600px)": {
                fontSize: "1.0rem"
            }
        }
    }
    // shape: {
    // },
    // overrides: {
    // }
    // props: {
    // }
};

const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }: ThemeProviderProps) => {
    const [themeOptions, dispatch] = useReducer<Reducer<ThemeOptions, Action>, ThemeOptions>(
        (prevState: ThemeOptions, action: Action) => {
            switch (action.type) {
                case "SET_SPACING":
                    return {
                        ...prevState,
                        spacing: action.payload
                    };
                case "RESET_COLORS":
                    return merge(prevState, { palette: defaultTheme.palette });
                case "CHANGE":
                    return merge(prevState, action.payload);
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
            <CssBaseline />
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
