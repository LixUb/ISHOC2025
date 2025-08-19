// Smooth scrolling function
function scrollToSection(sectionId) {
    document.getElementById(sectionId).scrollIntoView({
        behavior: 'smooth'
    });
}

// Scroll to top function
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Countdown Timer
function updateCountdown() {
    // Target date for the countdown (September 14, 2025, 00:00:00 GMT+0700)
    const targetDate = new Date('September 19, 2025 00:00:00 GMT+0700').getTime();
    const now = new Date().getTime();
    const distance = targetDate - now;

    const countdownElement = document.getElementById('countdown');

    if (distance < 0) {
        if (countdownElement) {
            countdownElement.innerHTML =
                '<div class="glass-morphism rounded-2xl p-6 sm:p-8 text-center col-span-full"><h3 class="text-xl sm:text-2xl font-bold text-gold-500">Pendaftaran Telah Ditutup!</h3></div>';
        }
        return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Update text content only if elements exist
    if (document.getElementById('days')) {
        document.getElementById('days').textContent = days.toString().padStart(2, '0');
        document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
        document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
        document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
    }
}

// Mobile menu toggle function
function toggleMobileMenu() {
    const mobileMenu = document.getElementById('mobile-menu');
    if (mobileMenu) {
        mobileMenu.classList.toggle('hidden');
    }
}

// Event Listeners for DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Update countdown every second
    updateCountdown();
    setInterval(updateCountdown, 1000);

    // Mobile menu button event listener
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    if (mobileMenuButton) {
        mobileMenuButton.addEventListener('click', toggleMobileMenu);
    }

    // Add intersection observer for animations
    const observerOptions = {
        threshold: 0.1, // Trigger when 10% of the element is visible
        rootMargin: '0px 0px -50px 0px' // Adjust trigger point slightly
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                // Stop observing once animated to prevent re-triggering
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all sections for scroll animations
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.style.opacity = '0'; // Initial state for animation
        section.style.transform = 'translateY(30px)'; // Initial state for animation
        section.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out'; // Animation properties
        observer.observe(section);
    });

    // Make hero section immediately visible (override observer for hero)
    const heroSection = document.getElementById('hero');
    if (heroSection) {
        heroSection.style.opacity = '1';
        heroSection.style.transform = 'translateY(0)';
    }

    // Add hover effects for cards (optional, mostly for desktop)
    const cards = document.querySelectorAll('.glass-morphism');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            // Only apply if not on a touch device (simple check)
            if (!('ontouchstart' in window || navigator.maxTouchPoints)) {
                this.style.transform += ' translateZ(10px)';
            }
        });
        card.addEventListener('mouseleave', function() {
            if (!('ontouchstart' in window || navigator.maxTouchPoints)) {
                this.style.transform = this.style.transform.replace(' translateZ(10px)', '');
            }
        });
    });
});

// Parallax effect for hero section (optional, can be heavy on mobile)
// window.addEventListener('scroll', function() {
//     const scrolled = window.pageYOffset;
//     const parallax = document.querySelector('#hero');
//     const speed = scrolled * 0.5; // Adjust speed as needed

//     if (parallax) {
//         parallax.style.transform = `translateY(${speed}px)`;
//     }
// });
