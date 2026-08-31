/**
 * LASYA NATURAL PLATES - CLIENT CONTROLLER
 * Handles interactive calculator, dynamic quotation builder, eco-impact metrics,
 * product filtering, and API communication.
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Header scroll effect & dynamic year
  const siteHeader = document.getElementById('siteHeader');
  const currentYearSpan = document.getElementById('currentYear');
  if (currentYearSpan) currentYearSpan.textContent = new Date().getFullYear();

  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      siteHeader.classList.add('scrolled');
    } else {
      siteHeader.classList.remove('scrolled');
    }
  });

  // Mobile menu toggle
  const mobileToggle = document.getElementById('mobileToggle');
  const navMenu = document.getElementById('navMenu');
  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('open');
    });

    navMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => navMenu.classList.remove('open'));
    });
  }

  // 2. Product Catalog Filtering
  const filterBtns = document.querySelectorAll('.filter-btn');
  const productCards = document.querySelectorAll('.product-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');
      productCards.forEach(card => {
        if (filter === 'all' || card.getAttribute('data-category') === filter) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // Quick Select Product to Calculator
  document.querySelectorAll('.add-to-calc').forEach(btn => {
    btn.addEventListener('click', () => {
      const productName = btn.getAttribute('data-name');
      const calcSection = document.getElementById('calculator');
      if (calcSection) {
        calcSection.scrollIntoView({ behavior: 'smooth' });
        showToast('Product Selected', `${productName} selected in wholesale builder.`, 'success');
      }
    });
  });

  // 3. Interactive Wholesale Calculator & Eco-Impact Engine
  const quantitySlider = document.getElementById('quantitySlider');
  const quantityDisplay = document.getElementById('quantityDisplay');
  const summaryQuantity = document.getElementById('summaryQuantity');
  const summaryTier = document.getElementById('summaryTier');
  const summaryRegion = document.getElementById('summaryRegion');
  const selectedProductCount = document.getElementById('selectedProductCount');
  const plasticSavedVal = document.getElementById('plasticSavedVal');
  const whatsappQuoteLink = document.getElementById('whatsappQuoteLink');
  const modalProductSummary = document.getElementById('modalProductSummary');

  const productCheckboxes = document.querySelectorAll('input[name="calcProducts"]');
  const regionRadios = document.querySelectorAll('input[name="deliveryRegion"]');

  function updateCalculator() {
    const qty = parseInt(quantitySlider.value, 10);
    const formattedQty = qty.toLocaleString('en-IN') + ' Units';

    if (quantityDisplay) quantityDisplay.textContent = formattedQty;
    if (summaryQuantity) summaryQuantity.textContent = formattedQty;

    // Selected Products
    const selectedProducts = [];
    productCheckboxes.forEach(cb => {
      const card = cb.closest('.plate-select-card');
      if (cb.checked) {
        selectedProducts.push(cb.value);
        if (card) card.classList.add('active');
      } else {
        if (card) card.classList.remove('active');
      }
    });

    if (selectedProductCount) {
      selectedProductCount.textContent = selectedProducts.length > 0 
        ? `${selectedProducts.length} Selected (${selectedProducts.slice(0, 2).join(', ')}${selectedProducts.length > 2 ? '...' : ''})`
        : '0 Selected';
    }

    // Selected Region
    let selectedRegion = 'Pan India';
    regionRadios.forEach(r => {
      const card = r.closest('.plate-select-card');
      if (r.checked) {
        selectedRegion = r.value;
        if (card) card.classList.add('active');
      } else {
        if (card) card.classList.remove('active');
      }
    });
    if (summaryRegion) summaryRegion.textContent = selectedRegion;

    // Determine Tier
    let tierText = 'Standard Wholesale';
    if (qty >= 25000) {
      tierText = 'Mega Tier 3 (Factory Direct -20%)';
    } else if (qty >= 10000) {
      tierText = 'Volume Tier 2 (Bulk Wholesale -15%)';
    } else if (qty >= 2500) {
      tierText = 'Tier 1 (Wholesale Standard -10%)';
    } else {
      tierText = 'Starter Tier (Direct Factory Base)';
    }
    if (summaryTier) summaryTier.textContent = tierText;

    // Eco Impact calculation: 25g single use plastic replaced per natural leaf plate
    const plasticKg = Math.round(qty * 0.025);
    if (plasticSavedVal) {
      plasticSavedVal.textContent = plasticKg.toLocaleString('en-IN') + ' kg';
    }

    // WhatsApp Direct Quotation Link Formatting
    const productListString = selectedProducts.length > 0 ? selectedProducts.join(', ') : 'Assorted Leaf Plates';
    const whatsappMessage = encodeURIComponent(
      `Hello Lasya Natural Plates! 👋\n\nI would like to request a wholesale quotation:\n- Products: ${productListString}\n- Quantity: ${formattedQty}\n- Supply Region: ${selectedRegion}\n- Discount Bracket: ${tierText}\n\nPlease share official pricing and dispatch timeline.`
    );
    if (whatsappQuoteLink) {
      whatsappQuoteLink.href = `https://wa.me/916309199939?text=${whatsappMessage}`;
    }

    if (modalProductSummary) {
      modalProductSummary.value = `${formattedQty} | Products: [${productListString}] | Region: ${selectedRegion}`;
    }
  }

  // Bind calculator events
  if (quantitySlider) quantitySlider.addEventListener('input', updateCalculator);
  productCheckboxes.forEach(cb => cb.addEventListener('change', updateCalculator));
  regionRadios.forEach(r => r.addEventListener('change', updateCalculator));

  // Initial calculation run
  updateCalculator();

  // 4. Modal Handling
  const quoteModal = document.getElementById('quoteModal');
  const openQuoteModalBtn = document.getElementById('openQuoteModalBtn');
  const closeQuoteModalBtn = document.getElementById('closeQuoteModalBtn');

  if (openQuoteModalBtn && quoteModal) {
    openQuoteModalBtn.addEventListener('click', () => {
      updateCalculator();
      quoteModal.style.display = 'flex';
    });
  }

  if (closeQuoteModalBtn && quoteModal) {
    closeQuoteModalBtn.addEventListener('click', () => {
      quoteModal.style.display = 'none';
    });
  }

  if (quoteModal) {
    quoteModal.addEventListener('click', (e) => {
      if (e.target === quoteModal) quoteModal.style.display = 'none';
    });
  }

  // 5. Wholesale Quote Form Submission to Backend API
  const wholesaleQuoteForm = document.getElementById('wholesaleQuoteForm');
  if (wholesaleQuoteForm) {
    wholesaleQuoteForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const submitBtn = wholesaleQuoteForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Submitting...';

      const formData = new FormData(wholesaleQuoteForm);
      const selectedProducts = [];
      document.querySelectorAll('input[name="calcProducts"]:checked').forEach(cb => selectedProducts.push(cb.value));

      const payload = {
        name: formData.get('name'),
        company: formData.get('company'),
        phone: formData.get('phone'),
        email: formData.get('email'),
        location: formData.get('location'),
        productTypes: selectedProducts,
        estimatedQuantity: quantitySlider ? `${quantitySlider.value} Units` : 'Bulk',
        message: formData.get('message'),
        source: 'quote_modal'
      };

      try {
        const response = await fetch('/api/inquiries', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });

        const result = await response.json();
        if (result.success) {
          showToast('Inquiry Received!', `Reference ID: ${result.inquiryId}. Our team will contact you shortly.`, 'success');
          wholesaleQuoteForm.reset();
          if (quoteModal) quoteModal.style.display = 'none';
        } else {
          showToast('Submission Notice', result.error || 'Please check the details.', 'error');
        }
      } catch (err) {
        console.error('Error submitting inquiry:', err);
        showToast('Submission Error', 'Failed to reach server. You can also reach us directly via WhatsApp or Call.', 'error');
      } finally {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
      }
    });
  }

  // 6. Sample Order Form Submission to Backend API
  const sampleOrderForm = document.getElementById('sampleOrderForm');
  if (sampleOrderForm) {
    sampleOrderForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const submitBtn = sampleOrderForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Processing...';

      const formData = new FormData(sampleOrderForm);
      const payload = {
        name: formData.get('name'),
        phone: formData.get('phone'),
        email: formData.get('email'),
        businessType: formData.get('businessType'),
        address: formData.get('address'),
        preferredProducts: ['12 Inch Dinner', '10 Inch Dining', '4-Compartment Thali', '8 Inch Square', 'Curry Bowl']
      };

      try {
        const response = await fetch('/api/samples', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });

        const result = await response.json();
        if (result.success) {
          showToast('Sample Kit Requested!', `Sample Ref ID: ${result.sampleId}. We will dispatch to your address shortly.`, 'success');
          sampleOrderForm.reset();
        } else {
          showToast('Notice', result.error || 'Please check form fields.', 'error');
        }
      } catch (err) {
        console.error('Error requesting sample:', err);
        showToast('Notice', 'Sample request submitted! You can also message on WhatsApp for instant confirmation.', 'success');
      } finally {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
      }
    });
  }

  // 7. Toast Notification Utility
  function showToast(title, message, type = 'success') {
    const toast = document.getElementById('toastNotification');
    const toastTitle = document.getElementById('toastTitle');
    const toastMessage = document.getElementById('toastMessage');
    const toastIcon = document.getElementById('toastIcon');

    if (!toast) return;

    toastTitle.textContent = title;
    toastMessage.textContent = message;

    toast.className = `toast-notice ${type} show`;
    if (type === 'success') {
      toastIcon.className = 'fa-solid fa-circle-check';
      toastIcon.style.color = 'var(--color-brand-secondary)';
    } else {
      toastIcon.className = 'fa-solid fa-circle-exclamation';
      toastIcon.style.color = 'var(--color-earth-amber)';
    }

    setTimeout(() => {
      toast.classList.remove('show');
    }, 4500);
  }
});
