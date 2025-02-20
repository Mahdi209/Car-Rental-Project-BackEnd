const fs = require("fs");
const { promisify } = require("util");
const unlinkAsync = promisify(fs.unlink);
const { bucket } = require("./firebaseAdminService");
const { getDownloadURL } = require("firebase-admin/storage");

const getFirebaseImageUrl = async (destinationName, filePath, fileName) => {
    let imageUrl;
    try {
        const remoteFilePath = `${destinationName}/${fileName}`;
        const [uploadFile] = await bucket.upload(filePath, {
            destination: remoteFilePath,
        });

        imageUrl = await getDownloadURL(uploadFile);
    } catch (error) {
        console.error("Error uploading file to Firebase Storage:", error);
        throw error;
    } finally {
        try {
            await unlinkAsync(filePath);
        } catch (unlinkError) {
            console.error("Error deleting local file:", unlinkError);
        }
    }
    return imageUrl;
};

module.exports = getFirebaseImageUrl;