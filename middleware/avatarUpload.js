const multer = require("multer");

const storage = multer.diskStorage({
  destination(req, file, callback) {
    // Specify the destination directory for file uploads
    callback(null, "./avatarUploads");
  },
  filename(req, file, callback) {
    // Generate a unique filename for the uploaded file
    callback(null, `${Date.now()}_${file.originalname}`);
  },
});

// Use multer middleware with the configured storage
const avatarUpload = multer({ storage });

module.exports = avatarUpload;