// Mobile Menu Toggle
const menuBtn = document.getElementById('menuBtn');
const mobileMenu = document.getElementById('mobileMenu');

menuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
});

// Close mobile menu when a link is clicked
document.querySelectorAll('.mobile-menu a').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
    });
});

// Smooth Scroll for "Enquire Now" Button
function scrollToContact() {
    document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
}

// Google Sheet Web App Integration
const scriptURL = 'https://script.google.com/macros/s/AKfycbxuqWkvfS9T37IxI5FQ5G14eEEwxybVo5VaEKZGDxFZXdytugp_NNNNVpHS7N9lrjSElw/exec'
const form = document.getElementById('enquiryForm')

form.addEventListener('submit', e => {
  e.preventDefault()
  
  const submitBtn = form.querySelector('.submit-btn')
  submitBtn.disabled = true
  submitBtn.innerText = 'Submitting...'

  fetch(scriptURL, { method: 'POST', body: new FormData(form)})
    .then(response => {
        alert('Thank you for your enquiry! Our team will contact you shortly.')
        submitBtn.disabled = false
        submitBtn.innerText = 'Submit Details'
        form.reset() 
    })
    .catch(error => {
        console.error('Error!', error.message)
        alert('Something went wrong. Please try again.')
        submitBtn.disabled = false
        submitBtn.innerText = 'Submit Details'
    })
})

// ==========================================
// UPGRADED INFINITE LOOP SLIDER LOGIC
// ==========================================
let currentIndex = 0;
let isMoving = false; // Isse fast click karne par slider glitch nahi karega

function moveSlide(direction) {
  if (isMoving) return; 
  
  const track = document.getElementById('track');
  const images = track.querySelectorAll('img');
  const totalImages = images.length;

  isMoving = true;
  currentIndex = currentIndex + direction;

  // Track ko smooth aage badhayein
  track.style.transition = "transform 0.5s ease-in-out";
  track.style.transform = `translateX(-${currentIndex * 100}%)`;

  // Animation khatam hone ka wait karein, fir loop handle karein
  track.addEventListener('transitionend', function handler() {
    track.removeEventListener('transitionend', handler); 
    
    // 1. Next dabate huye agar aakhiri image ke paar chale gaye
    if (currentIndex >= totalImages) {
      track.style.transition = "none"; // Animation ko ek pal ke liye band kiya
      currentIndex = 0;                // Index wapas 0 kiya
      track.style.transform = `translateX(0%)`; // Bina piche laute chupke se pehli photo par set kiya
    }
    
    // 2. Prev dabate huye agar 0 ke piche chale gaye
    if (currentIndex < 0) {
      track.style.transition = "none"; 
      currentIndex = totalImages - 1;  
      track.style.transform = `translateX(-${currentIndex * 100}%)`;
    }

    isMoving = false; // Slider ko agle click ke liye taiyar kiya
  });
}

// Variable check karne ke liye ki images unlocked hain ya nahi
let isUnlocked = false;

function openUnlockForm() {
    // Agar pehle se unlocked hai, toh dobara form nahi khulega
    if (isUnlocked) return; 
    
    document.getElementById('formModal').style.display = 'flex';
}

function closeUnlockForm() {
    document.getElementById('formModal').style.display = 'none';
}

function handleFormSubmit(event) {
    event.preventDefault(); // Page refresh hone se rokne ke liye
    
    // Yahan aap apna Google Sheets api push wala code sync kar sakti hain
    
    isUnlocked = true;
    closeUnlockForm();
    
    // Sabhi image cards se 'locked' class hatayein aur overlays remove karein
    const cards = document.querySelectorAll('.exclusive-card');
    cards.forEach(card => {
        card.classList.remove('locked');
        
        // Remove click actions and overlays
        card.removeAttribute('onclick');
        const overlay = card.querySelector('.lock-overlay');
        if (overlay) overlay.remove();
    });
}