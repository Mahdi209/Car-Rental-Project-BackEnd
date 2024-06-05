const admin = require("firebase-admin");
const serviceAccountKey = require("./firebaseServiceKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccountKey),
  storageBucket: "car-rental-789b0.appspot.com",
});

exports.db = admin.firestore();

exports.bucket = admin.storage().bucket();
