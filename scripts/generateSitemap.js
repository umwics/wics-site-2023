const fs = require("fs");

const globby = require("globby");
const prettier = require("prettier");

(async () => {
    const prettierConfig = await prettier.resolveConfig("./.prettierrc");

    const fileTypes = ["jsx", "js", "tsx", "ts"];
    const fileTypesDot = fileTypes.map(ft => "." + ft);

    // Ignore Next.js specific files (e.g., _app.js) and API routes.
    const pageRoutes = (base = "") => [
        `${base}pages/**/*{${fileTypesDot.join(",")}}`,
        `!${base}pages/_*{${fileTypesDot.join(",")}}`,
        `!${base}pages/api`,
        `!${base}pages/admin`,
        `!${base}pages/login{${fileTypesDot.join(",")}}`,
        `!${base}pages/register{${fileTypesDot.join(",")}}`
    ];
    const pages = await globby([...pageRoutes(), ...pageRoutes("src/")]);
    const sitemap = `
        <?xml version="1.0" encoding="UTF-8"?>
        <urlset xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
            ${pages
                .map(page => {
                    const path = page.replace(
                        new RegExp("src/pages|pages|" + fileTypesDot.join("|"), "gi"),
                        ""
                    );
                    const route = path.replace(/\/index$/i, "");

                    return `
                        <url>
                            <loc>http://umwics.vercel.app${route}</loc>
                        </url>
                    `;
                })
                .join("")}
        </urlset>
    `;

    // If you're not using Prettier, you can remove this.
    const formatted = prettier.format(sitemap, {
        ...prettierConfig,
        parser: "html"
    });

    fs.writeFileSync("public/sitemap.xml", formatted);
})();
