const { initializeApp, cert } = require("firebase-admin/app");
const { getStorage } = require("firebase-admin/storage");
const serviceAccountKey = require("./firebaseServiceKey");

exports.app = initializeApp({
  credential: cert(serviceAccountKey),
  storageBucket: `gs://car-rental-789b0.appspot.com`,
});

exports.bucket = getStorage().bucket();
