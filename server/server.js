const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// JSON Fallback Data Storage paths
const DATA_DIR = path.join(__dirname, 'data');
const INQUIRIES_FILE = path.join(DATA_DIR, 'inquiries.json');
const SAMPLES_FILE = path.join(DATA_DIR, 'samples.json');

if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

const initJson = (file, defaultData = []) => {
  if (!fs.existsSync(file)) {
    fs.writeFileSync(file, JSON.stringify(defaultData, null, 2), 'utf8');
  }
};

initJson(INQUIRIES_FILE, []);
initJson(SAMPLES_FILE, []);

const readJson = (file) => {
  try {
    return JSON.parse(fs.readFileSync(file, 'utf8') || '[]');
  } catch (e) {
    return [];
  }
};

const writeJson = (file, data) => {
  try {
    fs.writeFileSync(file, JSON.stringify(data, null, 2), 'utf8');
    return true;
  } catch (e) {
    return false;
  }
};

// Database Connection (MongoDB with automatic graceful fallback)
let isMongoConnected = false;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/lasya_natural_plates';

mongoose.connect(MONGODB_URI, { serverSelectionTimeoutMS: 2000 })
  .then(() => {
    isMongoConnected = true;
    console.log('🍃 MongoDB Connected successfully to database: lasya_natural_plates');
  })
  .catch(() => {
    isMongoConnected = false;
    console.log('🍃 Note: Running in standalone mode with persistent storage active.');
  });

// Models
const Inquiry = require('./models/Inquiry');
const SampleRequest = require('./models/SampleRequest');

// Helper to generate IDs
const generateId = (prefix = 'LNP') => {
  const time = Date.now().toString(36).toUpperCase();
  const rand = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `${prefix}-${time}-${rand}`;
};

// ==========================================
// REST API ROUTES
// ==========================================

// 1. Submit Wholesale Quotation Request
app.post('/api/inquiries', async (req, res) => {
  try {
    const { name, company, phone, email, location, productTypes, estimatedQuantity, message, source } = req.body;

    if (!name || !phone) {
      return res.status(400).json({ success: false, error: 'Name and Phone number are required.' });
    }

    const newId = generateId('QUOTE');
    const inquiryData = {
      id: newId,
      name,
      company: company || 'Individual / Event',
      phone,
      email: email || 'Not provided',
      location: location || 'India',
      productTypes: Array.isArray(productTypes) ? productTypes : [productTypes].filter(Boolean),
      estimatedQuantity: estimatedQuantity || 'Bulk',
      message: message || '',
      source: source || 'react_calculator',
      status: 'New',
      notes: '',
      createdAt: new Date().toISOString()
    };

    if (isMongoConnected) {
      const doc = new Inquiry(inquiryData);
      await doc.save();
    }

    const currentList = readJson(INQUIRIES_FILE);
    currentList.unshift(inquiryData);
    writeJson(INQUIRIES_FILE, currentList);

    return res.status(201).json({
      success: true,
      message: 'Wholesale inquiry registered! Our team will contact you shortly.',
      inquiryId: newId
    });
  } catch (err) {
    console.error('Inquiry error:', err);
    return res.status(500).json({ success: false, error: 'Server error processing inquiry.' });
  }
});

// 2. Request Physical Sample Box
app.post('/api/samples', async (req, res) => {
  try {
    const { name, phone, email, businessType, address, preferredProducts } = req.body;

    if (!name || !phone || !address) {
      return res.status(400).json({ success: false, error: 'Name, Phone, and Delivery Address are required.' });
    }

    const newId = generateId('SMP');
    const sampleData = {
      id: newId,
      name,
      phone,
      email: email || 'Not provided',
      businessType: businessType || 'Caterer / Event Planner',
      address,
      preferredProducts: Array.isArray(preferredProducts) ? preferredProducts : [preferredProducts].filter(Boolean),
      status: 'Sample Requested',
      createdAt: new Date().toISOString()
    };

    if (isMongoConnected) {
      const doc = new SampleRequest(sampleData);
      await doc.save();
    }

    const currentList = readJson(SAMPLES_FILE);
    currentList.unshift(sampleData);
    writeJson(SAMPLES_FILE, currentList);

    return res.status(201).json({
      success: true,
      message: 'Sample kit request received! Dispatch will be scheduled within 24 hours.',
      sampleId: newId
    });
  } catch (err) {
    console.error('Sample error:', err);
    return res.status(500).json({ success: false, error: 'Server error processing sample request.' });
  }
});

