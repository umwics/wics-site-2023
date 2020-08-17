import { CssBaseline, ThemeProvider } from "@material-ui/core";
import { NextComponentType } from "next";
import { DefaultSeo } from "next-seo";
import { AppContext, AppInitialProps, AppProps } from "next/app";
import { Router } from "next/router";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import React from "react";
import ConfirmProvider from "../components/ConfirmProvider";
import { AuthProvider } from "../lib/auth";
import { theme } from "../lib/theme";

NProgress.configure({ showSpinner: false, trickleSpeed: 300 });

Router.events.on("routeChangeStart", () => {
    NProgress.start();
});

Router.events.on("routeChangeComplete", () => {
    NProgress.done();
});

Router.events.on("routeChangeError", () => {
    NProgress.done();
});

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
                    <Component {...pageProps} />
                </ConfirmProvider>
            </ThemeProvider>
        </AuthProvider>
    </React.Fragment>
);

export default CustomApp;
