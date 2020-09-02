import { storage } from "./firebase";

export const getFile = async (path: string): Promise<string | null> => {
    if (storage) {
        const storageRef = storage.ref();
        const file = storageRef.child(path);

        return await new Promise((resolve, _reject) =>
            file
                .getDownloadURL()
                .then(resolve)
                .catch(() => resolve(null))
        );
    }

    return null;
};

export const storeFile = async (
    file: File,
    path: string,
    progressCallback?: (progress: number) => any
): Promise<string | null> => {
    if (storage) {
        const storageRef = storage.ref();
        const uploadTask = storageRef.child(path).put(file, {
            contentType: file.type
        });

        return await new Promise((resolve, reject) =>
            uploadTask.on(
                "state_changed",
                snapshot => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    progressCallback && progressCallback(progress);
                },
                reject,
                () => {
                    uploadTask.snapshot.ref.getDownloadURL().then(resolve).catch(reject);
                }
            )
        );
    }

    return null;
};

export const deleteFile = async (path: string): Promise<boolean> => {
    if (storage) {
        const storageRef = storage.ref();

        return await new Promise((resolve, _reject) => {
            storageRef
                .child(path)
                .delete()
                .then(() => resolve(true))
                .catch(() => resolve(false));
        });
    }

    return false;
};

export const storeImage = async (
    image: File,
    collection: string,
    uuid: string,
    progressCallback?: (progress: number) => any
): Promise<string | null> => {
    const ext = image.name.split(".").pop();
    const path = `images/${collection}/${uuid}${ext ? "." + ext.toLowerCase() : ""}`;

    return storeFile(image, path, progressCallback);
};
