import { CookieSerializeOptions, parse, serialize } from "cookie";

export const getCookies = (): Record<string, string> => {
    return parse(document.cookie);
};

export const getCookie = (name: string): string | undefined => {
    return parse(document.cookie)[name];
};

export const deleteCookie = (name: string, options?: CookieSerializeOptions): void => {
    document.cookie = serialize(name, "", { path: "/", ...options, expires: new Date(0) });
};

export const setCookie = (name: string, value: string, options?: CookieSerializeOptions): void => {
    document.cookie = serialize(name, value, { path: "/", ...options });
};