// 3. Stats API
app.get('/api/stats', async (req, res) => {
  try {
    const inquiries = readJson(INQUIRIES_FILE);
    const samples = readJson(SAMPLES_FILE);

    const totalInquiries = inquiries.length;
    const totalSamples = samples.length;
    const estimatedPlatesProduced = 1250000 + totalInquiries * 5000;
    const plasticKgSaved = Math.round(estimatedPlatesProduced * 0.025);

    res.json({
      success: true,
      stats: {
        totalInquiries,
        totalSamples,
        estimatedPlatesProduced,
        plasticKgSaved,
        treesSavedCount: Math.round(estimatedPlatesProduced / 1200)
      }
    });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Failed to compute stats.' });
  }
});

// 4. Admin - Get All Leads
app.get('/api/admin/leads', async (req, res) => {
  try {
    const inquiries = readJson(INQUIRIES_FILE);
    const samples = readJson(SAMPLES_FILE);

    res.json({
      success: true,
      data: {
        inquiries,
        samples
      }
    });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Failed to retrieve admin leads.' });
  }
});

// 5. Admin - Update Lead Status
app.patch('/api/admin/leads/:type/:id', async (req, res) => {
  try {
    const { type, id } = req.params;
    const { status, notes } = req.body;

    const targetFile = type === 'samples' ? SAMPLES_FILE : INQUIRIES_FILE;
    const list = readJson(targetFile);
    const index = list.findIndex(item => item.id === id);

    if (index === -1) {
      return res.status(404).json({ success: false, error: 'Lead not found.' });
    }

    if (status) list[index].status = status;
    if (notes !== undefined) list[index].notes = notes;
    list[index].updatedAt = new Date().toISOString();

    writeJson(targetFile, list);

    if (isMongoConnected) {
      const Model = type === 'samples' ? SampleRequest : Inquiry;
      await Model.findOneAndUpdate({ id }, { status, notes, updatedAt: new Date() });
    }

    return res.json({ success: true, message: 'Status updated successfully.', item: list[index] });
  } catch (err) {
    return res.status(500).json({ success: false, error: 'Failed to update lead status.' });
  }
});

// 6. Admin - Delete Lead
app.delete('/api/admin/leads/:type/:id', async (req, res) => {
  try {
    const { type, id } = req.params;
    const targetFile = type === 'samples' ? SAMPLES_FILE : INQUIRIES_FILE;
    let list = readJson(targetFile);
    list = list.filter(item => item.id !== id);
    writeJson(targetFile, list);

    if (isMongoConnected) {
      const Model = type === 'samples' ? SampleRequest : Inquiry;
      await Model.findOneAndDelete({ id });
    }

    return res.json({ success: true, message: 'Lead removed successfully.' });
  } catch (err) {
    return res.status(500).json({ success: false, error: 'Failed to delete lead.' });
  }
});

// 7. Admin - Export CSV
app.get('/api/admin/export', (req, res) => {
  try {
    const inquiries = readJson(INQUIRIES_FILE);
    const samples = readJson(SAMPLES_FILE);

    let csv = 'Lead ID,Date,Type,Name,Company,Phone,Email,Location/Address,Products/Quantity,Status,Notes\n';

    inquiries.forEach(i => {
      csv += `"${i.id}","${i.createdAt}","Wholesale Quote","${i.name}","${i.company}","${i.phone}","${i.email}","${i.location}","${Array.isArray(i.productTypes) ? i.productTypes.join('; ') : ''} | Qty: ${i.estimatedQuantity}","${i.status}","${(i.notes || '').replace(/"/g, '""')}"\n`;
    });

    samples.forEach(s => {
      csv += `"${s.id}","${s.createdAt}","Sample Request","${s.name}","${s.businessType}","${s.phone}","${s.email}","${(s.address || '').replace(/"/g, '""')}","${Array.isArray(s.preferredProducts) ? s.preferredProducts.join('; ') : ''}","${s.status}","${(s.notes || '').replace(/"/g, '""')}"\n`;
    });

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename="lasya_natural_plates_leads.csv"');
    return res.send(csv);
  } catch (e) {
    return res.status(500).send('Error creating CSV');
  }
});

// Serve frontend build if in production
const clientBuildPath = path.join(__dirname, '../client/dist');
if (fs.existsSync(clientBuildPath)) {
  app.use(express.static(clientBuildPath));
  app.get('*', (req, res) => {
    res.sendFile(path.join(clientBuildPath, 'index.html'));
  });
}

// Start Express Server
app.listen(PORT, () => {
  console.log(`🌿 Lasya Natural Plates (MERN Backend) active on port ${PORT}`);
});
