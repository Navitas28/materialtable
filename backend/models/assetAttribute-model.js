const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const assetAttributeSchema = new Schema({
      name: {type: String},
      displayName: {type: String},
      data: { type: Array }
  }
);

module.exports = mongoose.model('AssetAttribute', assetAttributeSchema);
