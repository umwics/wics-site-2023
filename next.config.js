const { PHASE_DEVELOPMENT_SERVER } = require("next/constants");

const baseConfig = {
    poweredByHeader: false,
    target: "experimental-serverless-trace",
    i18n: {
        locales: ["en"],
        defaultLocale: "en"
    },
    // Using env as config since runtime config isn't supported by serverless deployments
    env: {
        url: "https://umwics.vercep.app",
        siteName: "umwics",
        siteDisplayName: "U of M WICS",
        description: "U of M Women in Computer Science",
        locale: "en_CA",
        apiVersion: "v1",
        googleAnalyticsTrackingId: "UA-172962346-1"
    },

    typescript: {
        // !! WARN !!
        // Dangerously allow production builds to successfully complete even if
        // your project has type errors.
        // !! WARN !!
        ignoreBuildErrors: true
    }
};

module.exports = (phase, { defaultConfig }) => {
    if (phase === PHASE_DEVELOPMENT_SERVER) {
        return {
            /* development only config options here */
            ...defaultConfig,
            ...baseConfig
        };
    }

    return {
        ...defaultConfig,
        ...baseConfig
    };
};
