(function () {
  'use strict';

  // Consultation form: Formspree form ID (https://formspree.io/f/xrelnywq)
  var FORMSPREE_FORM_ID = 'xrelnywq';

  // Mobile nav toggle
  var navToggle = document.querySelector('.nav-toggle');
  var mainNav = document.querySelector('.main-nav');
  if (navToggle && mainNav) {
    navToggle.addEventListener('click', function () {
      var open = mainNav.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', open);
    });
    mainNav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        mainNav.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Set active nav link (works with file:// and relative paths)
  var pathname = (window.location.pathname || window.location.href || '').replace(/\\/g, '/');
  var pathSeg = pathname.split('/').filter(Boolean);
  var currentPage = 'home';
  if (pathSeg.length) {
    var last = pathSeg[pathSeg.length - 1];
    if (last === 'index.html') {
      var prev = pathSeg[pathSeg.length - 2];
      if (prev === 'work') {
        currentPage = 'work';
      } else if (prev === 'about' || prev === 'contact') {
        currentPage = prev;
      } else {
        currentPage = 'home';
      }
    } else if (last === 'about' || last === 'contact') {
      currentPage = last;
    } else if (last === 'project.html' && pathSeg[pathSeg.length - 2] === 'work') {
      currentPage = 'work';
    }
  }
  document.querySelectorAll('.main-nav a').forEach(function (a) {
    var href = (a.getAttribute('href') || '').replace(/\/$/, '');
    var linkPage;
    if (href === 'index.html') {
      linkPage = currentPage;
    } else {
      var hrefNorm = href.replace(/^\.\.\/?/, '').replace(/\/$/, '').replace(/\/?index\.html$/, '').replace(/\/$/, '');
      linkPage = hrefNorm || 'home';
    }
    if (linkPage === currentPage) {
      a.classList.add('active');
    } else {
      a.classList.remove('active');
    }
  });

  // Animate stats on home page
  var statNumbers = document.querySelectorAll('.stat-number[data-target]');
  if (statNumbers.length) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          var el = entry.target;
          var target = parseInt(el.getAttribute('data-target'), 10);
          if (isNaN(target)) return;
          var duration = 1500;
          var start = performance.now();
          function step(now) {
            var progress = Math.min((now - start) / duration, 1);
            var easeOut = 1 - Math.pow(1 - progress, 3);
            el.textContent = Math.round(target * easeOut);
            if (progress < 1) requestAnimationFrame(step);
            else el.textContent = target;
          }
          requestAnimationFrame(step);
          observer.unobserve(el);
        });
      },
      { threshold: 0.3, rootMargin: '0px' }
    );
    statNumbers.forEach(function (el) {
      observer.observe(el);
    });
  }

  // Work / portfolio page: filter buttons (none on current Work page)
  var filterBtns = document.querySelectorAll('.filter-btn[data-filter]');
  var workCards = document.querySelectorAll('.work-card');
  if (filterBtns.length && workCards.length) {
    filterBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var filter = btn.getAttribute('data-filter');
        filterBtns.forEach(function (b) {
          b.classList.toggle('active', b === btn);
        });
        workCards.forEach(function (card) {
          var categoriesStr = card.getAttribute('data-categories') || card.getAttribute('data-category') || '';
          var categories = categoriesStr ? categoriesStr.split(',').map(function (s) { return s.trim(); }) : [];
          var show = filter === 'all' || categories.indexOf(filter) >= 0;
          card.classList.toggle('hidden', !show);
          var tagEl = card.querySelector('.work-card-tag');
          if (tagEl) {
            tagEl.textContent = filter === 'all' ? (tagEl.getAttribute('data-tag-all') || tagEl.textContent) : (categories.indexOf(filter) >= 0 ? (filter.charAt(0).toUpperCase() + filter.slice(1)) : (tagEl.getAttribute('data-tag-all') || tagEl.textContent));
          }
        });
      });
    });
  }

  // Consultation modal (home page)
  var consultationModal = document.getElementById('consultation-modal');
  var openConsultBtn = document.getElementById('open-consultation-modal');
  var closeConsultBtn = document.getElementById('close-consultation-modal');
  var consultationBackdrop = document.getElementById('consultation-modal-backdrop');
  var consultationForm = document.getElementById('consultation-form');

  function openConsultationModal() {
    if (!consultationModal) return;
    var successEl = document.getElementById('consultation-form-success');
    var errorEl = document.getElementById('consultation-form-error');
    var fieldsEl = document.getElementById('consultation-form-fields');
    if (successEl) successEl.hidden = true;
    if (errorEl) errorEl.hidden = true;
    if (fieldsEl) fieldsEl.hidden = false;
    consultationModal.classList.add('is-open');
    consultationModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeConsultationModal() {
    if (!consultationModal) return;
    consultationModal.classList.remove('is-open');
    consultationModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  if (openConsultBtn) {
    openConsultBtn.addEventListener('click', openConsultationModal);
  }
  if (closeConsultBtn) {
    closeConsultBtn.addEventListener('click', closeConsultationModal);
  }
  if (consultationBackdrop) {
    consultationBackdrop.addEventListener('click', closeConsultationModal);
  }

  if (consultationForm) {
    var formSuccess = document.getElementById('consultation-form-success');
    var formError = document.getElementById('consultation-form-error');
    var formFields = document.getElementById('consultation-form-fields');
    var submitBtn = consultationForm.querySelector('.consultation-submit');
    var formspreeId = (typeof FORMSPREE_FORM_ID !== 'undefined' && FORMSPREE_FORM_ID) ? FORMSPREE_FORM_ID : '';
    var dateInput = document.getElementById('consult-date');

    if (dateInput) {
      var today = new Date();
      var yyyy = String(today.getFullYear());
      var mm = String(today.getMonth() + 1).padStart(2, '0');
      var dd = String(today.getDate()).padStart(2, '0');
      var minDate = yyyy + '-' + mm + '-' + dd;
      dateInput.setAttribute('min', minDate);

      // Force date selection through picker and block manual typing.
      dateInput.addEventListener('focus', function () {
        if (typeof dateInput.showPicker === 'function') dateInput.showPicker();
      });
      dateInput.addEventListener('click', function () {
        if (typeof dateInput.showPicker === 'function') dateInput.showPicker();
      });
      dateInput.addEventListener('keydown', function (evt) {
        if (evt.key !== 'Tab' && evt.key !== 'Escape') {
          evt.preventDefault();
        }
      });
    }

    consultationForm.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!consultationForm.checkValidity()) {
        consultationForm.reportValidity();
        return;
      }
      if (!formspreeId) {
        if (formError) {
          formError.textContent = 'Form is not configured. Set FORMSPREE_FORM_ID in main.js.';
          formError.hidden = false;
          if (formFields) formFields.hidden = true;
        }
        return;
      }

      var name = (document.getElementById('consult-name') && document.getElementById('consult-name').value) || '';
      var phone = (document.getElementById('consult-phone') && document.getElementById('consult-phone').value) || '';
      var date = (document.getElementById('consult-date') && document.getElementById('consult-date').value) || '';
      var location = (document.getElementById('consult-location') && document.getElementById('consult-location').value) || '';

      if (formError) formError.hidden = true;
      if (formSuccess) formSuccess.hidden = true;
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending…';
      }

      fetch('https://formspree.io/f/' + formspreeId, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify({
          name: name,
          phone: phone,
          'Preferred date': date,
          'Preferred location': location,
          _subject: 'Consultation request from ' + (name || 'Website')
        })
      })
        .then(function (res) {
          if (res.ok) {
            if (formFields) formFields.hidden = true;
            if (formSuccess) formSuccess.hidden = false;
            consultationForm.reset();
            setTimeout(closeConsultationModal, 2000);
          } else {
            throw new Error('Submit failed');
          }
        })
        .catch(function () {
          if (formError) {
            formError.hidden = false;
            formError.textContent = 'Something went wrong. Please try again or contact us directly.';
          }
        })
        .finally(function () {
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.textContent = 'Submit';
          }
        });
    });
  }

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && consultationModal && consultationModal.classList.contains('is-open')) {
      closeConsultationModal();
    }
  });

  // Home: featured section auto slideshow (synced with projects-data.js).
  var slideshowInner = document.querySelector('.featured-slideshow-inner');
  if (slideshowInner && typeof PROJECTS !== 'undefined' && PROJECTS.length) {
    var heroSlideFile = 'IMG_2951.JPG.jpeg';
    // Second slide = Nth photo in PROJECTS order (1-based). "6–7th" → use 6; set to 7 for the next photo.
    var secondSlideOneBased = 6;

    function isSlideshowPhotoPath(src) {
      if (!src) return false;
      var lower = src.toLowerCase();
      if (lower.indexOf('logo') !== -1) return false;
      if (/\.(png|webp|gif|svg)(\?|$)/i.test(lower)) return false;
      return /\.jpe?g/i.test(lower);
    }

    var slideshowExcludedFiles = ['IMG_0226.JPG.jpeg', 'IMG_1935.JPG.jpeg', 'IMG_9446.JPG.jpeg'];

    function isSlideshowExcluded(src) {
      if (!src) return false;
      var lower = src.toLowerCase();
      return slideshowExcludedFiles.some(function (file) {
        return lower.indexOf(file.toLowerCase()) !== -1;
      });
    }

    var slides = PROJECTS.map(function (p) {
      var fallbackSrc = (p.image || '').replace(/^\.\.\//, '');
      if (!fallbackSrc) return null;
      return {
        src: fallbackSrc,
        alt: (p.title || 'Project') + ' — Shilpkarr'
      };
    })
      .filter(Boolean)
      .filter(function (s) {
        return isSlideshowPhotoPath(s.src) && !isSlideshowExcluded(s.src);
      });

    function projectPath(p) {
      return (p.image || '').replace(/^\.\.\//, '');
    }

    var byFallback = {};
    slides.forEach(function (s) {
      byFallback[s.src] = s;
    });

    var heroSlide = slides.find(function (s) {
      return s.src.indexOf(heroSlideFile) !== -1;
    });
    var secondIx = Math.max(0, Math.min(secondSlideOneBased - 1, PROJECTS.length - 1));
    var secondPath = projectPath(PROJECTS[secondIx]);
    var secondSlide = secondPath ? byFallback[secondPath] : null;

    var ordered = [];
    if (heroSlide) ordered.push(heroSlide);
    if (secondSlide && secondSlide !== heroSlide) ordered.push(secondSlide);

    PROJECTS.forEach(function (p, i) {
      var path = projectPath(p);
      if (!path || path.indexOf(heroSlideFile) !== -1) return;
      if (i === secondIx) return;
      var item = byFallback[path];
      if (item && ordered.indexOf(item) === -1) ordered.push(item);
    });

    slides = ordered;

    var slideImgs = slideshowInner.querySelectorAll('.featured-slide');
    var carousel = document.querySelector('.featured-slideshow-carousel');
    var btnPrev = carousel ? carousel.querySelector('.featured-slideshow-nav--prev') : null;
    var btnNext = carousel ? carousel.querySelector('.featured-slideshow-nav--next') : null;

    if (slideImgs.length >= 2 && slides.length) {
      var intervalMs = 5000;
      var idx = 0;
      var visibleFront = true;
      var motionOk = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      var slideBusy = false;
      var autoplayTimer = null;

      function bindSlideLoad(showEl, next, crossfade) {
        showEl.onload = function () {
          showEl.onload = null;
          showEl.onerror = null;
          crossfade();
        };
        showEl.onerror = function () {
          showEl.onload = null;
          showEl.onerror = null;
          slideBusy = false;
        };
      }

      slideImgs[0].src = slides[0].src;
      slideImgs[0].alt = slides[0].alt;
      slideImgs[0].classList.add('is-visible');
      slideImgs[1].classList.remove('is-visible');

      function goToSlide(nextIdx) {
        if (slides.length <= 1 || slideBusy) return;
        slideBusy = true;
        var hideEl = visibleFront ? slideImgs[0] : slideImgs[1];
        var showEl = visibleFront ? slideImgs[1] : slideImgs[0];
        var next = slides[nextIdx];

        function crossfade() {
          hideEl.classList.remove('is-visible');
          showEl.classList.add('is-visible');
          idx = nextIdx;
          visibleFront = !visibleFront;
          slideBusy = false;
        }

        showEl.alt = next.alt;
        bindSlideLoad(showEl, next, crossfade);
        showEl.src = next.src;
        if (showEl.complete && showEl.naturalHeight !== 0) {
          showEl.onload = null;
          showEl.onerror = null;
          crossfade();
        }
      }

      function advanceNext() {
        goToSlide((idx + 1) % slides.length);
      }

      function advancePrev() {
        goToSlide((idx - 1 + slides.length) % slides.length);
      }

      function restartAutoplay() {
        if (!motionOk || slides.length <= 1) return;
        if (autoplayTimer !== null) {
          window.clearInterval(autoplayTimer);
        }
        autoplayTimer = window.setInterval(advanceNext, intervalMs);
      }

      if (motionOk && slides.length > 1) {
        restartAutoplay();
      }

      function onNavClick(go) {
        return function (e) {
          e.preventDefault();
          e.stopPropagation();
          go();
          restartAutoplay();
        };
      }

      if (btnPrev) {
        btnPrev.addEventListener('click', onNavClick(advancePrev));
      }
      if (btnNext) {
        btnNext.addEventListener('click', onNavClick(advanceNext));
      }
    }
  }
})();
