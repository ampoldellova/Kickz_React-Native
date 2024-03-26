const express = require('express');
const router = express.Router();
const upload = require('../utils/multer');

const BrandController = require('../controllers/BrandController');

router.post('/create/brand', upload.array('images'), BrandController.createBrand);

module.exports = router;