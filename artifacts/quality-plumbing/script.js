/* Quality Plumbing Service — Vanilla JS */

document.addEventListener('DOMContentLoaded', function () {

  /* =====================
     NAVBAR scroll effect
  ===================== */
  const navbar = document.getElementById('navbar');
  function handleScroll() {
    if (window.scrollY > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }
  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  /* =====================
     MOBILE NAV TOGGLE
  ===================== */
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');

  navToggle.addEventListener('click', function () {
    navLinks.classList.toggle('open');
  });

  // Close nav on link click
  navLinks.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      navLinks.classList.remove('open');
    });
  });

  /* =====================
     SMOOTH SCROLL for anchor links
  ===================== */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = 80;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top: top, behavior: 'smooth' });
      }
    });
  });

  /* =====================
     GALLERY FILTER
  ===================== */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');

  filterBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      filterBtns.forEach(function (b) { b.classList.remove('active'); });
      this.classList.add('active');

      var filter = this.getAttribute('data-filter');
      galleryItems.forEach(function (item) {
        if (filter === 'all') {
          item.classList.remove('hidden');
        } else {
          var cats = item.getAttribute('data-category') || '';
          if (cats.includes(filter)) {
            item.classList.remove('hidden');
          } else {
            item.classList.add('hidden');
          }
        }
      });
    });
  });

  /* =====================
     FAQ ACCORDION
  ===================== */
  document.querySelectorAll('.faq-question').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var expanded = this.getAttribute('aria-expanded') === 'true';
      // Close all
      document.querySelectorAll('.faq-question').forEach(function (q) {
        q.setAttribute('aria-expanded', 'false');
        var ans = q.nextElementSibling;
        if (ans) ans.classList.remove('open');
      });
      // Open clicked if it was closed
      if (!expanded) {
        this.setAttribute('aria-expanded', 'true');
        var answer = this.nextElementSibling;
        if (answer) answer.classList.add('open');
      }
    });
  });

  /* =====================
     STATS COUNTER ANIMATION
  ===================== */
  var statsObserved = false;
  var statNums = document.querySelectorAll('.stat-num');

  function animateCounters() {
    statNums.forEach(function (el) {
      var target = parseInt(el.getAttribute('data-target'), 10);
      var start = 0;
      var duration = 1800;
      var step = Math.ceil(target / (duration / 16));
      var current = 0;

      var timer = setInterval(function () {
        current += step;
        if (current >= target) {
          current = target;
          clearInterval(timer);
        }
        el.textContent = current.toLocaleString();
      }, 16);
    });
  }

  var statsSection = document.querySelector('.stats-section');
  if (statsSection && 'IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting && !statsObserved) {
          statsObserved = true;
          animateCounters();
        }
      });
    }, { threshold: 0.4 });
    observer.observe(statsSection);
  }

  /* =====================
     BOOKING FORM → WhatsApp
  ===================== */
  var bookingForm = document.getElementById('bookingForm');
  if (bookingForm) {
    bookingForm.addEventListener('submit', function (e) {
      e.preventDefault();

      var name    = document.getElementById('name').value.trim();
      var phone   = document.getElementById('phone').value.trim();
      var service = document.getElementById('service').value;
      var date    = document.getElementById('date').value;
      var message = document.getElementById('message').value.trim();

      if (!name || !phone || !service) {
        alert('Please fill in your name, phone number, and service required.');
        return;
      }

      var text = 'Hello Quality Plumbing Service! I would like to book a service.\n\n'
        + '*Name:* ' + name + '\n'
        + '*Phone:* ' + phone + '\n'
        + '*Service:* ' + service + '\n'
        + (date ? '*Preferred Date:* ' + date + '\n' : '')
        + (message ? '*Details:* ' + message + '\n' : '')
        + '\nPlease confirm my appointment. Thank you!';

      var encoded = encodeURIComponent(text);
      window.open('https://wa.me/919867976495?text=' + encoded, '_blank');
    });
  }

  /* =====================
     SCROLL REVEAL (lightweight)
  ===================== */
  if ('IntersectionObserver' in window) {
    var revealEls = document.querySelectorAll(
      '.service-card, .feature-card, .testimonial-card, .gallery-item, .stat-item, .faq-item, .contact-card'
    );

    revealEls.forEach(function (el) {
      el.style.opacity = '0';
      el.style.transform = 'translateY(18px)';
      el.style.transition = 'opacity 0.45s ease, transform 0.45s ease';
    });

    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    revealEls.forEach(function (el) {
      revealObserver.observe(el);
    });
  }

  /* =====================
     STAGGER delay for grids
  ===================== */
  function staggerChildren(selector) {
    document.querySelectorAll(selector).forEach(function (parent) {
      Array.from(parent.children).forEach(function (child, i) {
        child.style.transitionDelay = (i * 60) + 'ms';
      });
    });
  }
  staggerChildren('.services-grid');
  staggerChildren('.features-grid');
  staggerChildren('.testimonials-grid');
  staggerChildren('.gallery-grid');

});
