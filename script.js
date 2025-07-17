const hamburger = document.getElementById('hamburger');
const mobileOverlay = document.getElementById('mobileOverlay');
const mobileMenu = document.getElementById('mobileMenu');
const closebtn = document.getElementById('closeMenu');

// Hamburger click opens the menu
hamburger.addEventListener('click', () => {
  mobileOverlay.classList.remove('hidden');
  mobileMenu.classList.remove('hidden');
  closebtn.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
  hamburger.textContent = '✖';
});

// Close button click hides the menu
closebtn.addEventListener('click', () => {
  mobileOverlay.classList.add('hidden');
  mobileMenu.classList.add('hidden');
  closebtn.classList.add('hidden');
  document.body.style.overflow = 'auto';
  hamburger.textContent = '☰';
});

// Toggle the Courses submenu
const coursesToggle = document.getElementById('coursesToggle');
const coursesSubmenu = document.getElementById('coursesSubmenu');

coursesToggle.addEventListener('click', () => {
  coursesSubmenu.classList.toggle('hidden');
});

window.addEventListener('resize', () => {
  if (window.innerWidth > 1024) {
    mobileOverlay.classList.add('hidden');
    mobileMenu.classList.add('hidden');
    closebtn.classList.add('hidden');
    document.body.style.overflow = 'auto';
    hamburger.textContent = '☰';
  }
});

document.addEventListener('DOMContentLoaded', function () {
  const openBtn = document.getElementById('openModal');
  const openBtnMobile = document.getElementById('openModalMobile');
  const modal = document.getElementById('registerModal');
  const closeBtn = document.getElementById('closeModal');
  const overlay = document.getElementById('modalOverlay');

  if (openBtn && modal && closeBtn && overlay) {
    openBtn.addEventListener('click', () => {
      modal.style.display = 'block';
    });

    // Add handler for mobile register button
    if (openBtnMobile) {
      openBtnMobile.addEventListener('click', () => {
        modal.style.display = 'block';
        // Reset mobile menu state
        mobileOverlay.classList.add('hidden');
        mobileMenu.classList.add('hidden');
        closebtn.classList.add('hidden');
        document.body.style.overflow = 'auto';
        hamburger.textContent = '☰';
      });
    }

    closeBtn.addEventListener('click', () => {
      modal.style.display = 'none';
    });

    overlay.addEventListener('click', () => {
      modal.style.display = 'none';
    });
  }
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


// Handle nav item activation for both desktop and mobile separately
document.querySelectorAll('.nav-links .nav-item').forEach(item => {
  item.addEventListener('click', () => {
    document.querySelectorAll('.nav-links .nav-item').forEach(i => i.classList.remove('active'));
    item.classList.add('active');
  });
});

document.addEventListener('DOMContentLoaded', function () {
  const allLinks = document.querySelectorAll('.dropdown-content a, #mobileMenu a');
  const homePageLink = document.querySelector('a[href="index.html"]');

  // Function to clear all active states
  function clearActiveStates() {
    allLinks.forEach(item => {
      item.classList.remove('active');
      item.closest('.dropdown')?.classList.remove('active');
    });
  }

  // Function to set active state
  function setActiveState(link) {
    link.classList.add('active');
    link.closest('.dropdown')?.classList.add('active');
    sessionStorage.setItem('activeDropdownLink', link.getAttribute('href'));
    clearActiveStates();
  }

  // Function to activate based on stored path (used for sub-pages like explore now)
  function restoreActiveStateFromSession() {
    const storedPath = sessionStorage.getItem('activeDropdownLink');
    if (storedPath) {
      const matchedLinks = document.querySelectorAll(`a[href="${storedPath}"]`);
      matchedLinks.forEach(link => {
        link.classList.add('active');
        link.closest('.dropdown')?.classList.add('active');
      });
    }
  }

  function checkPageState() {
    const currentURL = window.location.href;
    const fileName = window.location.pathname.split('/').pop();

    if (fileName === '' || fileName === 'index.html') {
      clearActiveStates();
      sessionStorage.removeItem('activeDropdownLink');
      return;
    }

    // Match exact page first
    let matchedLinks = Array.from(allLinks).filter(link => {
      const linkFile = new URL(link.href).pathname.split('/').pop();
      return linkFile === fileName;
    });

    // If no exact match found, try to match parent (e.g., coma.html for coma-explore.html)
    if (matchedLinks.length === 0 && fileName.includes('-')) {
      const baseFileName = fileName.split('-')[0] + '.html'; // coma-explore.html → coma.html
      matchedLinks = Array.from(allLinks).filter(link => {
        const linkFile = new URL(link.href).pathname.split('/').pop();
        return linkFile === baseFileName;
      });
    }
    if (matchedLinks.length > 0) {
      matchedLinks.forEach(link => {
        link.classList.add('active');
        link.closest('.dropdown')?.classList.add('active');
      });
      sessionStorage.setItem('activeDropdownLink', matchedLinks[0].getAttribute('href'));
    } else {
      const storedPath = sessionStorage.getItem('activeDropdownLink');
      if (storedPath) {
        const matchingStoredLinks = document.querySelectorAll(`a[href="${storedPath}"]`);
        matchingStoredLinks.forEach(link => {
          link.classList.add('active');
          link.closest('.dropdown')?.classList.add('active');
        });
      }
    }
  }

  // Set up click handlers
  allLinks.forEach(link => {
    link.addEventListener('click', function (e) {
      clearActiveStates();
      setActiveState(this);
    });
  });

  // Home page link handler
  if (homePageLink) {
    homePageLink.addEventListener('click', function () {
      sessionStorage.removeItem('activeDropdownLink');
    });
  }

  checkPageState();
});


// Toggle contact dropdown
function toggleContact() {
  const container = document.querySelector('.contact-container');
  container.classList.toggle('active');
}

function copyToClipboard(text, buttonElement) {
  navigator.clipboard.writeText(text)
    .then(() => {
      const icon = buttonElement.querySelector('i');
      const originalColor = icon.style.color;
      
      icon.style.color = 'blue'; // Change icon color to blue

      setTimeout(() => {
        icon.style.color = originalColor; // Revert after 3 seconds
      }, 3000);
    })
    .catch(err => {
      console.error('Failed to copy: ', err);
    });
}

// // Close dropdown when clicking outside
// document.addEventListener('click', function(event) {
//   const contactContainer = document.querySelector('.contact-container');
//   if (!contactContainer.contains(event.target)) {
//     contactContainer.classList.remove('active');
//   }
// });


  // document.querySelectorAll('.toggle-btn').forEach(btn => {
  //   btn.addEventListener('click', () => {
  //     const targetId = btn.dataset.target;
  //     const submenu = document.getElementById(targetId);
  //     submenu.classList.toggle('hidden');
  //   });
  // });