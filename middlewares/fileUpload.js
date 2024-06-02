const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "static/images");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-";
    const fileName = uniqueSuffix + file.originalname;
    cb(null, fileName);
  },
});
const fileFilterFn = (req, file, cb) => {
  let filetypes = /jpeg||png||jpg/;
  let mimetype = filetypes.test(file.mimetype);
  let extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  if (mimetype || extname) {
    return cb(null, true);
  }
  cb("Error: File upload only supports the following filetypes -" + filetypes);
};
const fileUpload = multer({ storage: storage, fileFilter: fileFilterFn });
module.exports = fileUpload;
