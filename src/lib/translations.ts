import { mapTranslations } from "../utils/mapTranslations";

const files = require.context("../translations", false, /translations.*\.json$/);
export const translations = mapTranslations(files);

export interface Translations {
    [locale: string]: any;
}

export type Translate = (key: string) => string;

export const getTranslation = (locale: string) => (key: string): string => {
    const language = translations[locale];

    if (!language) return "…";

    return language[key] || translations.en[key];
};
