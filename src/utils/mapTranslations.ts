import { Translations } from "../lib/translations";

export const mapTranslations = (files: __WebpackModuleApi.RequireContext): Translations => {
    const translations: Translations = {};

    files.keys().forEach(filename => {
        const match = filename.match(new RegExp(`-([a-z]{2}).json$`));

        if (match) translations[match[1]] = files(filename);
        else translations.en = files(filename);
    });

    return translations;
};
