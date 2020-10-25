import { useRouter } from "next/router";
import React, { createContext, useContext, useMemo } from "react";
import { getTranslation, Translate } from "../lib/translations";

export interface LanguageContextInstance {
    t: Translate;
    locale: string;
}

const LanguageContext = createContext<LanguageContextInstance>({} as LanguageContextInstance);

interface LanguageProviderProps {
    children: React.ReactNode;
}

const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }: LanguageProviderProps) => {
    const { locale, defaultLocale = "en" } = useRouter();
    const t = useMemo(() => getTranslation(locale || defaultLocale), [locale]);

    return (
        <LanguageContext.Provider value={{ t, locale: locale || defaultLocale }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useTranslation = (): LanguageContextInstance => {
    return useContext(LanguageContext);
};

export default LanguageProvider;
