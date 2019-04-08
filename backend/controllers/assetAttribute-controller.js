const Assetattribute = require('../models/assetAttribute-model');

exports.getFilterObject = async (req, res, next) => {

try{
  const asset = await Assetattribute.find();
  res.status(200).json({
    asset
  });
}catch(err) {
  res.status(500).json(err);
}
};
