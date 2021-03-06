const Asset = require('../models/asset-model');
exports.postFetchAssets = async (req, res, next) => {
  const filterData = req.body;
  const filterCriteria = await buildFilterQuery(filterData);
  const pageSize = +req.query.pagesize;
  const currentPage = +req.query.page;
  const assetQuery = Asset.find();
  if (pageSize && currentPage) {
    assetQuery.skip(pageSize * (currentPage - 1)).limit(pageSize);
  }

  try {
    const assetDataFromDB = await assetQuery
      .find(filterCriteria)
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
exports.getFilterObject = async (req, res, next) => {
  try {
     const assets = await Asset.find().distinct('assetDetails.location');
     res.status(200).json({
       assets
     });
  } catch(err) {
    res.status(500).json({
      err
    });
  }
}

buildFilterQuery = filterData => {
  const filterCriteria = {};
  for (const filter in filterData) {
    const selectedFilter = filterData[filter];
    if (selectedFilter.length) {
      const filterName = 'assetDetails' + '.' + filter;
      filterCriteria[filterName] = { $in: [] };
      for (const id of selectedFilter) {
        console.log(id);
        filterCriteria[filterName]['$in'].push(id);
      }
    }
  }
  console.log(filterCriteria);
  return filterCriteria;
};
