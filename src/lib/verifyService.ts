export const verifyService = <T>(service: () => T): T | null => {
    try {
        return <T>service();
    } catch (e) {
        console.error(e);
        return null;
    }
};
