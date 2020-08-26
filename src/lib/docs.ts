import { promises as fs } from "fs";
import matter from "gray-matter";
import path from "path";
import { Doc } from "../interfaces";

const docsDirectory = path.join(process.cwd(), "src/docs");

const trimPathToSlug = (absPath: string): string => {
    return path
        .relative(docsDirectory, absPath)
        .replace(/\.md$/, "")
        .replace(new RegExp("\\" + path.sep, "g"), "/")
        .replace(/index$/, "");
};

export const getDocSlugs = async (dir: string = docsDirectory): Promise<string[]> => {
    const dirents = await fs.readdir(dir, { withFileTypes: true });
    const slugs = await Promise.all(
        dirents.map(async dirent => {
            const res = path.resolve(dir, dirent.name);
            return dirent.isDirectory() ? getDocSlugs(res) : trimPathToSlug(res);
        })
    );

    return slugs.flat();
};

export const getDoc = async (slug: string): Promise<Doc | null> => {
    const pathRoute = path.join(docsDirectory, slug);
    const fullPath = (await new Promise(resolve =>
        fs
            .access(`${pathRoute}.md`)
            .then(() => resolve(true))
            .catch(() => resolve(false))
    ))
        ? `${pathRoute}.md`
        : path.join(pathRoute, "index.md");

    try {
        const fileContents = await fs.readFile(fullPath, "utf8");
        const { data, content } = matter(fileContents);

        const doc = {
            ...data,
            slug,
            content
        };

        return doc;
    } catch {
        return null;
    }
};

export const getAllDocs = async (): Promise<Doc[]> => {
    const slugs = await getDocSlugs();
    return (await Promise.all(slugs.map(slug => getDoc(slug)))).filter((doc): doc is Doc => !!doc);
};
