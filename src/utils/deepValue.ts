// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const deepValue = (obj: any, path: string): any => {
    if (path.length === 0) return obj;

    const idx = path.search(/\[./);
    if (idx < 0) {
        return obj[path];
    } else {
        const [key, remaining] = [path.substring(0, idx), path.substring(idx)];
        obj = key ? obj[key] : obj;

        if (remaining.charAt(0) === "[") {
            const endIdx = remaining.indexOf("]");
            const [num, rem] = [remaining.substring(1, endIdx), remaining.substring(endIdx + 1)];

            return deepValue(obj[num], rem.startsWith(".") ? rem.slice(1) : rem);
        } else {
            return deepValue(obj, remaining);
        }
    }
};
