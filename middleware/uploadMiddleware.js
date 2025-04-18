const multer = require('multer');
const path = require('path');

// Configure Multer storage options
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads'); 
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix);
  }
});

// Multer upload middleware
const upload = multer({ storage: storage });

module.exports = upload;
