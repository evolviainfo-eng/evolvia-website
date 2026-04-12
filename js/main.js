/**
 * Evolvia — main.js
 * Responsibilities:
 *  1. Navigation: scroll class + mobile hamburger
 *  2. Scroll animations: Intersection Observer fade-ins
 *  3. Stat counters: count-up animation
 *  4. Form validation & submit (kontaktas.html only)
 */

(function () {
  'use strict';

  /* ─────────────────────────────────────────────────────────
   * 1. NAVIGATION
   * ───────────────────────────────────────────────────────── */
  const nav        = document.getElementById('nav');
  const hamburger  = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobile-menu');

  // Scroll-based nav style
  function handleNavScroll() {
    if (!nav) return;
    const scrolled = window.scrollY > 20;
    nav.classList.toggle('nav--scrolled', scrolled);
  }

  window.addEventListener('scroll', handleNavScroll, { passive: true });
  handleNavScroll(); // run immediately in case page loads mid-scroll

  // Mobile hamburger toggle
  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', function () {
      const isOpen = nav.classList.toggle('nav--open');
      hamburger.setAttribute('aria-expanded', String(isOpen));
      if (isOpen) {
        mobileMenu.removeAttribute('hidden');
        document.body.style.overflow = 'hidden';
      } else {
        mobileMenu.setAttribute('hidden', '');
        document.body.style.overflow = '';
      }
    });

    // Close on Escape
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && nav.classList.contains('nav--open')) {
        nav.classList.remove('nav--open');
        hamburger.setAttribute('aria-expanded', 'false');
        mobileMenu.setAttribute('hidden', '');
        document.body.style.overflow = '';
        hamburger.focus();
      }
    });

    // Close when a mobile nav link is clicked
    mobileMenu.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        nav.classList.remove('nav--open');
        hamburger.setAttribute('aria-expanded', 'false');
        mobileMenu.setAttribute('hidden', '');
        document.body.style.overflow = '';
      });
    });
  }

  /* ─────────────────────────────────────────────────────────
   * 2. SCROLL ANIMATIONS (Intersection Observer)
   * ───────────────────────────────────────────────────────── */
  const fadeEls = document.querySelectorAll('.fade-in');

  if (fadeEls.length && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -40px 0px'
      }
    );

    fadeEls.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    // Fallback: show everything if IntersectionObserver not supported
    fadeEls.forEach(function (el) {
      el.classList.add('is-visible');
    });
  }

  /* ─────────────────────────────────────────────────────────
   * 3. STAT COUNTERS
   * ───────────────────────────────────────────────────────── */
  var statEls = document.querySelectorAll('.stat__number[data-target]');

  function animateCounter(el) {
    var target   = parseInt(el.dataset.target, 10);
    var suffix   = el.dataset.suffix || '';
    var duration = 1800;
    var start    = null;

    function update(timestamp) {
      if (!start) start = timestamp;
      var elapsed  = timestamp - start;
      var progress = Math.min(elapsed / duration, 1);
      // Ease-out cubic
      var eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(eased * target) + suffix;
      if (progress < 1) {
        requestAnimationFrame(update);
      }
    }

    requestAnimationFrame(update);
  }

  if (statEls.length && 'IntersectionObserver' in window) {
    var statObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            animateCounter(entry.target);
            statObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );

    statEls.forEach(function (el) {
      statObserver.observe(el);
    });
  }

  /* ─────────────────────────────────────────────────────────
   * 4. FORM VALIDATION (kontaktas.html only)
   * ───────────────────────────────────────────────────────── */
  var form = document.getElementById('contact-form');
  if (!form) return; // guard — only runs on pages with the form

  // Validation rules
  var VALIDATORS = {
    vardas:   { required: true, minLen: 2,  message: 'Įveskite vardą (min. 2 simboliai)' },
    pavarde:  { required: true, minLen: 2,  message: 'Įveskite pavardę (min. 2 simboliai)' },
    elpastas: { required: true, type: 'email', message: 'Įveskite galiojantį el. pašto adresą' },
    imone:    { required: true, minLen: 2,  message: 'Įveskite įmonės pavadinimą (min. 2 simboliai)' },
    dydis:    { required: true, message: 'Pasirinkite įmonės dydį' },
    zinute:   { required: true, minLen: 10, message: 'Aprašykite savo poreikius (min. 10 simbolių)' }
  };

  function isValidEmail(val) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(val.trim());
  }

  function validateField(name, value) {
    var rules = VALIDATORS[name];
    if (!rules) return null; // optional field — skip
    if (rules.required && !value.trim()) return rules.message;
    if (rules.minLen && value.trim().length < rules.minLen) return rules.message;
    if (rules.type === 'email' && !isValidEmail(value)) return rules.message;
    return null;
  }

  function getErrorEl(fieldEl) {
    var group = fieldEl.closest('.form-group');
    return group ? group.querySelector('.form-error') : null;
  }

  function showError(fieldEl, message) {
    var errorEl = getErrorEl(fieldEl);
    if (errorEl) errorEl.textContent = message;
    fieldEl.classList.add('form-input--error');
    fieldEl.setAttribute('aria-invalid', 'true');
  }

  function clearError(fieldEl) {
    var errorEl = getErrorEl(fieldEl);
    if (errorEl) errorEl.textContent = '';
    fieldEl.classList.remove('form-input--error');
    fieldEl.removeAttribute('aria-invalid');
  }

  // Inline validation on blur
  form.addEventListener('focusout', function (e) {
    var name  = e.target.name;
    var value = e.target.value;
    if (!name || !VALIDATORS[name]) return;
    var error = validateField(name, value);
    if (error) {
      showError(e.target, error);
    } else {
      clearError(e.target);
    }
  });

  // Clear error on input after user starts correcting
  form.addEventListener('input', function (e) {
    var name = e.target.name;
    if (!name || !VALIDATORS[name]) return;
    if (e.target.classList.contains('form-input--error')) {
      var error = validateField(name, e.target.value);
      if (!error) clearError(e.target);
    }
  });

  // Submit handler
  form.addEventListener('submit', function (e) {
    e.preventDefault();

    // Honeypot check
    var honeypot = form.querySelector('[name="website_url"]');
    if (honeypot && honeypot.value !== '') {
      // Bot detected — silently ignore
      return;
    }

    // Validate all tracked fields
    var isValid = true;
    var firstInvalidEl = null;

    Object.keys(VALIDATORS).forEach(function (name) {
      var field = form.querySelector('[name="' + name + '"]');
      if (!field) return;
      var error = validateField(name, field.value);
      if (error) {
        showError(field, error);
        isValid = false;
        if (!firstInvalidEl) firstInvalidEl = field;
      } else {
        clearError(field);
      }
    });

    if (!isValid) {
      if (firstInvalidEl) firstInvalidEl.focus();
      return;
    }

    // Show loading state
    var submitBtn  = document.getElementById('submit-btn');
    var btnText    = submitBtn ? submitBtn.querySelector('.btn-text') : null;
    var btnSpinner = submitBtn ? submitBtn.querySelector('.btn-spinner') : null;

    if (submitBtn) submitBtn.disabled = true;
    if (btnText) btnText.textContent = 'Siunčiama...';
    if (btnSpinner) btnSpinner.removeAttribute('hidden');

    // ── n8n webhook submission ───────────────────────────────
    // Workflow: Evolvia — Contact Form → Gmail (ID: x6fBUfzWl60uRnqY)
    // To test before activating the workflow, swap to the -test URL:
    //   https://evolvia23324.app.n8n.cloud/webhook-test/evolvia-contact
    var N8N_WEBHOOK = 'https://evolvia23324.app.n8n.cloud/webhook/evolvia-contact';

    var payload = {
      vardas:    form.querySelector('[name="vardas"]').value,
      pavarde:   form.querySelector('[name="pavarde"]').value,
      elpastas:  form.querySelector('[name="elpastas"]').value,
      telefonas: form.querySelector('[name="telefonas"]').value,
      svetaine:  form.querySelector('[name="svetaine"]').value,
      imone:     form.querySelector('[name="imone"]').value,
      dydis:     form.querySelector('[name="dydis"]').value,
      zinute:    form.querySelector('[name="zinute"]').value
    };

    fetch(N8N_WEBHOOK, {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: { 'Content-Type': 'application/json' }
    })
      .then(function (response) {
        if (response.ok) {
          window.location.href = 'aciu.html';
        } else {
          throw new Error('HTTP ' + response.status);
        }
      })
      .catch(function (err) {
        if (submitBtn) submitBtn.disabled = false;
        if (btnText) btnText.textContent = 'Siųsti užklausą';
        if (btnSpinner) btnSpinner.setAttribute('hidden', '');
        var errorMsg = form.querySelector('.form-submit-error');
        if (!errorMsg) {
          errorMsg = document.createElement('p');
          errorMsg.className = 'form-submit-error';
          errorMsg.style.cssText = 'color:#F87171;font-size:0.875rem;font-weight:500;margin-top:0.5rem;';
          submitBtn.parentNode.insertBefore(errorMsg, submitBtn);
        }
        errorMsg.textContent = 'Nepavyko išsiųsti. Bandykite dar kartą arba susisiekite tiesiogiai.';
        console.error('Form submission error:', err);
      });
  });

})();
