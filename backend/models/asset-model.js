const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const assetSchema = new Schema(
  {
    assetDetails: {
      serialNumber: { type: String },
      assetTag: { type: String, required: true },
      model: { type: String, requires: true },
      status: { type: String },
      warrantyStartDate: { type: Date },
      warrantyEndDate: { type: Date },
      location: { type: String, required: true },
      subLocation: { type: String },
      costCenter: { type: String },
      assetType: { type: String, required: true },
  },
  }
);

module.exports = mongoose.model('Asset', assetSchema);
