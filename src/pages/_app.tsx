import DateFnsUtils from "@date-io/date-fns";
import { CssBaseline } from "@material-ui/core";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import "bootstrap/dist/css/bootstrap.min.css";
import { NextComponentType } from "next";
import { DefaultSeo } from "next-seo";
import { AppContext, AppInitialProps, AppProps } from "next/app";
import { SnackbarProvider } from "notistack";
import React, { useEffect } from "react";
import { SWRConfig } from "swr";
import "../assets/css/style.css";
import ConfirmProvider from "../components/ConfirmProvider";
import ProgressBar from "../components/ProgressBar";
import ThemeProvider from "../components/ThemeProvider";
import AuthProvider from "../lib/auth";

const AppWrapper: NextComponentType<AppContext, AppInitialProps, AppProps> = ({
    Component,
    pageProps
}: AppProps) => {
    useEffect(() => {
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
                    <SnackbarProvider maxSnack={4}>
                        <ConfirmProvider>
                            <AuthProvider>
                                <ThemeProvider>
                                    <CssBaseline />
                                    <ProgressBar
                                        options={{ showSpinner: false, trickleSpeed: 300 }}
                                    />
                                    <Component {...pageProps} />
                                </ThemeProvider>
                            </AuthProvider>
                        </ConfirmProvider>
                    </SnackbarProvider>
                </MuiPickersUtilsProvider>
            </SWRConfig>
        </React.Fragment>
    );
};
export default AppWrapper;
