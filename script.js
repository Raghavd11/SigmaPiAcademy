const hamburger = document.querySelector('.hamburger');
const mobileOverlay = document.querySelector('.mobile-overlay');

// Toggle mobile menu with translucent background
hamburger.addEventListener('click', () => {
  mobileOverlay.classList.toggle('hidden');
  hamburger.classList.toggle('active'); // toggles ☰ ↔ ✖
});

// Optional: close menu on nav item click (mobile)
document.querySelectorAll('.mobile-menu .nav-item').forEach(item => {
  item.addEventListener('click', () => {
    document.querySelectorAll('.mobile-menu .nav-item').forEach(i => i.classList.remove('active'));
    item.classList.add('active');
    mobileOverlay.classList.add('hidden');
  });
});

// Handle nav item activation for both desktop and mobile separately
document.querySelectorAll('.nav-links .nav-item').forEach(item => {
  item.addEventListener('click', () => {
    document.querySelectorAll('.nav-links .nav-item').forEach(i => i.classList.remove('active'));
    item.classList.add('active');
  });
});

// Close on nav item click
document.querySelectorAll('.mobile-menu .nav-item').forEach(item => {
  item.addEventListener('click', () => {
    document.querySelectorAll('.mobile-menu .nav-item').forEach(i => i.classList.remove('active'));
    item.classList.add('active');

    mobileOverlay.classList.add('hidden');
    hamburger.classList.remove('active');
  });
});
