const multer = require("multer");

const paths = "./public/image";
const store = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, paths);
  },
  filename: (req, file, cb) => {
    const origin = file.originalname;
    const imgName = Date.now();
    cb(null, imgName + origin);
  },
});

const upload = multer({
  storage: store,
  limits: { fileSize: 2000000 },
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype === "image/png" ||
      file.mimetype === "image/jpg" ||
      file.mimetype === "image/jpeg"
    ) {
      cb(null, true);
    } else {
      cb(new Error("file format error!"));
    }
  },
});

module.exports = upload;
