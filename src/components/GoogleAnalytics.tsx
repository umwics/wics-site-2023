import React from "react";

interface Props {
    trackingId: string;
}

const GoogleAnalytics: React.FC<Props> = ({ trackingId }: Props) => {
    return (
        <React.Fragment>
            <script async src={`https://www.googletagmanager.com/gtag/js?id=${trackingId}`} />
            <script
                dangerouslySetInnerHTML={{
                    __html: `window.dataLayer = window.dataLayer || [];
                                function gtag() {
                                    dataLayer.push(arguments);
                                }
                                gtag("js", new Date());

                                gtag("config", "${trackingId}");`
                }}
            />
        </React.Fragment>
    );
};

export default GoogleAnalytics;
