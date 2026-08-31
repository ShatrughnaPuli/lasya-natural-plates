const mongoose = require('mongoose');

const inquirySchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  company: { type: String, default: 'Individual / Event' },
  phone: { type: String, required: true },
  email: { type: String, default: 'Not provided' },
  location: { type: String, default: 'India' },
  productTypes: { type: [String], default: [] },
  estimatedQuantity: { type: String, default: 'Bulk' },
  customizationNeeded: { type: String, default: 'Standard' },
  deliveryTimeline: { type: String, default: 'Standard' },
  message: { type: String, default: '' },
  source: { type: String, default: 'react_website' },
  status: { type: String, default: 'New' },
  notes: { type: String, default: '' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.models.Inquiry || mongoose.model('Inquiry', inquirySchema);
