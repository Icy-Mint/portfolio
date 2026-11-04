// Mobile nav toggle
const navToggle = document.getElementById('nav-toggle');
const siteNav = document.getElementById('site-nav');

navToggle.addEventListener('click', () => {
  const isOpen = siteNav.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', isOpen);
});

siteNav.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    siteNav.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

// Highlight the nav link for whichever section is currently in view
const navLinks = Array.from(siteNav.querySelectorAll('a[data-nav]'));
const sections = navLinks
  .map((link) => document.getElementById(link.dataset.nav))
  .filter(Boolean);

if ('IntersectionObserver' in window && sections.length) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        navLinks.forEach((link) => {
          link.classList.toggle('is-active', link.dataset.nav === entry.target.id);
        });
      });
    },
    { rootMargin: '-40% 0px -55% 0px' }
  );

  sections.forEach((section) => observer.observe(section));
}

// Footer year
document.getElementById('year').textContent = new Date().getFullYear();

// Contact form submission, posted to a Google Apps Script Web App.
// Submits into a hidden iframe (instead of fetch) so the page never navigates
// away and we avoid cross-origin issues with the Apps Script endpoint.
const form = document.getElementById('contact-form');
const status = document.getElementById('form-status');
const hiddenFrame = document.getElementById('hidden_iframe');

let submitted = false;

form.addEventListener('submit', () => {
  submitted = true;
  status.textContent = 'Sending...';
});

hiddenFrame.addEventListener('load', () => {
  if (!submitted) return; // ignore the iframe's initial blank load
  status.textContent = 'Message sent — thank you!';
  form.reset();
  submitted = false;
});
