const menu = document.querySelector("#menu");
const nav = document.querySelector('.links');

menu.onclick = () => {
    menu.classList.toggle('bx-x');
    nav.classList.toggle('active');
}

// Typewriter animation
const typewriter = document.getElementById('typewriter');
const roles = ['Electrical Engineer', 'Data Scientist', 'Data Analyst', 'Freelancer'];
let currentRoleIndex = 0;
let currentCharIndex = 0;
let isDeleting = false;
let typingSpeed = 100;
let deletingSpeed = 50;
let pauseTime = 2000;

function typeRole() {
    const currentRole = roles[currentRoleIndex];
    
    if (isDeleting) {
        // Deleting characters
        typewriter.textContent = currentRole.substring(0, currentCharIndex - 1);
        currentCharIndex--;
        
        if (currentCharIndex === 0) {
            isDeleting = false;
            currentRoleIndex = (currentRoleIndex + 1) % roles.length;
            setTimeout(typeRole, 200);
        } else {
            setTimeout(typeRole, deletingSpeed);
        }
    } else {
        // Typing characters
        typewriter.textContent = currentRole.substring(0, currentCharIndex + 1);
        currentCharIndex++;
        
        if (currentCharIndex === currentRole.length) {
            isDeleting = true;
            setTimeout(typeRole, pauseTime);
        } else {
            setTimeout(typeRole, typingSpeed);
        }
    }
}

// Carousel functionality
let currentSlide = 0;
const slides = document.querySelectorAll('.carousel-item');
const totalSlides = slides.length;

// Function to create indicators based on screen size
function createIndicators() {
    const indicatorContainer = document.querySelector('.carousel-indicators');
    const isMobile = window.innerWidth <= 968;
    
    // Calculate number of indicators needed
    const indicatorCount = isMobile ? totalSlides : totalSlides - 1; // 6 for mobile, 5 for desktop
    
    // Clear existing indicators
    indicatorContainer.innerHTML = '';
    
    // Create new indicators
    for (let i = 0; i < indicatorCount; i++) {
        const indicator = document.createElement('div');
        indicator.className = 'indicator';
        if (i === 0) indicator.classList.add('active'); // First indicator active by default
        
        // Add click event
        indicator.addEventListener('click', () => goToSlide(i));
        
        indicatorContainer.appendChild(indicator);
    }
}

function showSlide(index) {
    const wrapper = document.querySelector('.carousel-wrapper');
    const indicators = document.querySelectorAll('.indicator');
    const isMobile = window.innerWidth <= 968;
    
    // Calculate slide width based on viewport
    const slideWidth = isMobile ? 100 : 53; // 100% for mobile (1 item), 53% for desktop (2 items)
    
    wrapper.style.transform = `translateX(-${index * slideWidth}%)`;
    
    // Update indicators - ensure we don't exceed available indicators
    indicators.forEach((indicator, i) => {
        indicator.classList.toggle('active', i === index);
    });
}

function nextSlide() {
    const isMobile = window.innerWidth <= 968;
    const maxSlides = isMobile ? totalSlides - 1 : totalSlides - 2; // Mobile: 0-5, Desktop: 0-4
    
    if (currentSlide < maxSlides) {
        currentSlide++;
        showSlide(currentSlide);
    }
}

function prevSlide() {
    if (currentSlide > 0) {
        currentSlide--;
        showSlide(currentSlide);
    }
}

function goToSlide(index) {
    const isMobile = window.innerWidth <= 968;
    const maxSlides = isMobile ? totalSlides - 1 : totalSlides - 2;
    
    // Ensure index is within valid range
    if (index >= 0 && index <= maxSlides) {
        currentSlide = index;
        showSlide(currentSlide);
    }
}

// Function to handle responsive changes
function handleResize() {
    const isMobile = window.innerWidth <= 968;
    const maxSlides = isMobile ? totalSlides - 1 : totalSlides - 2;
    
    // Reset current slide if it's beyond the new max
    if (currentSlide > maxSlides) {
        currentSlide = maxSlides;
    }
    
    // Recreate indicators for new screen size
    createIndicators();
    
    // Update display
    showSlide(currentSlide);
}

// Contact Form Modal Functions
function openContactModal() {
    const modal = document.getElementById('contactModal');
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden'; // Prevent scrolling
}

function closeContactModal() {
    const modal = document.getElementById('contactModal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto'; // Re-enable scrolling
}

// Close modal when clicking outside of it
function handleModalClick(event) {
    const modal = document.getElementById('contactModal');
    if (event.target === modal) {
        closeContactModal();
    }
}

// Handle form submission
function handleContactFormSubmit(event) {
    event.preventDefault();
    
    const name = document.getElementById('contact-name').value;
    const email = document.getElementById('contact-email').value;
    const message = document.getElementById('contact-message').value;
    
    // Basic validation
    if (!name || !email || !message) {
        alert('Please fill in all fields.');
        return;
    }
    
    // Create mailto link with form data
    const subject = encodeURIComponent(`Contact from ${name}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);
    const mailtoLink = `mailto:joshua.olisaemodoh@gmail.com?subject=${subject}&body=${body}`;
    
    // Open email client
    window.location.href = mailtoLink;
    
    // Close modal and reset form
    closeContactModal();
    event.target.reset();
}

// Start the typewriter animation when the page loads
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(typeRole, 1000); // Start after 1 second delay
    
    // Set up carousel event listeners
    const nextBtn = document.querySelector('.carousel-next');
    const prevBtn = document.querySelector('.carousel-prev');
    
    if (nextBtn && prevBtn) {
        nextBtn.addEventListener('click', nextSlide);
        prevBtn.addEventListener('click', prevSlide);
    }
    
    // Initialize indicators
    createIndicators();

    // Handle window resize for responsive carousel
    window.addEventListener('resize', handleResize);

    // Scroll animation for about section image
    const aboutImage = document.querySelector('#about img');
    
    function checkScroll() {
        const aboutSection = document.querySelector('#about');
        const sectionTop = aboutSection.offsetTop;
        const sectionHeight = aboutSection.offsetHeight;
        const scrollPosition = window.pageYOffset + window.innerHeight;
        
        if (scrollPosition > sectionTop + sectionHeight * 0.3) {
            aboutImage.classList.add('animate');
        }
    }
    
    window.addEventListener('scroll', checkScroll);
    checkScroll(); // Check on load in case already scrolled
    
    // Set up contact form event listeners
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactFormSubmit);
    }
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            closeContactModal();
        }
    });
});