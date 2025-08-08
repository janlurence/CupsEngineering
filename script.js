// Helper: on DOM ready
function ready(fn){ if(document.readyState !== 'loading'){ fn(); } else { document.addEventListener('DOMContentLoaded', fn); } }

ready(() => {
  // Background slideshow for hero section
  const backgroundImages = ['1.png','2.png','3.png','4.png','5.png'];
  let currentImageIndex = 0;
  const heroSection = document.querySelector('.hero-gradient');
  function changeBackgroundImage(){ if(!heroSection) return; heroSection.style.backgroundImage = `url('${backgroundImages[currentImageIndex]}')`; currentImageIndex = (currentImageIndex + 1) % backgroundImages.length; }
  changeBackgroundImage();
  setInterval(changeBackgroundImage, 4000);

  // Scroll animations
  function animateOnScroll(){
    document.querySelectorAll('.section-animate').forEach(section => {
      const rect = section.getBoundingClientRect();
      if(rect.top < window.innerHeight - 150) section.classList.add('visible');
    });
  }
  window.addEventListener('load', animateOnScroll);
  window.addEventListener('scroll', animateOnScroll);

  // Navbar shadow on scroll
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if(!navbar) return;
    if(window.scrollY > 100) navbar.classList.add('shadow-lg'); else navbar.classList.remove('shadow-lg');
  });

  // Mobile nav toggle
  const navToggle = document.getElementById('navToggle');
  const mobileNav = document.getElementById('mobile-nav');
  if(navToggle && mobileNav){
    navToggle.addEventListener('click', () => {
      const expanded = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', String(!expanded));
      mobileNav.classList.toggle('hidden');
    });
    // Close on link click
    mobileNav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
      navToggle.setAttribute('aria-expanded', 'false');
      mobileNav.classList.add('hidden');
    }));
  }

  // Service card click -> details modal
  document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('click', () => {
      const overlay = document.createElement('div');
      overlay.className = 'fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4';
      overlay.innerHTML = `
        <div class="bg-white p-6 rounded-xl max-w-md w-full shadow-2xl">
          <h3 class="text-2xl font-bold mb-2 text-gray-800">Service Details</h3>
          <p class="text-gray-600 mb-6">Get more information about this service and schedule an appointment with our certified technicians.</p>
          <div class="flex gap-3 justify-end">
            <a href="tel:555-2665-247" class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">Call Now</a>
            <button class="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded close-modal">Close</button>
          </div>
        </div>`;
      document.body.appendChild(overlay);
      overlay.addEventListener('click', (e) => { if(e.target === overlay || e.target.classList.contains('close-modal')) overlay.remove(); });
    });
  });

  // Quote modal
  function openQuoteModal(){
    const overlay = document.createElement('div');
    overlay.className = 'fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto';
    overlay.innerHTML = `
      <div class="bg-white p-6 sm:p-8 rounded-xl max-w-lg w-full mx-4 shadow-2xl my-8 max-h-screen overflow-y-auto">
        <div class="flex justify-between items-center mb-6 sticky top-0 bg-white pb-4 border-b border-gray-200">
          <h3 class="text-xl sm:text-2xl font-bold text-gray-800">Get Your Free Quote</h3>
          <button class="text-gray-400 hover:text-gray-600 text-2xl close-modal" aria-label="Close">&times;</button>
        </div>
        <form class="space-y-4" id="quoteForm">
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input type="text" name="firstName" placeholder="First Name" required class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent text-sm">
            <input type="text" name="lastName" placeholder="Last Name" required class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent text-sm">
          </div>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input type="email" name="email" placeholder="Email Address" required class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent text-sm">
            <input type="tel" name="phone" placeholder="Phone Number" required class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent text-sm">
          </div>
          <input type="text" name="address" placeholder="Service Address" required class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent text-sm">
          <select name="serviceType" required class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent text-sm">
            <option value="">Select Service Needed</option>
            <option value="ac-repair">AC Repair</option>
            <option value="new-installation">New Installation</option>
            <option value="maintenance">Maintenance</option>
            <option value="emergency">Emergency Service</option>
            <option value="duct-cleaning">Duct Cleaning</option>
            <option value="thermostat">Smart Thermostat Installation</option>
          </select>
          <select name="urgency" required class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent text-sm">
            <option value="">How urgent is this service?</option>
            <option value="emergency">Emergency (Within 24 hours)</option>
            <option value="asap">ASAP (Within 2-3 days)</option>
            <option value="week">Within a week</option>
            <option value="flexible">Flexible timing</option>
          </select>
          <textarea name="description" placeholder="Describe your AC issue or requirements in detail..." rows="4" class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent resize-none text-sm"></textarea>
          <div class="flex flex-col sm:flex-row gap-3 pt-4 sticky bottom-0 bg-white border-t border-gray-200 pt-6 mt-6">
            <button type="submit" class="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-lg font-semibold transition-colors flex items-center justify-center text-sm">
              <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/></svg>
              Submit Quote Request
            </button>
            <button type="button" class="bg-gray-500 hover:bg-gray-600 text-white px-4 py-3 rounded-lg font-semibold transition-colors close-modal text-sm">Cancel</button>
          </div>
        </form>
      </div>`;
    document.body.appendChild(overlay);

    const form = overlay.querySelector('#quoteForm');
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      overlay.innerHTML = `
        <div class="bg-white p-8 rounded-xl max-w-md mx-4 shadow-2xl text-center">
          <div class="mb-6">
            <div class="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <svg class="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
            </div>
            <h3 class="text-2xl font-bold text-gray-800 mb-2">Quote Request Submitted!</h3>
            <p class="text-gray-600">Thank you for your request. Our team will contact you within 2 hours during business hours.</p>
          </div>
          <div class="bg-blue-50 p-4 rounded-lg mb-6">
            <p class="text-blue-700 font-semibold text-sm">Need immediate assistance?</p>
            <p class="text-blue-600 text-sm">Call us now: (555) COOL-AIR</p>
          </div>
          <button class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors w-full close-modal">Close</button>
        </div>`;
      setTimeout(() => { if (overlay.parentNode) overlay.remove(); }, 5000);
    });
    overlay.addEventListener('click', (e) => { if(e.target === overlay || e.target.classList.contains('close-modal')) overlay.remove(); });
  }

  // Data-action bindings
  document.querySelectorAll('[data-action="quote"]').forEach(el => el.addEventListener('click', openQuoteModal));
  document.querySelectorAll('[data-action="emergency"]').forEach(el => el.addEventListener('click', () => {
    alert('Emergency Service: Call (555) COOL-AIR now for immediate assistance! Our technicians are standing by 24/7.');
  }));
  document.querySelectorAll('[data-action="estimate"]').forEach(el => el.addEventListener('click', () => {
    alert("Free Estimate: We'll send a certified technician to assess your needs and provide a detailed quote at no cost!");
  }));

  // Phone links (keep default behavior on mobile/desktop)
  document.querySelectorAll('a[href^="tel:"]').forEach(link => {
    link.addEventListener('click', () => {
      // Let the OS handle the call; optionally track analytics here.
    });
  });
});
