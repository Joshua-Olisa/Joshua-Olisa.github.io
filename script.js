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
const indicators = document.querySelectorAll('.indicator');
const totalSlides = slides.length;

function showSlide(index) {
    const wrapper = document.querySelector('.carousel-wrapper');
    const isMobile = window.innerWidth <= 968;
    
    // Calculate slide width based on viewport
    const slideWidth = isMobile ? 100 : 53; // 50% for desktop (2 items), 100% for mobile
    
    wrapper.style.transform = `translateX(-${index * slideWidth}%)`;
    
    // Update indicators
    indicators.forEach((indicator, i) => {
        indicator.classList.toggle('active', i === index);
    });
}

function nextSlide() {
    const maxSlides = totalSlides - (window.innerWidth <= 968 ? 1 : 2);
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
    currentSlide = index;
    showSlide(currentSlide);
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
    
    // Set up indicator click events
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => goToSlide(index));
    });

    // Handle window resize for responsive carousel
    window.addEventListener('resize', function() {
        showSlide(currentSlide);
    });

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
});