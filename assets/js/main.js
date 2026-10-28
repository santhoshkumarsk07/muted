/*
 * MMI Hydrogen Technologies — site behaviour.
 * No dependencies. All dynamic content is built with DOM APIs (textContent),
 * never by injecting HTML strings.
 */
(function () {
  'use strict';

  var catalogue = window.MMI_CATALOGUE || { categories: [], products: [] };
  var categoriesById = {};
  catalogue.categories.forEach(function (c) { categoriesById[c.id] = c; });

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  var SVG_NS = 'http://www.w3.org/2000/svg';

  /* ---------- Small helpers ---------- */
  function $(sel, root) { return (root || document).querySelector(sel); }
  function $all(sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }

  function el(tag, attrs, children) {
    var node = document.createElement(tag);
    if (attrs) {
      Object.keys(attrs).forEach(function (key) {
        var value = attrs[key];
        if (value == null || value === false) return;
        if (key === 'text') node.textContent = value;
        else if (key === 'className') node.className = value;
        else node.setAttribute(key, value === true ? '' : value);
      });
    }
    (children || []).forEach(function (child) {
      if (child) node.appendChild(typeof child === 'string' ? document.createTextNode(child) : child);
    });
    return node;
  }

  function icon(id, extraClass) {
    var svg = document.createElementNS(SVG_NS, 'svg');
    svg.setAttribute('class', 'icon' + (extraClass ? ' ' + extraClass : ''));
    svg.setAttribute('aria-hidden', 'true');
    svg.setAttribute('focusable', 'false');
    var use = document.createElementNS(SVG_NS, 'use');
    use.setAttribute('href', '#' + id);
    svg.appendChild(use);
    return svg;
  }

  function productsIn(categoryId) {
    return catalogue.products.filter(function (p) { return p.category === categoryId; });
  }

  // Only categories that actually contain products are shown anywhere.
  var activeCategories = catalogue.categories.filter(function (c) { return productsIn(c.id).length > 0; });

  function scrollToId(id) {
    var target = document.getElementById(id);
    if (!target) return;
    target.scrollIntoView({ behavior: reduceMotion.matches ? 'auto' : 'smooth', block: 'start' });
  }

  /* ---------- Product media (image with branded fallback) ---------- */
  function placeholder(category) {
    return el('div', { className: 'media-placeholder' }, [
      el('span', { className: 'ph-icon' }, [icon(category ? category.icon : 'i-hydrogen')]),
      el('span', { className: 'ph-note', text: 'Image coming soon' })
    ]);
  }

  var IMG_DIR = 'assets/img/products/';
  // Cards use the 640px derivative, the dialog the 1200px one.
  function imageUrl(name, size) { return IMG_DIR + name + '-' + size + '.webp'; }

  function productMedia(product, opts) {
    var category = categoriesById[product.category];
    if (!product.image) return placeholder(category);
    var large = opts && opts.large;
    var img = el('img', {
      src: imageUrl(product.image, large ? 'lg' : 'sm'),
      alt: product.imageAlt || product.name,
      className: product.fit === 'cover' && !large ? 'fit-cover' : null,
      loading: large ? null : 'lazy',
      decoding: 'async',
      width: 800,
      height: 600
    });
    img.addEventListener('error', function () {
      if (img.parentNode) img.parentNode.replaceChild(placeholder(category), img);
    }, { once: true });
    return img;
  }

  /* ---------- Header: scrolled state ---------- */
  function initHeader() {
    var header = $('[data-header]');
    if (!header) return;
    var ticking = false;
    function update() {
      header.classList.toggle('is-scrolled', window.scrollY > 12);
      ticking = false;
    }
    window.addEventListener('scroll', function () {
      if (!ticking) { ticking = true; window.requestAnimationFrame(update); }
    }, { passive: true });
    update();
  }

  /* ---------- Mobile navigation ---------- */
  function initNav() {
    var toggle = $('[data-nav-toggle]');
    var menu = $('[data-nav-menu]');
    var header = $('[data-header]');
    if (!toggle || !menu) return;
    var mobileQuery = window.matchMedia('(max-width: 960px)');

    function isOpen() { return toggle.getAttribute('aria-expanded') === 'true'; }

    function setOpen(open, returnFocus) {
      toggle.setAttribute('aria-expanded', String(open));
      menu.classList.toggle('is-open', open);
      header.classList.toggle('menu-open', open);
      if (open) {
        var first = menu.querySelector('a');
        if (first) first.focus();
      } else if (returnFocus) {
        toggle.focus();
      }
    }

    // On mobile the closed menu is hidden from keyboard/AT via visibility (CSS).
    toggle.addEventListener('click', function () { setOpen(!isOpen()); });

    menu.addEventListener('click', function (e) {
      if (e.target.closest('a') && isOpen()) setOpen(false);
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && isOpen()) setOpen(false, true);
    });

    document.addEventListener('click', function (e) {
      if (isOpen() && !header.contains(e.target)) setOpen(false);
    });

    mobileQuery.addEventListener('change', function (e) {
      if (!e.matches && isOpen()) setOpen(false);
    });
  }

  /* ---------- Active nav link for the section in view ---------- */
  function initActiveSection() {
    var links = $all('.nav-list [data-nav-link]');
    if (!('IntersectionObserver' in window) || !links.length) return;
    var byId = {};
    links.forEach(function (link) { byId[link.getAttribute('href').slice(1)] = link; });

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        links.forEach(function (l) { l.removeAttribute('aria-current'); });
        var link = byId[entry.target.id];
        if (link) link.setAttribute('aria-current', 'true');
      });
    }, { rootMargin: '-45% 0px -50% 0px' });

    Object.keys(byId).forEach(function (id) {
      var section = document.getElementById(id);
      if (section) observer.observe(section);
    });
  }

  /* ---------- Scroll reveal ---------- */
  var revealObserver = null;
  function observeReveal(nodes) {
    if (!revealObserver) {
      nodes.forEach(function (n) { n.classList.add('is-visible'); });
      return;
    }
    nodes.forEach(function (n) { revealObserver.observe(n); });
  }

  function initReveal() {
    if ('IntersectionObserver' in window && !reduceMotion.matches) {
      revealObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            revealObserver.unobserve(entry.target);
          }
        });
      }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    }
    observeReveal($all('.reveal'));
  }

  /* ---------- Catalogue rendering ---------- */
  var productDialog;

  function renderExpertise() {
    var list = $('[data-expertise]');
    if (!list) return;
    activeCategories.forEach(function (cat, i) {
      var count = productsIn(cat.id).length;
      var link = el('a', { href: '#products', 'data-filter-link': cat.id }, [
        el('span', { className: 'icon-badge' }, [icon(cat.icon)]),
        el('span', null, [
          el('strong', { text: cat.name }),
          el('small', { text: count + (count === 1 ? ' product' : ' products') })
        ])
      ]);
      var item = el('li', { className: 'reveal', style: '--i:' + i }, [link]);
      list.appendChild(item);
    });
  }

  function renderSolutions() {
    var list = $('[data-solutions]');
    if (!list) return;
    activeCategories.forEach(function (cat, i) {
      var tags = el('ul', { className: 'solution-products', 'aria-label': 'Products in ' + cat.name });
      productsIn(cat.id).forEach(function (p) { tags.appendChild(el('li', { text: p.name })); });

      var card = el('article', { className: 'solution-card' }, [
        el('span', { className: 'solution-num', 'aria-hidden': 'true', text: String(i + 1).padStart(2, '0') }),
        el('span', { className: 'icon-badge' }, [icon(cat.icon)]),
        el('h3', { text: cat.name }),
        el('p', { text: cat.solution }),
        tags,
        el('button', { className: 'btn-text', type: 'button', 'data-filter-link': cat.id }, [
          'View ' + cat.name.toLowerCase() + ' products ', icon('i-arrow')
        ])
      ]);
      list.appendChild(el('li', { className: 'reveal', style: '--i:' + (i % 3) }, [card]));
    });
  }

  function renderFooterCategories() {
    var list = $('[data-footer-categories]');
    if (!list) return;
    activeCategories.forEach(function (cat) {
      list.appendChild(el('li', null, [el('a', { href: '#products', 'data-filter-link': cat.id, text: cat.name })]));
    });
  }

  function renderInterestOptions() {
    var select = $('[data-interest-select]');
    if (!select) return;
    activeCategories.forEach(function (cat) {
      var group = el('optgroup', { label: cat.name });
      productsIn(cat.id).forEach(function (p) { group.appendChild(el('option', { value: p.name, text: p.name })); });
      select.appendChild(group);
    });
  }

  function renderProducts() {
    var grid = $('[data-product-grid]');
    if (!grid) return;
    catalogue.products.forEach(function (product, i) {
      var category = categoriesById[product.category];
      var titleId = 'pc-' + product.id;
      var media = el('div', { className: 'pc-media' + (product.image ? ' has-image' : '') }, [
        productMedia(product),
        category ? el('span', { className: 'pc-cat-badge', text: category.name }) : null
      ]);
      var card = el('li', {
        className: 'product-card reveal',
        'data-category': product.category,
        style: '--i:' + (i % 3)
      }, [
        el('article', { 'aria-labelledby': titleId }, [
          media,
          el('div', { className: 'pc-body' }, [
            el('h3', { className: 'pc-title', id: titleId, text: product.name }),
            product.model ? el('p', { className: 'pc-model', text: 'Model ' + product.model }) : null,
            el('p', { className: 'pc-summary', text: product.summary }),
            el('div', { className: 'pc-actions' }, [
              el('button', {
                className: 'btn-text', type: 'button', 'data-open-product': product.id,
                'aria-label': 'View details: ' + product.name
              }, ['View details ', icon('i-arrow')]),
              el('button', {
                className: 'btn btn-sm btn-outline', type: 'button', 'data-enquire': product.name,
                'aria-label': 'Enquire about ' + product.name
              }, ['Enquire'])
            ])
          ])
        ])
      ]);
      grid.appendChild(card);
    });
  }

  /* ---------- Filters ---------- */
  var currentFilter = 'all';

  function renderFilters() {
    var wrap = $('[data-filters]');
    if (!wrap) return;
    var options = [{ id: 'all', name: 'All products', count: catalogue.products.length }]
      .concat(activeCategories.map(function (c) { return { id: c.id, name: c.name, count: productsIn(c.id).length }; }));

    options.forEach(function (opt) {
      var btn = el('button', {
        className: 'filter-btn', type: 'button',
        'aria-pressed': String(opt.id === 'all'), 'data-filter': opt.id
      }, [
        opt.name,
        el('span', { className: 'filter-count', 'aria-hidden': 'true', text: String(opt.count) }),
        el('span', { className: 'visually-hidden', text: ', ' + opt.count + (opt.count === 1 ? ' product' : ' products') })
      ]);
      wrap.appendChild(btn);
    });

    wrap.addEventListener('click', function (e) {
      var btn = e.target.closest('[data-filter]');
      if (btn) setFilter(btn.getAttribute('data-filter'));
    });
  }

  function setFilter(categoryId) {
    if (categoryId !== 'all' && !categoriesById[categoryId]) categoryId = 'all';
    currentFilter = categoryId;

    $all('[data-filter]').forEach(function (btn) {
      btn.setAttribute('aria-pressed', String(btn.getAttribute('data-filter') === categoryId));
    });

    var shown = 0;
    $all('.product-card').forEach(function (card) {
      var match = categoryId === 'all' || card.getAttribute('data-category') === categoryId;
      card.hidden = !match;
      card.classList.remove('is-filtered-in');
      if (match) {
        card.style.setProperty('--i', String(shown));
        card.classList.add('is-visible');
        // restart the short entrance animation
        void card.offsetWidth;
        card.classList.add('is-filtered-in');
        shown++;
      }
    });

    var status = $('[data-filter-status]');
    if (status) {
      var label = categoryId === 'all' ? 'all categories' : categoriesById[categoryId].name;
      status.textContent = 'Showing ' + shown + (shown === 1 ? ' product' : ' products') + ' in ' + label + '.';
    }
  }

  // Any element with data-filter-link jumps to the catalogue pre-filtered.
  function initFilterLinks() {
    document.addEventListener('click', function (e) {
      var link = e.target.closest('[data-filter-link]');
      if (!link) return;
      e.preventDefault();
      setFilter(link.getAttribute('data-filter-link'));
      scrollToId('products');
      var activeBtn = $('[data-filter][aria-pressed="true"]');
      if (activeBtn) {
        activeBtn.focus({ preventScroll: true });
        activeBtn.scrollIntoView({ block: 'nearest', inline: 'center' });
      }
    });
  }

  /* ---------- Product dialog ---------- */
  function listSection(title, items) {
    if (!items || !items.length) return null;
    var ul = el('ul');
    items.forEach(function (item) { ul.appendChild(el('li', { text: item })); });
    return el('div', { className: 'pd-section' }, [el('h3', { text: title }), ul]);
  }

  function specsSection(specs) {
    if (!specs || !specs.length) {
      return el('div', { className: 'pd-section' }, [
        el('h3', { text: 'Specifications' }),
        el('p', { className: 'pd-note', text: 'Contact us for specifications and datasheets for this product.' })
      ]);
    }
    var tbody = el('tbody');
    specs.forEach(function (row) {
      tbody.appendChild(el('tr', null, [el('th', { scope: 'row', text: row[0] }), el('td', { text: row[1] })]));
    });
    return el('div', { className: 'pd-section' }, [
      el('h3', { text: 'Specifications' }),
      el('table', { className: 'pd-specs' }, [tbody])
    ]);
  }

  function initDialog() {
    productDialog = $('[data-product-dialog]');
    if (!productDialog) return;
    var lastTrigger = null;
    var currentProduct = null;

    function fillMedia(product) {
      var media = $('[data-pd-media]', productDialog);
      media.replaceChildren(productMedia(product, { large: true }));
      var images = product.image ? [{ image: product.image, alt: product.imageAlt || product.name }] : [];
      (product.gallery || []).forEach(function (g) { images.push(g); });
      if (images.length < 2) return;

      var gallery = el('div', { className: 'pd-gallery', role: 'group', 'aria-label': 'Product images' });
      images.forEach(function (image, i) {
        var thumb = el('button', { type: 'button', 'aria-pressed': String(i === 0), 'aria-label': 'Show image: ' + image.alt }, [
          el('img', { src: imageUrl(image.image, 'sm'), alt: '', loading: 'lazy' })
        ]);
        thumb.addEventListener('click', function () {
          var main = media.querySelector(':scope > img');
          if (main) { main.src = imageUrl(image.image, 'lg'); main.alt = image.alt; }
          $all('button', gallery).forEach(function (b) { b.setAttribute('aria-pressed', String(b === thumb)); });
        });
        gallery.appendChild(thumb);
      });
      media.appendChild(gallery);
    }

    function open(productId, trigger) {
      var product = catalogue.products.filter(function (p) { return p.id === productId; })[0];
      if (!product) return;
      currentProduct = product;
      lastTrigger = trigger || document.activeElement;

      var category = categoriesById[product.category];
      $('[data-pd-category]', productDialog).textContent = category ? category.name : '';
      $('[data-pd-title]', productDialog).textContent = product.name;
      var model = $('[data-pd-model]', productDialog);
      model.textContent = product.model ? 'Model ' + product.model : '';
      model.hidden = !product.model;
      $('[data-pd-summary]', productDialog).textContent = product.summary;
      fillMedia(product);

      var sections = $('[data-pd-sections]', productDialog);
      sections.replaceChildren();
      [
        listSection('Features', product.features),
        listSection('Applications', product.applications),
        listSection('Available configurations', product.configurations),
        specsSection(product.specs)
      ].forEach(function (s) { if (s) sections.appendChild(s); });

      if (product.datasheet) {
        sections.appendChild(el('div', { className: 'pd-section' }, [
          el('a', { className: 'link-arrow', href: product.datasheet, target: '_blank', rel: 'noopener' }, ['Download datasheet (PDF) ', icon('i-arrow')])
        ]));
      }

      if (typeof productDialog.showModal === 'function') productDialog.showModal();
      else productDialog.setAttribute('open', '');
      productDialog.scrollTop = 0;
      $('.pd-close', productDialog).focus();
    }

    function close() {
      if (typeof productDialog.close === 'function') productDialog.close();
      else productDialog.removeAttribute('open');
    }

    productDialog.addEventListener('close', function () {
      if (lastTrigger && document.contains(lastTrigger)) lastTrigger.focus({ preventScroll: true });
    });

    // Click on the backdrop (outside the content) closes the dialog.
    productDialog.addEventListener('click', function (e) {
      if (e.target === productDialog) close();
      if (e.target.closest('[data-dialog-close]')) close();
    });

    $('[data-pd-enquire]', productDialog).addEventListener('click', function () {
      var name = currentProduct && currentProduct.name;
      lastTrigger = null;
      close();
      enquireAbout(name);
    });

    document.addEventListener('click', function (e) {
      var btn = e.target.closest('[data-open-product]');
      if (btn) open(btn.getAttribute('data-open-product'), btn);
    });
  }

  /* ---------- Enquiries ---------- */
  function enquireAbout(productName) {
    var select = $('[data-interest-select]');
    if (select && productName) {
      select.value = productName;
      var field = select.closest('.field');
      field.classList.remove('is-highlight');
      void field.offsetWidth;
      field.classList.add('is-highlight');
    }
    scrollToId('contact');
    var nameInput = $('#f-name');
    if (nameInput) nameInput.focus({ preventScroll: true });
  }

  function initEnquireButtons() {
    document.addEventListener('click', function (e) {
      var btn = e.target.closest('[data-enquire]');
      if (btn) enquireAbout(btn.getAttribute('data-enquire'));
    });
  }

  /* ---------- Contact form ---------- */
  var EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  var PHONE_RE = /^[+()0-9\s.\-]{6,40}$/;

  function initForm() {
    var form = $('[data-enquiry-form]');
    if (!form) return;
    var status = $('[data-form-status]', form);
    var submitBtn = $('[data-submit]', form);
    var submitLabel = $('[data-submit-label]', form);
    var submitting = false;

    var rules = {
      name: function (v) { return v.length < 2 ? 'Please enter your name.' : ''; },
      email: function (v) {
        if (!v) return 'Please enter your email address.';
        return EMAIL_RE.test(v) ? '' : 'Please enter a valid email address, for example name@company.com.';
      },
      phone: function (v) { return v && !PHONE_RE.test(v) ? 'Please enter a valid phone number (digits, spaces, + ( ) - only).' : ''; },
      message: function (v) { return v.length < 10 ? 'Please enter a message of at least 10 characters.' : ''; }
    };

    function showError(name, message) {
      var input = form.elements[name];
      var err = document.getElementById('f-' + name + '-err');
      if (message) input.setAttribute('aria-invalid', 'true');
      else input.removeAttribute('aria-invalid');
      if (err) err.textContent = message;
    }

    function validate() {
      var firstInvalid = null;
      Object.keys(rules).forEach(function (name) {
        var input = form.elements[name];
        var message = rules[name](input.value.trim());
        showError(name, message);
        if (message && !firstInvalid) firstInvalid = input;
      });
      return firstInvalid;
    }

    // Re-validate a field once the user has interacted with it after an error.
    form.addEventListener('input', function (e) {
      var name = e.target.name;
      if (rules[name] && e.target.getAttribute('aria-invalid') === 'true') {
        showError(name, rules[name](e.target.value.trim()));
      }
    });

    function setStatus(tone, paragraphs) {
      status.hidden = false;
      status.setAttribute('data-tone', tone);
      status.replaceChildren.apply(status, paragraphs.map(function (p) {
        return typeof p === 'string' ? el('p', { text: p }) : p;
      }));
    }

    function setBusy(busy) {
      submitting = busy;
      submitBtn.disabled = busy;
      submitLabel.textContent = busy ? 'Sending…' : 'Send enquiry';
    }

    function collect() {
      return {
        name: form.elements.name.value.trim(),
        company: form.elements.company.value.trim(),
        email: form.elements.email.value.trim(),
        phone: form.elements.phone.value.trim(),
        interest: form.elements.interest.value,
        message: form.elements.message.value.trim()
      };
    }

    function mailtoLink(address, data) {
      var body = [
        'Name: ' + data.name,
        data.company ? 'Company: ' + data.company : '',
        'Email: ' + data.email,
        data.phone ? 'Phone: ' + data.phone : '',
        'Interest: ' + data.interest,
        '',
        data.message
      ].filter(function (line, i) { return line !== '' || i === 5; }).join('\n');
      return 'mailto:' + encodeURIComponent(address) +
        '?subject=' + encodeURIComponent('Enquiry: ' + data.interest) +
        '&body=' + encodeURIComponent(body);
    }

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (submitting) return;

      var invalid = validate();
      if (invalid) {
        setStatus('error', ['Please correct the highlighted fields and try again.']);
        invalid.focus();
        return;
      }

      // Honeypot filled: silently stop (do not claim success).
      if (form.elements.website.value) return;

      var data = collect();
      var endpoint = form.getAttribute('data-endpoint');
      var mailto = form.getAttribute('data-mailto');

      if (!endpoint) {
        var parts = ['Your enquiry has not been sent: this website’s form is not yet connected to a delivery service.'];
        if (mailto) {
          parts.push(el('p', null, [
            'You can ',
            el('a', { href: mailtoLink(mailto, data), text: 'send it with your email app' }),
            ' instead — your details will be filled in for you.'
          ]));
        } else {
          parts.push('Please contact us directly using the details on this page.');
        }
        setStatus('info', parts);
        return;
      }

      setBusy(true);
      setStatus('info', ['Sending your enquiry…']);
      var controller = 'AbortController' in window ? new AbortController() : null;
      var timer = controller ? setTimeout(function () { controller.abort(); }, 15000) : null;

      fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(data),
        signal: controller ? controller.signal : undefined
      }).then(function (res) {
        if (!res.ok) throw new Error('HTTP ' + res.status);
        form.reset();
        setStatus('success', ['Thank you — your enquiry has been received. Our team will be in touch.']);
      }).catch(function () {
        setStatus('error', ['Sorry, your enquiry could not be sent. Please try again in a moment or contact us directly.']);
      }).then(function () {
        if (timer) clearTimeout(timer);
        setBusy(false);
      });
    });
  }

  /* ---------- Init ---------- */
  function init() {
    var year = $('[data-year]');
    if (year) year.textContent = String(new Date().getFullYear());

    renderExpertise();
    renderFilters();
    renderProducts();
    renderSolutions();
    renderFooterCategories();
    renderInterestOptions();

    initHeader();
    initNav();
    initActiveSection();
    initFilterLinks();
    initDialog();
    initEnquireButtons();
    initForm();
    initReveal();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
