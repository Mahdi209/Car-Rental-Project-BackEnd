const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-";
    const fileName = uniqueSuffix + file.originalname;
    cb(null, fileName);
  },
});
const fileFilterFn = (req, file, cb) => {
  const filetypes = /jpeg|png|jpg/;
  const mimetype = filetypes.test(file.mimetype);
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  if (mimetype || extname) {
    return cb(null, true);
  }
  cb(
    new Error(
      "Error: File upload only supports the following filetypes - jpeg, png, jpg"
    )
  );
};
const fileUpload = multer({ storage: storage, fileFilter: fileFilterFn });
module.exports = fileUpload;
