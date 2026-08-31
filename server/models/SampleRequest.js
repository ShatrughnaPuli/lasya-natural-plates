const mongoose = require('mongoose');

const sampleRequestSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, default: 'Not provided' },
  businessType: { type: String, default: 'Caterer / Event Planner' },
  address: { type: String, required: true },
  preferredProducts: { type: [String], default: [] },
  notes: { type: String, default: '' },
  status: { type: String, default: 'Sample Requested' },
  dispatchDetails: { type: String, default: '' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.models.SampleRequest || mongoose.model('SampleRequest', sampleRequestSchema);
