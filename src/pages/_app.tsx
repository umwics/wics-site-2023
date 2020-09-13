import DateFnsUtils from "@date-io/date-fns";
import { CssBaseline } from "@material-ui/core";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import { NextComponentType } from "next";
import { DefaultSeo } from "next-seo";
import { AppContext, AppInitialProps, AppProps } from "next/app";
import { SnackbarProvider } from "notistack";
import React, { useEffect } from "react";
import { SWRConfig } from "swr";
import ConfirmProvider from "../components/ConfirmProvider";
import ProgressBar from "../components/ProgressBar";
import ThemeProvider from "../components/ThemeProvider";
import AuthProvider from "../lib/auth";

const AppWrapper: NextComponentType<AppContext, AppInitialProps, AppProps> = ({
    Component,
    pageProps
}: AppProps) => {
    useEffect(() => {
        // Remove the server-side injected CSS.
        const jssStyles = document.querySelector("#jss-server-side");
        if (jssStyles && jssStyles.parentElement) {
            jssStyles.parentElement.removeChild(jssStyles);
        }

        if (process.env.NODE_ENV === "production") {
            // eslint-disable-next-line no-console
            console.log(
                `%c
██╗░░░██╗███╗░░░███╗░██╗░░░░░░░██╗██╗░█████╗░░██████╗
██║░░░██║████╗░████║░██║░░██╗░░██║██║██╔══██╗██╔════╝
██║░░░██║██╔████╔██║░╚██╗████╗██╔╝██║██║░░╚═╝╚█████╗░
██║░░░██║██║╚██╔╝██║░░████╔═████║░██║██║░░██╗░╚═══██╗
╚██████╔╝██║░╚═╝░██║░░╚██╔╝░╚██╔╝░██║╚█████╔╝██████╔╝
░╚═════╝░╚═╝░░░░░╚═╝░░░╚═╝░░░╚═╝░░╚═╝░╚════╝░╚═════╝░ 
    `,
                "font-family:monospace;color:#1976d2;font-size:12px;"
            );
        }
    }, []);

    return (
        <React.Fragment>
            <DefaultSeo
                title={process.env.siteDisplayName}
                description={process.env.description}
                openGraph={{
                    type: "website",
                    locale: process.env.locale,
                    site_name: process.env.siteName
                }}
            />
            <SWRConfig
                value={{
                    fetcher: (input: RequestInfo, init?: RequestInit) =>
                        fetch(input, init).then(res => res.json())
                }}
            >
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <ThemeProvider>
                        <SnackbarProvider maxSnack={4}>
                            <ConfirmProvider>
                                <AuthProvider>
                                    <CssBaseline />
                                    <ProgressBar
                                        options={{ showSpinner: false, trickleSpeed: 300 }}
                                    />
                                    <Component {...pageProps} />
                                </AuthProvider>
                            </ConfirmProvider>
                        </SnackbarProvider>
                    </ThemeProvider>
                </MuiPickersUtilsProvider>
            </SWRConfig>
        </React.Fragment>
    );
};
export default AppWrapper;
