const express = require('express');

const assetController = require('../controllers/asset-controller');

const router = express.Router();

router.post('/fetch-assets', assetController.postFetchAssets);

module.exports = router;
