const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/user");
  },
  filename: (req, file, cb) => {
    console.log(file);
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname)
    );
  },
});

const fileFilter = (req, file, cb) => {
  const ext = path.extname(file.originalname);

  if (ext !== ".png" && ext !== ".jpg" && ext !== ".gif" && ext !== ".jpeg") {
    return cb(new Error("Only images are allowed"), "test");
  }
  cb(null, true);
};

const limits = {
  fileSize: 2 * 1024 * 1024,
};

const uploadUser = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: limits,
}).single("picture");

const upload = (req, res, next) => {
  uploadUser(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      console.log(multer.MulterError);
      return res.json({
        success: false,
        message: err.message,
      });
    } else if (err) {
      console.log(err);
      return res.json({
        success: false,
        message: "Failed to upload picture!",
      });
    }
    next();
  });
};

module.exports = upload;
