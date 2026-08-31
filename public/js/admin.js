/**
 * LASYA NATURAL PLATES - ADMIN LEAD MANAGEMENT CONTROLLER
 */

document.addEventListener('DOMContentLoaded', () => {
  const statInquiriesCount = document.getElementById('statInquiriesCount');
  const statSamplesCount = document.getElementById('statSamplesCount');
  const statPlatesEstimated = document.getElementById('statPlatesEstimated');
  const statPlasticSaved = document.getElementById('statPlasticSaved');
  const inquiriesTableBody = document.getElementById('inquiriesTableBody');
  const samplesTableBody = document.getElementById('samplesTableBody');
  const refreshLeadsBtn = document.getElementById('refreshLeadsBtn');

  async function loadAdminData() {
    try {
      // 1. Fetch stats
      const statsRes = await fetch('/api/stats');
      const statsData = await statsRes.json();
      if (statsData.success) {
        statInquiriesCount.textContent = statsData.stats.totalInquiries;
        statSamplesCount.textContent = statsData.stats.totalSamples;
        statPlatesEstimated.textContent = (statsData.stats.estimatedPlatesProduced / 100000).toFixed(1) + ' Lakh';
        statPlasticSaved.textContent = statsData.stats.plasticKgSaved.toLocaleString('en-IN') + ' kg';
      }

      // 2. Fetch leads
      const leadsRes = await fetch('/api/admin/leads');
      const leadsData = await leadsRes.json();

      if (leadsData.success) {
        renderInquiries(leadsData.data.inquiries || []);
        renderSamples(leadsData.data.samples || []);
      }
    } catch (err) {
      console.error('Failed to load admin leads:', err);
    }
  }

  function renderInquiries(inquiries) {
    if (inquiries.length === 0) {
      inquiriesTableBody.innerHTML = `
        <tr>
          <td colspan="8" style="text-align: center; padding: 24px; color: var(--color-text-muted);">
            No wholesale inquiries received yet. New website submissions will appear here automatically.
          </td>
        </tr>`;
      return;
    }

    inquiriesTableBody.innerHTML = inquiries.map(inq => {
      const dateStr = new Date(inq.createdAt).toLocaleDateString('en-IN', {
        day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit'
      });
      const cleanPhone = (inq.phone || '').replace(/[^0-9]/g, '');
      const productsText = Array.isArray(inq.productTypes) ? inq.productTypes.join(', ') : (inq.productTypes || 'Assorted');

      return `
        <tr>
          <td><strong style="color: var(--color-brand-primary);">${inq.id}</strong></td>
          <td style="font-size: 0.8rem; color: var(--color-text-muted);">${dateStr}</td>
          <td>
            <strong>${inq.name}</strong><br>
            <span style="font-size: 0.78rem; color: var(--color-text-muted);">${inq.company}</span>
          </td>
          <td>
            <a href="tel:${cleanPhone}" style="color: var(--color-brand-primary); font-weight: 600;">${inq.phone}</a><br>
            <span style="font-size: 0.78rem; color: var(--color-text-muted);">${inq.email}</span>
          </td>
          <td>${inq.location}</td>
          <td>
            <span style="font-size: 0.82rem; font-weight: 600;">${inq.estimatedQuantity}</span><br>
            <span style="font-size: 0.75rem; color: var(--color-text-muted);">${productsText}</span>
          </td>
          <td>
            <select class="form-control" style="padding: 4px 8px; font-size: 0.8rem;" onchange="updateInquiryStatus('${inq.id}', this.value)">
              <option value="New" ${inq.status === 'New' ? 'selected' : ''}>🌱 New</option>
              <option value="Contacted" ${inq.status === 'Contacted' ? 'selected' : ''}>📞 Contacted</option>
              <option value="Quotation Sent" ${inq.status === 'Quotation Sent' ? 'selected' : ''}>📄 Quoted</option>
              <option value="Converted" ${inq.status === 'Converted' ? 'selected' : ''}>✅ Converted</option>
            </select>
          </td>
          <td>
            <div style="display: flex; gap: 6px;">
              <a href="https://wa.me/${cleanPhone}?text=Hello%20${encodeURIComponent(inq.name)},%20thank%20you%20for%20contacting%20Lasya%20Natural%20Plates.%20Regarding%20your%20inquiry%20${inq.id}:" target="_blank" class="btn btn-sm btn-whatsapp" style="padding: 4px 8px; font-size: 0.75rem;" title="WhatsApp Lead">
                <i class="fa-brands fa-whatsapp"></i>
              </a>
              <a href="tel:${cleanPhone}" class="btn btn-sm btn-secondary" style="padding: 4px 8px; font-size: 0.75rem;" title="Call Lead">
                <i class="fa-solid fa-phone"></i>
              </a>
            </div>
          </td>
        </tr>
      `;
    }).join('');
  }

  function renderSamples(samples) {
    if (samples.length === 0) {
      samplesTableBody.innerHTML = `
        <tr>
          <td colspan="8" style="text-align: center; padding: 24px; color: var(--color-text-muted);">
            No sample requests received yet.
          </td>
        </tr>`;
      return;
    }

    samplesTableBody.innerHTML = samples.map(s => {
      const dateStr = new Date(s.createdAt).toLocaleDateString('en-IN', {
        day: '2-digit', month: 'short', year: 'numeric'
      });
      const cleanPhone = (s.phone || '').replace(/[^0-9]/g, '');

      return `
        <tr>
          <td><strong style="color: var(--color-brand-primary);">${s.id}</strong></td>
          <td style="font-size: 0.8rem; color: var(--color-text-muted);">${dateStr}</td>
          <td><strong>${s.name}</strong></td>
          <td><span class="status-badge status-contacted">${s.businessType}</span></td>
          <td><a href="tel:${cleanPhone}" style="color: var(--color-brand-primary);">${s.phone}</a></td>
          <td style="max-width: 250px; font-size: 0.82rem;">${s.address}</td>
          <td>
            <select class="form-control" style="padding: 4px 8px; font-size: 0.8rem;" onchange="updateSampleStatus('${s.id}', this.value)">
              <option value="Sample Requested" ${s.status === 'Sample Requested' ? 'selected' : ''}>📦 Requested</option>
              <option value="Dispatched" ${s.status === 'Dispatched' ? 'selected' : ''}>🚚 Dispatched</option>
              <option value="Delivered" ${s.status === 'Delivered' ? 'selected' : ''}>✅ Delivered</option>
            </select>
          </td>
          <td>
            <a href="https://wa.me/${cleanPhone}?text=Hello%20${encodeURIComponent(s.name)},%20your%20Lasya%20Natural%20Plates%20Sample%20Box%20(${s.id})%20update:" target="_blank" class="btn btn-sm btn-whatsapp" style="padding: 4px 8px; font-size: 0.75rem;">
              <i class="fa-brands fa-whatsapp"></i> Update
            </a>
          </td>
        </tr>
      `;
    }).join('');
  }

  window.updateInquiryStatus = async (id, status) => {
    try {
      await fetch(`/api/admin/leads/inquiries/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });
      loadAdminData();
    } catch (e) {
      console.error(e);
    }
  };

  window.updateSampleStatus = async (id, status) => {
    try {
      await fetch(`/api/admin/leads/samples/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });
      loadAdminData();
    } catch (e) {
      console.error(e);
    }
  };

  if (refreshLeadsBtn) {
    refreshLeadsBtn.addEventListener('click', loadAdminData);
  }

  loadAdminData();
});
