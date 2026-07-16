/* =========================================================
   MKOMILO HOTEL — JAVASCRIPT
   Pure Vanilla JS — No frameworks
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {

  /* ---------------------------------------------------
     1. PRELOADER
  --------------------------------------------------- */
  const preloader = document.getElementById('preloader');
  window.addEventListener('load', () => {
    preloader.classList.add('hide');
  });

  /* ---------------------------------------------------
     2. ELEMENT REFERENCES
  --------------------------------------------------- */
  const navbar = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');
  const navLinkItems = document.querySelectorAll('.nav-link');
  const scrollTopBtn = document.getElementById('scrollTopBtn');
  const sections = document.querySelectorAll('section[id]');
  const contactForm = document.getElementById('contactForm');
  const formSuccess = document.getElementById('formSuccess');

  /* ---------------------------------------------------
     3. STICKY NAVBAR ON SCROLL
  --------------------------------------------------- */
  function handleNavbarScroll() {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }
  window.addEventListener('scroll', handleNavbarScroll);
  handleNavbarScroll(); // run on load

  /* ---------------------------------------------------
     4. MOBILE HAMBURGER MENU TOGGLE
  --------------------------------------------------- */
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
  });

  // Close mobile menu when a link is clicked
  navLinkItems.forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navLinks.classList.remove('active');
    });
  });

  /* ---------------------------------------------------
     5. SMOOTH SCROLLING FOR ANCHOR LINKS
  --------------------------------------------------- */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        const offset = 80; // navbar height offset
        const targetPosition = targetEl.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  /* ---------------------------------------------------
     6. SCROLL-TO-TOP BUTTON
  --------------------------------------------------- */
  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      scrollTopBtn.classList.add('show');
    } else {
      scrollTopBtn.classList.remove('show');
    }
  });

  scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* ---------------------------------------------------
     7. ACTIVE NAVIGATION HIGHLIGHTING ON SCROLL
  --------------------------------------------------- */
  function highlightActiveNav() {
    let currentSectionId = '';
    const scrollPos = window.scrollY + 120;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;

      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        currentSectionId = section.getAttribute('id');
      }
    });

    navLinkItems.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSectionId}`) {
        link.classList.add('active');
      }
    });
  }
  window.addEventListener('scroll', highlightActiveNav);

  /* ---------------------------------------------------
     8. FADE-IN ANIMATIONS ON SCROLL (Intersection Observer)
  --------------------------------------------------- */
  const animatedElements = document.querySelectorAll('[data-animate]');

  const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Slight stagger delay for grid items
        entry.target.classList.add('in-view');
        obs.unobserve(entry.target);
      }
    });
  }, observerOptions);

  animatedElements.forEach(el => observer.observe(el));

  /* ---------------------------------------------------
     9. CONTACT FORM SUBMISSION (Front-end only demo)
  --------------------------------------------------- */
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      // Basic front-end validation feedback
      const name = contactForm.querySelector('[name="name"]').value.trim();
      const email = contactForm.querySelector('[name="email"]').value.trim();
      const message = contactForm.querySelector('[name="message"]').value.trim();

      if (!name || !email || !message) {
        alert('Please fill in all required fields.');
        return;
      }

      // Simulate successful submission
      formSuccess.classList.add('show');
      contactForm.reset();

      // Hide success message after a few seconds
      setTimeout(() => {
        formSuccess.classList.remove('show');
      }, 4000);
    });
  }

  /* ---------------------------------------------------
     10. HERO PARALLAX-LIKE EFFECT (subtle, optional)
  --------------------------------------------------- */
  const hero = document.querySelector('.hero');
  if (hero) {
    window.addEventListener('scroll', () => {
      const scrollY = window.scrollY;
      if (scrollY < window.innerHeight) {
        hero.style.backgroundPositionY = `${scrollY * 0.4}px`;
      }
    });
  }

});
