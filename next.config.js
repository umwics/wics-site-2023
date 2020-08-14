const { PHASE_DEVELOPMENT_SERVER } = require("next/constants");

const baseConfig = {
    poweredByHeader: false,
    // Using env as config since runtime config isn't supported by serverless deployments
    env: {
        url: "https://umwics.vercep.app",
        siteName: "umwics",
        siteDisplayName: "U of M WICS",
        description: "U of M Women in Computer Science",
        locale: "en_CA"
    },
    webpack: (config, { isServer }) => {
        isServer && require("./scripts/generateSitemap");

        return config;
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
