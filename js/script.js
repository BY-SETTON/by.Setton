// Sticky nav
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 40);
});

// Scroll fade-in for sections
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.style.opacity = '1';
      e.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.service-card, .step, .why-item').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  observer.observe(el);
});

// Contact form
const form = document.querySelector('.contact-form');
if (form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = form.querySelector('.form-submit');
    btn.textContent = 'Sending...';
    try {
      const res = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { 'Accept': 'application/json' }
      });
      if (res.ok) {
        form.reset();
        btn.style.display = 'none';
        document.getElementById('form-success').style.display = 'block';
      } else {
        btn.innerHTML = 'Something went wrong — try again <span class="arrow">→</span>';
        btn.style.background = '#c0392b';
      }
    } catch (err) {
      btn.innerHTML = 'Something went wrong — try again <span class="arrow">→</span>';
      btn.style.background = '#c0392b';
    }
  });
}

(function() {
  const track = document.getElementById('testimonialsTrack');
  const dotsWrap = document.getElementById('tDots');
  const prevBtn = document.getElementById('tPrev');
  const nextBtn = document.getElementById('tNext');
  if (!track) return;
 
  const cards = track.querySelectorAll('.testimonial-card');
  let current = 0;
 
  // Build dots
  cards.forEach((_, i) => {
    const dot = document.createElement('div');
    dot.className = 't-dot' + (i === 0 ? ' active' : '');
    dot.addEventListener('click', () => goTo(i));
    dotsWrap.appendChild(dot);
  });
 
  function goTo(n) {
    current = n;
    track.style.transform = `translateX(-${current * 100}%)`;
    dotsWrap.querySelectorAll('.t-dot').forEach((d, i) =>
      d.classList.toggle('active', i === current)
    );
    prevBtn.disabled = current === 0;
    nextBtn.disabled = current === cards.length - 1;
  }
 
  prevBtn.addEventListener('click', () => goTo(current - 1));
  nextBtn.addEventListener('click', () => goTo(current + 1));
  goTo(0);
})();