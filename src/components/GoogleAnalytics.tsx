import React from "react";

const GoogleAnalytics: React.FC = () => {
    return (
        <React.Fragment>
            <script async src="https://www.googletagmanager.com/gtag/js?id=UA-172962346-1" />
            <script
                dangerouslySetInnerHTML={{
                    __html: `window.dataLayer = window.dataLayer || [];
                                function gtag() {
                                    dataLayer.push(arguments);
                                }
                                gtag("js", new Date());

                                gtag("config", "UA-172962346-1");`
                }}
            />
        </React.Fragment>
    );
};

export default GoogleAnalytics;
