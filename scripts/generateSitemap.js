const sitemap = require("nextjs-sitemap-generator");

const prettier = require("prettier");
const fs = require("fs").promises;

const sitemapConfig = {
    baseUrl: "https://umwics.vercel.app",
    ignoreIndexFiles: true,
    ignoredPaths: ["admin", "api", "login", "register", "404"],
    ignoredExtensions: ["js", "map"],
    pagesDirectory: "./.next/serverless/pages",
    targetDirectory: "public/",
    sitemapFilename: "sitemap.xml",
    pagesConfig: {}
};

const formatSitemapPrettier = async () => {
    const prettierConfig = await prettier.resolveConfig("./.prettierrc");

    const sitemapFile = await fs.readFile(
        sitemapConfig.targetDirectory + sitemapConfig.sitemapFilename,
        "utf8"
    );

    const formattedFile = prettier.format(sitemapFile, {
        ...prettierConfig,
        parser: "html"
    });

    await fs.writeFile(
        sitemapConfig.targetDirectory + sitemapConfig.sitemapFilename,
        formattedFile
    );
};

const generateSitemap = async _buildId => {
    await sitemap(sitemapConfig);

    // If you're not using Prettier, you can remove this.
    await formatSitemapPrettier();
};

generateSitemap();
