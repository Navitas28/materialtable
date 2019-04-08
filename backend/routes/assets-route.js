const express = require('express');

const assetController = require('../controllers/asset-controller');
const assetAttributeController = require('../controllers/assetAttribute-controller');

const router = express.Router();

router.post('/fetch-assets', assetController.postFetchAssets);

router.get('/get-filter-object', assetAttributeController.getFilterObject);

module.exports = router;
