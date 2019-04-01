const Asset = require('../models/asset-model');

exports.postFetchAssets = async (req, res, next) => {
  const pageSize = +req.query.pagesize;
  const currentPage = +req.query.page;
  const assetQuery = Asset.find();
  if (pageSize && currentPage) {
    assetQuery.skip(pageSize * (currentPage - 1)).limit(pageSize);
  }

  try {
    const assetDataFromDB = await assetQuery
      .find()
      .select(
        'assetDetails.serialNumber assetDetails.assetTag assetDetails.location assetDetails.assetType assetDetails.model'
      );
    const assetDataLength = await Asset.countDocuments();

    res.status(200).json({
      assetDataFromDB,
      assetDataLength
    });
  } catch (err) {
    res.status(500).json({
      err
    });
  }
};
