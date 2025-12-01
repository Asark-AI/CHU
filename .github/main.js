// Delegated navigation handling, smooth scroll, and dropdowns

// Handle clicks on anchors anywhere (nav or mobile menu)
document.addEventListener('click', (e) => {
  const a = e.target.closest('a');
  if (!a) return;

  // only handle in-page anchors
  const href = a.getAttribute('href') || '';
  if (href.startsWith('#')) {
    // remove active from nav anchors
    document.querySelectorAll('nav a').forEach(x => x.classList.remove('active'));
    // set active on the corresponding nav link if present
    const matching = document.querySelector('nav a[href="' + href + '"]');
    if (matching) matching.classList.add('active');

    // smooth scroll
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    // if mobile menu is open, close it
    const mobile = document.getElementById('mobile-menu');
    const toggle = document.querySelector('.menu-toggle');
    if (mobile && mobile.classList.contains('open')) {
      mobile.classList.remove('open');
      mobile.innerHTML = '';
      if (toggle) toggle.setAttribute('aria-expanded', 'false');
    }
  }
});

function toggleMenu(btn) {
  const mobile = document.getElementById('mobile-menu');
  const nav = document.getElementById('main-nav');
  const open = mobile.classList.toggle('open');
  btn.setAttribute('aria-expanded', open);
  // add a body-level flag so CSS can render an overlay
  document.body.classList.toggle('menu-active', open);
  if (open) {
    // clone nav links for mobile (support ol or ul)
    const list = nav.querySelector('ol, ul');
    mobile.innerHTML = list ? list.outerHTML : '';
    // ensure dropdown toggle behavior works in mobile clone
    setTimeout(bindDropdownToggles, 50);
    // focus the first focusable element inside the mobile menu for accessibility
    setTimeout(()=>{ const f = mobile.querySelector('button, a'); if(f) f.focus(); }, 120);
  } else mobile.innerHTML = '';
}

// Dropdown toggle behavior (delegated)
function bindDropdownToggles() {
  // Attach click handler for dropdown toggle buttons (both in nav and mobile)
  document.querySelectorAll('.dropdown-toggle').forEach(btn => {
    if (btn.dataset.bound) return;
    btn.dataset.bound = '1';
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const li = btn.closest('.has-dropdown');
      const expanded = btn.getAttribute('aria-expanded') === 'true';
      // close any other open dropdowns
      document.querySelectorAll('.has-dropdown.open').forEach(openLi => {
        if (openLi !== li) {
          openLi.classList.remove('open');
          const tb = openLi.querySelector('.dropdown-toggle');
          if (tb) tb.setAttribute('aria-expanded', 'false');
        }
      });
      li.classList.toggle('open');
      btn.setAttribute('aria-expanded', String(!expanded));
      // prevent global click handlers from immediately closing this menu
      try { window.__suppressMenuClose = true; } catch(e) {}
      setTimeout(()=>{ try{ window.__suppressMenuClose = false; }catch(e){} }, 250);
    });

    // keyboard support
    btn.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        btn.click();
      }
    });
  });
}

// Close dropdowns when clicking outside
document.addEventListener('click', (e) => {
  if (window.__suppressMenuClose) return;
  if (e.target.closest('.has-dropdown')) return;
  document.querySelectorAll('.has-dropdown.open').forEach(openLi => {
    openLi.classList.remove('open');
    const tb = openLi.querySelector('.dropdown-toggle');
    if (tb) tb.setAttribute('aria-expanded', 'false');
  });
});

// Close mobile menu when clicking the overlay or pressing Escape
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    const mobile = document.getElementById('mobile-menu');
    const toggle = document.querySelector('.menu-toggle');
    if (mobile && mobile.classList.contains('open')) {
      mobile.classList.remove('open');
      mobile.innerHTML = '';
      document.body.classList.remove('menu-active');
      if (toggle) toggle.setAttribute('aria-expanded', 'false');
      if (toggle) toggle.focus();
    }
    // close any open dropdowns too
    document.querySelectorAll('.has-dropdown.open').forEach(openLi => {
      openLi.classList.remove('open');
      const tb = openLi.querySelector('.dropdown-toggle');
      if (tb) tb.setAttribute('aria-expanded', 'false');
    });
  }
});

// Clicking the overlay area (body) closes the mobile menu when open
document.addEventListener('click', (e) => {
  const mobile = document.getElementById('mobile-menu');
  if (!mobile) return;
  if (!mobile.classList.contains('open')) return;
  // if clicked outside the mobile menu container, close
  if (window.__suppressMenuClose) return;
  if (!e.target.closest('#mobile-menu') && !e.target.closest('.menu-toggle')) {
    mobile.classList.remove('open');
    mobile.innerHTML = '';
    document.body.classList.remove('menu-active');
    const toggle = document.querySelector('.menu-toggle');
    if (toggle) toggle.setAttribute('aria-expanded', 'false');
  }
});

// initialize dropdown bindings
bindDropdownToggles();

// small helper: handle deep-link on load
if (location.hash) {
  const el = document.querySelector(location.hash);
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}
