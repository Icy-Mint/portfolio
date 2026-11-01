// Typewriter effect for the intro heading
const typewriterEl = document.getElementById('typewriter');
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (typewriterEl) {
  const text = "Hi, I'm Icy-Mint.";

  if (prefersReducedMotion) {
    typewriterEl.textContent = text;
  } else {
    let i = 0;
    const typeNext = () => {
      if (i < text.length) {
        typewriterEl.textContent += text.charAt(i);
        i++;
        setTimeout(typeNext, 60);
      }
    };
    typeNext();
  }
}

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
