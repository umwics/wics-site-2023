import { CssBaseline, ThemeProvider } from "@material-ui/core";
import "bootstrap/dist/css/bootstrap.min.css";
import { NextComponentType } from "next";
import { DefaultSeo } from "next-seo";
import { AppContext, AppInitialProps, AppProps } from "next/app";
import React from "react";
import "../assets/css/style.css";
import ConfirmProvider from "../components/ConfirmProvider";
import ProgressBar from "../components/ProgressBar";
import { AuthProvider } from "../lib/auth";
import { theme } from "../lib/theme";

const CustomApp: NextComponentType<AppContext, AppInitialProps, AppProps> = ({
    Component,
    pageProps
}: AppProps) => (
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
        <AuthProvider>
            <ThemeProvider theme={theme}>
                <ConfirmProvider>
                    <CssBaseline />
                    <ProgressBar options={{ showSpinner: false, trickleSpeed: 300 }} />
                    <Component {...pageProps} />
                </ConfirmProvider>
            </ThemeProvider>
        </AuthProvider>
    </React.Fragment>
);

export default CustomApp;
