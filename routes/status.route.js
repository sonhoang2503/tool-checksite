const express = require('express');
const router = express.Router();
// const { errorSites } = require('../controllers/status.controller');
const {
  checkSites,
  resetCheckSites,
  errorSites,
} = require('../controllers/status.ctrl');
// const { uploadFile } = require('../helpers/multer');

router.route('/check-sites').post(checkSites).delete(resetCheckSites);
router.route('/error-sites').get(errorSites);

module.exports = router;
