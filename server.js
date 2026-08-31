const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Ensure data directory and files exist
const DATA_DIR = path.join(__dirname, 'data');
const INQUIRIES_FILE = path.join(DATA_DIR, 'inquiries.json');
const SAMPLES_FILE = path.join(DATA_DIR, 'samples.json');
const CONTACTS_FILE = path.join(DATA_DIR, 'contacts.json');

if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

const initJsonFile = (filePath) => {
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, JSON.stringify([], null, 2), 'utf8');
  }
};

initJsonFile(INQUIRIES_FILE);
initJsonFile(SAMPLES_FILE);
initJsonFile(CONTACTS_FILE);

// Helpers to read/write JSON
const readData = (filePath) => {
  try {
    const raw = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(raw || '[]');
  } catch (err) {
    console.error(`Error reading ${filePath}:`, err);
    return [];
  }
};

const writeData = (filePath, data) => {
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
    return true;
  } catch (err) {
    console.error(`Error writing ${filePath}:`, err);
    return false;
  }
};

// Generate unique ID
const generateId = (prefix = 'LNP') => {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `${prefix}-${timestamp}-${random}`;
};

// API Endpoints

// 1. Submit Wholesale Quotation / Inquiry
app.post('/api/inquiries', (req, res) => {
  try {
    const {
      name,
      company,
      phone,
      email,
      location,
      productTypes,
      estimatedQuantity,
      customizationNeeded,
      deliveryTimeline,
      message,
      source = 'website_calculator'
    } = req.body;

    if (!name || !phone) {
      return res.status(400).json({ success: false, error: 'Name and Phone number are required.' });
    }

    const inquiries = readData(INQUIRIES_FILE);
    const newInquiry = {
      id: generateId('QUOTE'),
      createdAt: new Date().toISOString(),
      name,
      company: company || 'Individual / Event',
      phone,
      email: email || 'Not provided',
      location: location || 'India',
      productTypes: Array.isArray(productTypes) ? productTypes : [productTypes].filter(Boolean),
      estimatedQuantity: estimatedQuantity || 'Not specified',
      customizationNeeded: customizationNeeded || 'Standard',
      deliveryTimeline: deliveryTimeline || 'Standard',
      message: message || '',
      source,
      status: 'New',
      notes: ''
    };

    inquiries.unshift(newInquiry);
    writeData(INQUIRIES_FILE, inquiries);

    return res.status(201).json({
      success: true,
      message: 'Wholesale inquiry submitted successfully! Our team will reach out within 2-4 hours.',
      inquiryId: newInquiry.id
    });
  } catch (err) {
    console.error('Error handling inquiry:', err);
    return res.status(500).json({ success: false, error: 'Internal server error processing inquiry.' });
  }
});

// 2. Request Sample Box
app.post('/api/samples', (req, res) => {
  try {
    const { name, phone, email, address, businessType, preferredProducts, notes } = req.body;

    if (!name || !phone || !address) {
      return res.status(400).json({ success: false, error: 'Name, Phone, and Delivery Address are required.' });
    }

    const samples = readData(SAMPLES_FILE);
    const newSample = {
      id: generateId('SMP'),
      createdAt: new Date().toISOString(),
      name,
      phone,
      email: email || 'Not provided',
      address,
      businessType: businessType || 'Caterer / Restaurant',
      preferredProducts: Array.isArray(preferredProducts) ? preferredProducts : [preferredProducts].filter(Boolean),
      notes: notes || '',
      status: 'Sample Requested',
      dispatchDetails: ''
    };

    samples.unshift(newSample);
    writeData(SAMPLES_FILE, samples);

    return res.status(201).json({
      success: true,
      message: 'Sample kit request received! We will verify details and dispatch your sample box shortly.',
      sampleId: newSample.id
    });
  } catch (err) {
    console.error('Error handling sample request:', err);
    return res.status(500).json({ success: false, error: 'Internal server error processing sample request.' });
  }
});

