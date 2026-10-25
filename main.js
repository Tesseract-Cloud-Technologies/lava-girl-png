/* main.js */
(function() {
  'use strict';

  // --- Demo bar dismiss ---
  const demoBar = document.getElementById('demoBar');
  const dismissBtn = document.getElementById('dismissDemoBar');
  if (dismissBtn && demoBar) {
    if (localStorage.getItem('lgDemoDismissed') === 'true') demoBar.style.display = 'none';
    dismissBtn.addEventListener('click', () => {
      demoBar.style.display = 'none';
      localStorage.setItem('lgDemoDismissed', 'true');
    });
  }

  // --- Colour definitions ---
  const colourMap = {
    red: '#D9262E',
    purple: '#4B1D9C',
    white: '#FFFFFF',
    pink: '#E6007E',
    green: '#5CD62B',
    black: '#0D0D0D'
  };
  const colourNames = {
    red: 'Red', purple: 'Purple', white: 'White',
    pink: 'Pink', green: 'Green', black: 'Black'
  };

  function setActiveColour(colour) {
    if (!colourMap[colour]) return;
    document.documentElement.style.setProperty('--active-colour', colourMap[colour]);
    const swatchName = document.getElementById('swatchName');
    if (swatchName) swatchName.textContent = colourNames[colour];
    document.querySelectorAll('.swatch[data-colour]').forEach(s => {
      const isActive = s.dataset.colour === colour;
      s.classList.toggle('active', isActive);
      s.setAttribute('aria-pressed', String(isActive));
    });
    document.querySelectorAll('.swatch[data-filter-colour]').forEach(s => {
      const isActive = s.dataset.filterColour === colour;
      s.classList.toggle('active', isActive);
      s.setAttribute('aria-pressed', String(isActive));
    });
  }

  // Colour switcher on home
  const homeSwatches = document.querySelectorAll('.swatch[data-colour]');
  homeSwatches.forEach(s => {
    s.addEventListener('click', () => setActiveColour(s.dataset.colour));
  });

  // --- Products data ---
  const products = [
    { id: 1, name: 'Lavagirl Fabric — Plain Tabu', cat: 'fabric', colour: 'red', price: 45, unit: 'per metre', desc: 'Vibrant PNG-designed fabric in the Plain Tabu motif. Sample price per metre.' },
    { id: 2, name: 'Lavagirl Fabric — Plain Tabu', cat: 'fabric', colour: 'purple', price: 45, unit: 'per metre', desc: 'Royal purple colourway. Sample price per metre.' },
    { id: 3, name: 'Lavagirl Fabric — Plain Tabu', cat: 'fabric', colour: 'pink', price: 45, unit: 'per metre', desc: 'Hot pink colourway. Sample price per metre.' },
    { id: 4, name: 'Lavagirl Fabric — Plain Tabu', cat: 'fabric', colour: 'green', price: 45, unit: 'per metre', desc: 'Lime green colourway. Sample price per metre.' },
    { id: 5, name: 'Lavagirl Fabric — Plain Tabu', cat: 'fabric', colour: 'white', price: 45, unit: 'per metre', desc: 'White colourway. Sample price per metre.' },
    { id: 6, name: 'Lavagirl Fabric — Plain Tabu', cat: 'fabric', colour: 'black', price: 45, unit: 'per metre', desc: 'Black colourway. Sample price per metre.' },
    { id: 7, name: 'Meri Blouse — Classic', cat: 'meri', colour: 'red', price: 180, unit: 'each', desc: 'Handmade meri blouse in Plain Tabu red. Sample price.' },
    { id: 8, name: 'Meri Blouse — Royal', cat: 'meri', colour: 'purple', price: 180, unit: 'each', desc: 'Handmade meri blouse in royal purple. Sample price.' },
    { id: 9, name: 'Tabu Ring Necklace', cat: 'jewellery', colour: 'red', price: 95, unit: 'each', desc: 'Handmade necklace inspired by the tabu ring. Sample price.' },
    { id: 10, name: 'Shell Silver Bracelet', cat: 'jewellery', colour: 'white', price: 65, unit: 'each', desc: 'Shell silver bracelet, handmade. Sample price.' },
    { id: 11, name: 'Lavagirl Tote', cat: 'accessories', colour: 'black', price: 55, unit: 'each', desc: 'Sturdy tote with tabu motif. Sample price.' },
    { id: 12, name: 'Lavagirl Scrunchie', cat: 'accessories', colour: 'pink', price: 20, unit: 'each', desc: 'Fabric scrunchie in Plain Tabu pink. Sample price.' }
  ];

  // --- Shop page rendering ---
  const shopGrid = document.getElementById('shopGrid');
  const colourFilters = document.querySelectorAll('.swatch[data-filter-colour]');
  const catFilters = document.querySelectorAll('.cat-filter');
  const clearColourFilter = document.getElementById('clearColourFilter');
  let activeColourFilter = 'red';
  let activeCatFilter = 'all';

  function renderShop() {
    if (!shopGrid) return;
    let filtered = products;
    if (activeColourFilter !== 'all') {
      filtered = filtered.filter(p => p.colour === activeColourFilter);
    }
    if (activeCatFilter !== 'all') {
      filtered = filtered.filter(p => p.cat === activeCatFilter);
    }
    if (filtered.length === 0) {
      shopGrid.innerHTML = '<div class="col-12"><p class="text-muted">No products match these filters. Try another colour or category.</p></div>';
      return;
    }
    shopGrid.innerHTML = filtered.map(p => `
      <div class="col-6 col-md-4 col-lg-3">
        <div class="product-card">
          <div class="product-swatch" style="background: ${colourMap[p.colour] || '#ccc'}"></div>
          <div class="product-body">
            <div class="product-name">${p.name}</div>
            <div class="product-meta">${p.cat} · ${colourNames[p.colour] || p.colour}</div>
            <div class="product-price">K${p.price} <span class="fw-normal text-muted small">${p.unit}</span></div>
            <div class="product-actions">
              <button class="btn btn-sm btn-outline-ink rounded-pill flex-fill quick-view" data-id="${p.id}">Quick view</button>
              <button class="btn btn-sm btn-lava rounded-pill add-enquiry" data-id="${p.id}" aria-label="Add ${p.name} to enquiry list"><i class="fa-solid fa-plus"></i></button>
            </div>
          </div>
        </div>
      </div>
    `).join('');
    shopGrid.querySelectorAll('.quick-view').forEach(btn => {
      btn.addEventListener('click', () => openQuickView(parseInt(btn.dataset.id, 10)));
    });
    shopGrid.querySelectorAll('.add-enquiry').forEach(btn => {
      btn.addEventListener('click', () => addToEnquiry(parseInt(btn.dataset.id, 10)));
    });
  }

  colourFilters.forEach(s => {
    s.addEventListener('click', () => {
      activeColourFilter = s.dataset.filterColour;
      colourFilters.forEach(f => { f.classList.remove('active'); f.setAttribute('aria-pressed', 'false'); });
      s.classList.add('active');
      s.setAttribute('aria-pressed', 'true');
      setActiveColour(s.dataset.filterColour);
      renderShop();
    });
  });

  if (clearColourFilter) {
    clearColourFilter.addEventListener('click', () => {
      activeColourFilter = 'all';
      colourFilters.forEach(f => { f.classList.remove('active'); f.setAttribute('aria-pressed', 'false'); });
      renderShop();
    });
  }

  catFilters.forEach(f => {
    f.addEventListener('click', () => {
      catFilters.forEach(c => c.classList.remove('active'));
      f.classList.add('active');
      activeCatFilter = f.dataset.filterCat;
      renderShop();
    });
  });

  // --- Featured grid on home ---
  const featuredGrid = document.getElementById('featuredGrid');
  if (featuredGrid) {
    const featured = products.filter(p => [1, 7, 9, 11].includes(p.id));
    featuredGrid.innerHTML = featured.map(p => `
      <div class="col-6 col-md-3">
        <div class="product-card">
          <div class="product-swatch" style="background: ${colourMap[p.colour] || '#ccc'}"></div>
          <div class="product-body">
            <div class="product-name">${p.name}</div>
            <div class="product-price">K${p.price} <span class="fw-normal text-muted small">${p.unit}</span></div>
            <button class="btn btn-sm btn-outline-ink rounded-pill quick-view" data-id="${p.id}">Quick view</button>
          </div>
        </div>
      </div>
    `).join('');
    featuredGrid.querySelectorAll('.quick-view').forEach(btn => {
      btn.addEventListener('click', () => openQuickView(parseInt(btn.dataset.id, 10)));
    });
  }

  // --- Quick view modal ---
  const quickViewModalEl = document.getElementById('quickViewModal');
  const quickViewBody = document.getElementById('quickViewBody');
  const quickViewLabel = document.getElementById('quickViewLabel');
  const quickViewModal = quickViewModalEl ? new bootstrap.Modal(quickViewModalEl) : null;

  function openQuickView(id) {
    const p = products.find(x => x.id === id);
    if (!p || !quickViewBody) return;
    if (quickViewLabel) quickViewLabel.textContent = p.name;
    quickViewBody.innerHTML = `
      <div class="row g-4">
        <div class="col-md-5">
          <div class="quickview-swatch" style="background: ${colourMap[p.colour] || '#ccc'}"></div>
        </div>
        <div class="col-md-7">
          <p class="product-meta mb-1">${p.cat} · ${colourNames[p.colour] || p.colour}</p>
          <h3 class="h5 mb-2">${p.name}</h3>
          <p class="text-muted-soft small mb-3">${p.desc}</p>
          <p class="product-price mb-3">K${p.price} <span class="fw-normal text-muted small">${p.unit}</span></p>
          <button class="btn btn-lava rounded-pill px-4 add-enquiry" data-id="${p.id}">Add to enquiry list</button>
        </div>
      </div>
    `;
    quickViewBody.querySelector('.add-enquiry')?.addEventListener('click', () => {
      addToEnquiry(p.id);
      if (quickViewModal) quickViewModal.hide();
    });
    if (quickViewModal) quickViewModal.show();
  }

  // --- Enquiry list ---
  const enquiryOffcanvasEl = document.getElementById('enquiryOffcanvas');
  const enquiryOffcanvas = enquiryOffcanvasEl ? new bootstrap.Offcanvas(enquiryOffcanvasEl) : null;
  const enquiryItems = document.getElementById('enquiryItems');
  const enquiryCount = document.getElementById('enquiryCount');
  const openEnquiryBtn = document.getElementById('openEnquiryBtn');
  const sendEnquiryBtn = document.getElementById('sendEnquiryBtn');
  let enquiry = [];

  function addToEnquiry(id) {
    const p = products.find(x => x.id === id);
    if (!p) return;
    const existing = enquiry.find(e => e.id === id);
    if (existing) existing.qty += 1;
    else enquiry.push({ ...p, qty: 1 });
    updateEnquiry();
    if (enquiryOffcanvas) enquiryOffcanvas.show();
  }

  function updateEnquiry() {
    const totalQty = enquiry.reduce((s, e) => s + e.qty, 0);
    if (enquiryCount) enquiryCount.textContent = totalQty;
    if (enquiryItems) {
      if (enquiry.length === 0) {
        enquiryItems.innerHTML = '<p class="text-muted small">Your list is empty. Add products from the shop.</p>';
      } else {
        enquiryItems.innerHTML = enquiry.map(e => `
          <div class="enquiry-line">
            <span>${e.name} × ${e.qty}</span>
            <span>K${e.price * e.qty}</span>
            <button class="remove-btn" data-id="${e.id}" aria-label="Remove ${e.name}"><i class="fa-solid fa-xmark"></i></button>
          </div>
        `).join('');
        enquiryItems.querySelectorAll('.remove-btn').forEach(btn => {
          btn.addEventListener('click', () => {
            enquiry = enquiry.filter(e => e.id !== parseInt(btn.dataset.id, 10));
            updateEnquiry();
          });
        });
      }
    }
    // Update WhatsApp link
    if (sendEnquiryBtn) {
      const lines = enquiry.map(e => `${e.name} × ${e.qty} (K${e.price * e.qty})`).join('\n');
      const text = `Hello Lavagirl PNG! I'd like to enquire about:\n${lines}\n\nTotal estimate: K${enquiry.reduce((s, e) => s + e.price * e.qty, 0)} (Demo)`;
      sendEnquiryBtn.href = `https://wa.me/67512345678?text=${encodeURIComponent(text)}`;
    }
  }

  if (openEnquiryBtn) openEnquiryBtn.addEventListener('click', () => { if (enquiryOffcanvas) enquiryOffcanvas.show(); });

  // --- Wholesale form ---
  const wholesaleForm = document.getElementById('wholesaleForm');
  const wholesaleSuccess = document.getElementById('wholesaleSuccess');
  const wholesaleWhatsapp = document.getElementById('wholesaleWhatsapp');
  if (wholesaleForm) {
    wholesaleForm.addEventListener('submit', (e) => {
      e.preventDefault();
      if (!wholesaleForm.checkValidity()) {
        wholesaleForm.classList.add('was-validated');
        return;
      }
      const business = document.getElementById('wholesaleBusiness')?.value || '';
      const contact = document.getElementById('wholesaleContact')?.value || '';
      const email = document.getElementById('wholesaleEmail')?.value || '';
      const phone = document.getElementById('wholesalePhone')?.value || '';
      const interest = Array.from(document.getElementById('wholesaleInterest')?.selectedOptions || []).map(o => o.value).join(', ');
      const notes = document.getElementById('wholesaleNotes')?.value || '';
      const text = `Hello Lavagirl PNG! Wholesale enquiry. Business: ${business}. Contact: ${contact}. Email: ${email}. Phone: ${phone}. Interest: ${interest}. Notes: ${notes} (Demo)`;
      const url = `https://wa.me/67512345678?text=${encodeURIComponent(text)}`;
      if (wholesaleWhatsapp) wholesaleWhatsapp.href = url;
      wholesaleForm.classList.add('d-none');
      if (wholesaleSuccess) wholesaleSuccess.classList.remove('d-none');
    });
  }

  // --- Contact form ---
  const contactForm = document.getElementById('contactForm');
  const contactSuccess = document.getElementById('contactSuccess');
  const contactWhatsapp = document.getElementById('contactWhatsapp');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      if (!contactForm.checkValidity()) {
        contactForm.classList.add('was-validated');
        return;
      }
      const name = document.getElementById('contactName')?.value || 'Friend';
      const email = document.getElementById('contactEmail')?.value || '';
      const message = document.getElementById('contactMessage')?.value || '';
      const text = `Hello Lavagirl PNG! My name is ${name}. Email: ${email}. Message: ${message} (Demo)`;
      const url = `https://wa.me/67512345678?text=${encodeURIComponent(text)}`;
      if (contactWhatsapp) contactWhatsapp.href = url;
      contactForm.classList.add('d-none');
      if (contactSuccess) contactSuccess.classList.remove('d-none');
    });
  }

  // --- Init ---
  if (shopGrid) renderShop();

})();