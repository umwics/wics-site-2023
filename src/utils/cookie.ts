export const getCookie = (name: string): string => {
    const regex = new RegExp(`(?:(?:^|.*;*)${name}*=*([^;]*).*$)|^.*$`);
    return document.cookie.replace(regex, "$1");
};

export const setCookie = (name: string, value: string, time?: number): void => {
    document.cookie = `${name}=${value};path=/;max-age=${time || 31536000}`;
};
