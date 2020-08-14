import { CssBaseline, ThemeProvider } from "@material-ui/core";
import { NextComponentType } from "next";
import { DefaultSeo } from "next-seo";
import { AppContext, AppInitialProps, AppProps } from "next/app";
import { Router } from "next/router";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import React from "react";
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
    <AuthProvider>
        <DefaultSeo
            title={process.env.siteDisplayName}
            description={process.env.description}
            openGraph={{
                type: "website",
                locale: process.env.locale,
                site_name: process.env.siteName
            }}
        />
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Component {...pageProps} />
        </ThemeProvider>
    </AuthProvider>
);

export default CustomApp;
