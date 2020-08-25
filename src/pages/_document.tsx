import { ServerStyleSheets } from "@material-ui/core/styles";
import { RenderPageResult } from "next/dist/next-server/lib/utils";
import Document, {
    DocumentContext,
    DocumentInitialProps,
    Head,
    Html,
    Main,
    NextScript
} from "next/document";
import React from "react";

class CustomDocument extends Document {
    // `getInitialProps` belongs to `_document` (instead of `_app`),
    // it's compatible with server-side generation (SSG).
    static async getInitialProps(ctx: DocumentContext): Promise<DocumentInitialProps> {
        // Resolution order
        //
        // On the server:
        // 1. app.getInitialProps
        // 2. page.getInitialProps
        // 3. document.getInitialProps
        // 4. app.render
        // 5. page.render
        // 6. document.render
        //
        // On the server with error:
        // 1. document.getInitialProps
        // 2. app.render
        // 3. page.render
        // 4. document.render
        //
        // On the client
        // 1. app.getInitialProps
        // 2. page.getInitialProps
        // 3. app.render
        // 4. page.render

        const sheets = new ServerStyleSheets();
        const originalRenderPage = ctx.renderPage;

        ctx.renderPage = (): RenderPageResult | Promise<RenderPageResult> =>
            originalRenderPage({
                enhanceApp: App => props => sheets.collect(<App {...props} />)
            });

        const initialProps = await Document.getInitialProps(ctx);

        return {
            ...initialProps,
            // Styles fragment is rendered after the app and page rendering finish.
            styles: [...React.Children.toArray(initialProps.styles), sheets.getStyleElement()]
        };
    }

    render(): JSX.Element {
        return (
            <Html>
                <Head>
                    {/* PWA primary color */}
                    <meta name="theme-color" content="#3f51b5" />

                    {/* Global site tag (gtag.js) - Google Analytics */}
                    {/* <script
                        async
                        src="https://www.googletagmanager.com/gtag/js?id=UA-172962346-1"
                    />
                    <script
                        dangerouslySetInnerHTML={{
                            __html: `window.dataLayer = window.dataLayer || [];
                                    function gtag() {
                                        dataLayer.push(arguments);
                                    }
                                    gtag("js", new Date());

                                    gtag("config", "UA-172962346-1");`
                        }}
                    /> */}

                    {/* favicon */}
                    <link rel="shortcut icon" href="/favicon/favicon.ico" />
                    <link rel="icon" sizes="16x16 32x32 64x64" href="/favicon/favicon.ico" />
                    <link
                        rel="icon"
                        type="image/png"
                        sizes="196x196"
                        href="/favicon/favicon-192.png"
                    />
                    <link
                        rel="icon"
                        type="image/png"
                        sizes="160x160"
                        href="/favicon/favicon-160.png"
                    />
                    <link
                        rel="icon"
                        type="image/png"
                        sizes="96x96"
                        href="/favicon/favicon-96.png"
                    />
                    <link
                        rel="icon"
                        type="image/png"
                        sizes="64x64"
                        href="/favicon/favicon-64.png"
                    />
                    <link
                        rel="icon"
                        type="image/png"
                        sizes="32x32"
                        href="/favicon/favicon-32.png"
                    />
                    <link
                        rel="icon"
                        type="image/png"
                        sizes="16x16"
                        href="/favicon/favicon-16.png"
                    />
                    <link rel="apple-touch-icon" href="/favicon/favicon-57.png" />
                    <link rel="apple-touch-icon" sizes="114x114" href="/favicon/favicon-114.png" />
                    <link rel="apple-touch-icon" sizes="72x72" href="/favicon/favicon-72.png" />
                    <link rel="apple-touch-icon" sizes="144x144" href="/favicon/favicon-144.png" />
                    <link rel="apple-touch-icon" sizes="60x60" href="/favicon/favicon-60.png" />
                    <link rel="apple-touch-icon" sizes="120x120" href="/favicon/favicon-120.png" />
                    <link rel="apple-touch-icon" sizes="76x76" href="/favicon/favicon-76.png" />
                    <link rel="apple-touch-icon" sizes="152x152" href="/favicon/favicon-152.png" />
                    <link rel="apple-touch-icon" sizes="180x180" href="/favicon/favicon-180.png" />
                    <meta name="msapplication-TileColor" content="#FFFFFF" />
                    <meta name="msapplication-TileImage" content="/favicon/favicon-144.png" />
                    <meta name="msapplication-config" content="/favicon/browserconfig.xml" />
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}

export default CustomDocument;
