import admin from "firebase-admin";
import * as functions from "firebase-functions";
import fs from "fs-extra";
import os from "os";
import path from "path";
import sharp from "sharp";

admin.initializeApp();

const thumbSizes = [200];

export const generateThumbnail = functions.storage.object().onFinalize(async object => {
    const filePath = object.name || "";
    const fileName = path.basename(filePath);
    const fileBucket = object.bucket;
    const contentType = object.contentType || "";
    const metadata = {
        contentType: contentType
    };

    const workingDir = path.join(os.tmpdir(), "thumbs");
    const tempFilePath = path.join(workingDir, "source.png");

    // check if the file is not an image.
    if (!contentType.startsWith("image/")) return functions.logger.info("Not an image.");

    const bucket = admin.storage().bucket(fileBucket);

    await fs.ensureDir(workingDir);
    await bucket.file(filePath).download({ destination: tempFilePath });

    const uploads = thumbSizes.map(async size => {
        const thumbName = `thumb_${size}_${fileName}`;
        const thumbPath = path.join(workingDir, thumbName);

        await sharp()
            .resize(size, size, { fit: "inside", withoutEnlargement: true })
            .toFile(thumbPath);

        return bucket.upload(thumbPath, {
            destination: path.join(path.dirname(filePath), thumbName),
            metadata
        });
    });

    await Promise.all(uploads);

    return fs.remove(workingDir);
});
