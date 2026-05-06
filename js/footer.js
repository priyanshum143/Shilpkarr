(function () {
  // Use relative links so the site works when opening index.html directly (file://)
  var href = window.location.href || '';
  var inAbout = /\/about\//.test(href) || /\\about\\/.test(href);
  var inWork = /\/work\//.test(href) || /\\work\\/.test(href);
  var inContact = /\/contact\//.test(href) || /\\contact\\/.test(href);
  var base = (inAbout || inWork || inContact) ? '../' : '';
  var homeLink = base ? base + 'index.html' : 'index.html';
  var aboutLink = inAbout ? 'index.html' : base + 'about/index.html';
  var workLink = inWork ? 'index.html' : base + 'work/index.html';
  var contactLink = inContact ? 'index.html' : base + 'contact/index.html';

  var footerHTML = '<footer class="site-footer">' +
    '<div class="container">' +
      '<div class="footer-grid">' +
        '<div class="footer-brand">' +
          '<a href="' + homeLink + '" class="logo">Shilpkarr</a>' +
          '<p>Architecture, interiors, and turnkey construction in Sirsa, Hisar, Panipat and beyond. Design that feels like home.</p>' +
        '</div>' +
        '<div class="footer-links">' +
          '<h4>Quick Links</h4>' +
          '<a href="' + homeLink + '">Home</a>' +
          '<a href="' + aboutLink + '">About</a>' +
          '<a href="' + workLink + '">Work</a>' +
          '<a href="' + contactLink + '">Contact</a>' +
        '</div>' +
        '<div class="footer-contact">' +
          '<h4>Contact</h4>' +
          '<p><strong>Office 1:</strong> Hisar Rd, near Bajaj Sweets, Khanna Colony, Sirsa, Haryana 125055</p>' +
          '<p><strong>Office 2:</strong> 3rd Floor, Mehta Tower, Gurudowara Road, Model Town, Hisar, Haryana 125005</p>' +
          '<p><strong>Office 3:</strong> 259, New Sukhdev Nagar, Panipat, Haryana 132103</p>' +
          '<p class="footer-contact-line">' +
            '<span class="footer-email"><a href="mailto:shilpkarr@gmail.com">shilpkarr@gmail.com</a></span>' +
          '</p>' +
        '</div>' +
      '</div>' +
      '<div class="footer-bottom">' +
        '<p>&copy; 2026 Shilpkarr Architect & Interior Designer. All rights reserved.</p>' +
      '</div>' +
    '</div>' +
  '</footer>';

  var el = document.getElementById('footer-placeholder');
  if (el) el.outerHTML = footerHTML;
})();