// 3. Submit General Contact Message
app.post('/api/contact', (req, res) => {
  try {
    const { name, phone, email, subject, message } = req.body;

    if (!name || !phone || !message) {
      return res.status(400).json({ success: false, error: 'Name, Phone, and Message are required.' });
    }

    const contacts = readData(CONTACTS_FILE);
    const newContact = {
      id: generateId('MSG'),
      createdAt: new Date().toISOString(),
      name,
      phone,
      email: email || 'Not provided',
      subject: subject || 'General Inquiry',
      message,
      status: 'Unread'
    };

    contacts.unshift(newContact);
    writeData(CONTACTS_FILE, contacts);

    return res.status(201).json({
      success: true,
      message: 'Thank you for reaching out! We will get back to you shortly.',
      contactId: newContact.id
    });
  } catch (err) {
    console.error('Error handling contact message:', err);
    return res.status(500).json({ success: false, error: 'Internal server error processing contact message.' });
  }
});

// 4. Live Statistics & Impact API
app.get('/api/stats', (req, res) => {
  try {
    const inquiries = readData(INQUIRIES_FILE);
    const samples = readData(SAMPLES_FILE);
    const contacts = readData(CONTACTS_FILE);

    res.json({
      success: true,
      stats: {
        totalInquiries: inquiries.length,
        totalSamples: samples.length,
        totalContacts: contacts.length,
        estimatedPlatesProduced: 1250000 + inquiries.length * 5000,
        plasticKgSaved: Math.round((1250000 + inquiries.length * 5000) * 0.025), // 25g plastic replaced per plate
        treesSavedCount: Math.round((1250000 + inquiries.length * 5000) / 1200)
      }
    });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Failed to compute stats.' });
  }
});

// 5. Admin - Fetch All Leads & Inquiries
app.get('/api/admin/leads', (req, res) => {
  try {
    const inquiries = readData(INQUIRIES_FILE);
    const samples = readData(SAMPLES_FILE);
    const contacts = readData(CONTACTS_FILE);

    res.json({
      success: true,
      data: {
        inquiries,
        samples,
        contacts
      }
    });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Failed to retrieve admin leads.' });
  }
});

// 6. Admin - Update Lead Status
app.patch('/api/admin/leads/:type/:id', (req, res) => {
  try {
    const { type, id } = req.params;
    const { status, notes } = req.body;

    let targetFile = INQUIRIES_FILE;
    if (type === 'samples') targetFile = SAMPLES_FILE;
    if (type === 'contacts') targetFile = CONTACTS_FILE;

    const list = readData(targetFile);
    const itemIndex = list.findIndex(item => item.id === id);

    if (itemIndex === -1) {
      return res.status(404).json({ success: false, error: 'Item not found.' });
    }

    if (status !== undefined) list[itemIndex].status = status;
    if (notes !== undefined) list[itemIndex].notes = notes;
    list[itemIndex].updatedAt = new Date().toISOString();

    writeData(targetFile, list);
    return res.json({ success: true, message: 'Status updated successfully.', item: list[itemIndex] });
  } catch (err) {
    return res.status(500).json({ success: false, error: 'Failed to update item.' });
  }
});

// 7. Admin - Export CSV
app.get('/api/admin/export', (req, res) => {
  try {
    const inquiries = readData(INQUIRIES_FILE);
    const samples = readData(SAMPLES_FILE);

    let csvContent = 'Lead ID,Date,Type,Name,Company/Business,Phone,Email,Location/Address,Products/Quantity,Status,Notes\n';

    inquiries.forEach(i => {
      csvContent += `"${i.id}","${i.createdAt}","Wholesale Quote","${i.name}","${i.company}","${i.phone}","${i.email}","${i.location}","${Array.isArray(i.productTypes) ? i.productTypes.join('; ') : ''} | Qty: ${i.estimatedQuantity}","${i.status}","${(i.notes || '').replace(/"/g, '""')}"\n`;
    });

    samples.forEach(s => {
      csvContent += `"${s.id}","${s.createdAt}","Sample Request","${s.name}","${s.businessType}","${s.phone}","${s.email}","${(s.address || '').replace(/"/g, '""')}","${Array.isArray(s.preferredProducts) ? s.preferredProducts.join('; ') : ''}","${s.status}","${(s.notes || '').replace(/"/g, '""')}"\n`;
    });

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename="lasya_natural_plates_leads.csv"');
    return res.send(csvContent);
  } catch (err) {
    return res.status(500).send('Error generating CSV');
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', brand: 'Lasya Natural Plates', time: new Date().toISOString() });
});

// Serve frontend for all standard routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start server
app.listen(PORT, () => {
  console.log(`🌿 Lasya Natural Plates Server running smoothly on http://localhost:${PORT}`);
});
