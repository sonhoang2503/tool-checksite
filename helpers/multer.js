const multer = require('multer');

const upload = multer({
  storage: multer.diskStorage({}),
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('text')) {
      cb(null, true);
    } else {
      cb(new Error('Please upload text only'), false);
    }
  },
});

exports.uploadFile = upload.single('file');
