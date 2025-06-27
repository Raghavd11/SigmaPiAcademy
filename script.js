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

const openBtn = document.getElementById('openModal');
const modal = document.getElementById('registerModal');
const closeBtn = document.getElementById('closeModal');
const overlay = document.getElementById('modalOverlay');

openBtn.addEventListener('click', () => {
  modal.style.display = 'block';
});

closeBtn.addEventListener('click', () => {
  modal.style.display = 'none';
});

overlay.addEventListener('click', () => {
  modal.style.display = 'none';
});


// Get DOM elements
const track = document.querySelector('.carousel-track');
const cards = Array.from(document.querySelectorAll('.course-card'));
const leftArrow = document.querySelector('.arrow.left');
const rightArrow = document.querySelector('.arrow.right');

const cardWidth = cards[0].offsetWidth + 100; // includes gap
let position = 0;

// Clone all cards and append to the track
cards.forEach(card => {
  const clone = card.cloneNode(true);
  track.appendChild(clone);
});

// Total cards after clone
const totalCards = document.querySelectorAll('.course-card').length;

// Move carousel to position
function moveCarousel() {
  track.style.transition = 'transform 0.5s linear';
  track.style.transform = `translateX(-${position}px)`;
}

// Auto move
function moveForward() {
  position += cardWidth;
  moveCarousel();

  // Reset when midpoint reached (after original cards)
  if (position >= cardWidth * cards.length) {
    setTimeout(() => {
      track.style.transition = 'none';
      position = 0;
      track.style.transform = 'translateX(0)';
    }, 510);
  }
}

// Move backward
function moveBackward() {
  if (position <= 0) {
    position = cardWidth * cards.length;
    track.style.transition = 'none';
    track.style.transform = `translateX(-${position}px)`;
    setTimeout(() => {
      position -= cardWidth;
      track.style.transition = 'transform 0.5s linear';
      track.style.transform = `translateX(-${position}px)`;
    }, 10);
  } else {
    position -= cardWidth;
    moveCarousel();
  }
}

// Arrows
rightArrow.addEventListener('click', moveForward);
leftArrow.addEventListener('click', moveBackward);

// Auto-scroll every 2s
setInterval(moveForward, 2000);
