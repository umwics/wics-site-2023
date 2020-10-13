import React, { createContext, useContext, useMemo, useState } from "react";
import { getTranslation, Translate } from "../lib/translations";

export interface LanguageContextInstance {
    t: Translate;
    locale: string;
    setLocale: (locale: string) => void;
}

const LanguageContext = createContext<LanguageContextInstance>({} as LanguageContextInstance);

interface LanguageProviderProps {
    children: React.ReactNode;
}

const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }: LanguageProviderProps) => {
    const [locale, setLocale] = useState("en");
    const t = useMemo(() => getTranslation(locale), [locale]);

    return (
        <LanguageContext.Provider value={{ t, locale, setLocale }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useTranslation = (): LanguageContextInstance => {
    return useContext(LanguageContext);
};

export default LanguageProvider;
