// Smooth scroll
document.querySelectorAll('nav a').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const target = document.querySelector(link.getAttribute('href'));
    target.scrollIntoView({ behavior: 'smooth' });
  });
});

// Contact form
const form = document.getElementById('contact-form');
const formMessage = document.getElementById('form-message');

if (form) {
  form.addEventListener('submit', e => {
    e.preventDefault();
    formMessage.textContent = "Thanks! Your message has been sent.";
    form.reset();
    setTimeout(() => formMessage.textContent = "", 3000);
  });
}

// Reveal sections + skill bars
function revealOnScroll() {
  const reveals = document.querySelectorAll('.reveal');
  const windowHeight = window.innerHeight;

  reveals.forEach((el, i) => {
    const top = el.getBoundingClientRect().top;
    if (top < windowHeight - 100) {
      setTimeout(() => el.classList.add('active'), i * 100);

      if (el.id === "skills") {
        el.querySelectorAll('.bar span').forEach((bar, j) => {
          setTimeout(() => {
            bar.style.width = bar.getAttribute('data-width');
          }, j * 300);
        });
      }
    }
  });
}

// Hero background parallax
window.addEventListener('scroll', () => {
  const heroBg = document.querySelector('.hero-bg');
  if (heroBg) {
    heroBg.style.transform = `translateY(${window.scrollY * 0.2}px)`;
  }
});

// Throttle scroll
let throttleTimer;
window.addEventListener('scroll', () => {
  if (!throttleTimer) {
    throttleTimer = true;
    setTimeout(() => {
      revealOnScroll();
      throttleTimer = null;
    }, 200);
  }
});

revealOnScroll();

// Typing effect
const roles = ["Web Developer", "Python Developer", "Java Enthusiast"];
let i = 0, j = 0, isDeleting = false, currentRole='';
const typingSpeed = 150, erasingSpeed = 80, delay = 1500;

function type() {
  const role = roles[i];
  if (!isDeleting) { currentRole = role.substring(0, j+1); j++; }
  else { currentRole = role.substring(0, j-1); j--; }

  document.getElementById('typing').textContent = currentRole;

  if (!isDeleting && j === role.length) setTimeout(()=>isDeleting=true, delay);
  else if (isDeleting && j === 0) { isDeleting=false; i=(i+1)%roles.length; }

  setTimeout(type, isDeleting ? erasingSpeed : typingSpeed);
}
document.addEventListener('DOMContentLoaded', type);
