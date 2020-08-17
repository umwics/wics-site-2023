export const getAsString = (param: string | string[]): string => {
    return Array.isArray(param) ? param[0] : param;
};

export const getAsArray = (param: string | string[]): string[] => {
    return Array.isArray(param) ? param : [param];
};
