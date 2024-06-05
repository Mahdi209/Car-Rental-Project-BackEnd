const { bucket } = require("./firebaseAdminSetup");
const { getDownloadURL } = require("firebase-admin/storage");
const getFirebaseImageUrl = async (destinationName, filePath, fileName) => {
  const remoteFilePath = `${destinationName}/${fileName}`;
  const [uploadFile] = await bucket.upload(filePath, {
    destination: remoteFilePath,
  });
  console.log("uploadFile", uploadFile);

  const imageUrl = await getDownloadURL(uploadFile);
  console.log("imageUrl", imageUrl);
  return imageUrl;
};
module.exports = getFirebaseImageUrl;
