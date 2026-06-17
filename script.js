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

// Form Submission Alert (Dummy)
// document.getElementById('enquiryForm').addEventListener('submit', function(e) {
//     e.preventDefault();
//     alert('Thank you for your enquiry! Our team will contact you shortly.');
//     this.reset(); // Form clear karne ke liye
// });

// Google Sheet Web App URL yahan paste karein
const scriptURL = 'https://script.google.com/macros/s/AKfycbxuqWkvfS9T37IxI5FQ5G14eEEwxybVo5VaEKZGDxFZXdytugp_NNNNVpHS7N9lrjSElw/exec'
const form = document.getElementById('enquiryForm')

form.addEventListener('submit', e => {
  e.preventDefault()
  
  // Submit button ko disable karna taaki user baar-baar click na kare
  const submitBtn = form.querySelector('.submit-btn')
  submitBtn.disabled = true
  submitBtn.innerText = 'Submitting...'

  fetch(scriptURL, { method: 'POST', body: new FormData(form)})
    .then(response => {
        alert('Thank you for your enquiry! Our team will contact you shortly.')
        submitBtn.disabled = false
        submitBtn.innerText = 'Submit Details'
        form.reset() // Form clear karne ke liye
    })
    .catch(error => {
        console.error('Error!', error.message)
        alert('Something went wrong. Please try again.')
        submitBtn.disabled = false
        submitBtn.innerText = 'Submit Details'
    })
})



let currentIndex = 0;

function moveSlide(direction) {
  const track = document.getElementById('track');
  const totalImages = track.querySelectorAll('img').length;

  currentIndex = currentIndex + direction;

  if (currentIndex >= totalImages) {
    currentIndex = 0;
  }
  
  if (currentIndex < 0) {
    currentIndex = totalImages - 1;
  }

  // Slide karne ka logic
  track.style.transform = `translateX(-${currentIndex * 100}%)`;
}