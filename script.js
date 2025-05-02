// Mobile menu toggle
const mobileMenuButton = document.getElementById('mobile-menu-button');
const mobileMenu = document.getElementById('mobile-menu');

mobileMenuButton.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
            
            // Close mobile menu if open
            if (!mobileMenu.classList.contains('hidden')) {
                mobileMenu.classList.add('hidden');
            }
        }
    });
});

// Scroll animations
function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.85 &&
        rect.bottom >= 0
    );
}

function handleScrollAnimations() {
    // Slide-in animations
    const animatedElements = document.querySelectorAll('.slide-in-left, .slide-in-right, .slide-up');
    
    animatedElements.forEach(element => {
        if (isElementInViewport(element)) {
            // Add delay if specified
            const delay = element.getAttribute('data-delay');
            if (delay) {
                setTimeout(() => {
                    element.classList.add('animated');
                }, parseInt(delay));
            } else {
                element.classList.add('animated');
            }
        }
    });
}

// Run on load
document.addEventListener('DOMContentLoaded', () => {
    handleScrollAnimations();
    
    // Create random floating elements
    createRandomFloatingElements();
});

// Run on scroll
window.addEventListener('scroll', () => {
    handleScrollAnimations();
});

// Create random floating elements in the background
function createRandomFloatingElements() {
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        // Add 3-5 random floating elements to each section
        const numElements = Math.floor(Math.random() * 3) + 3;
        
        for (let i = 0; i < numElements; i++) {
            const element = document.createElement('div');
            element.classList.add('random-float');
            
            // Random size
            const size = Math.floor(Math.random() * 30) + 10;
            element.style.width = `${size}px`;
            element.style.height = `${size}px`;
            
            // Random position
            const posX = Math.floor(Math.random() * 100);
            const posY = Math.floor(Math.random() * 100);
            element.style.left = `${posX}%`;
            element.style.top = `${posY}%`;
            
            // Random color
            const colors = ['#4CAF50', '#2196F3', '#FF5722', '#9C27B0', '#FFEB3B', '#00BCD4'];
            const colorIndex = Math.floor(Math.random() * colors.length);
            element.style.backgroundColor = colors[colorIndex];
            
            // Random shape
            const shapes = ['circle', 'square', 'triangle'];
            const shapeIndex = Math.floor(Math.random() * shapes.length);
            if (shapes[shapeIndex] === 'circle') {
                element.style.borderRadius = '50%';
            } else if (shapes[shapeIndex] === 'triangle') {
                element.style.width = '0';
                element.style.height = '0';
                element.style.backgroundColor = 'transparent';
                element.style.borderLeft = `${size/2}px solid transparent`;
                element.style.borderRight = `${size/2}px solid transparent`;
                element.style.borderBottom = `${size}px solid ${colors[colorIndex]}`;
            }
            
            // Random animation duration
            const duration = Math.floor(Math.random() * 10) + 10;
            element.style.animation = `float-random ${duration}s ease-in-out infinite alternate`;
            
            // Random opacity
            element.style.opacity = (Math.random() * 0.07) + 0.03;
            
            // Add to section
            section.appendChild(element);
        }
    });
    
    // Add the animation to the stylesheet
    const styleSheet = document.createElement('style');
    styleSheet.textContent = `
        .random-float {
            position: absolute;
            z-index: 0;
            pointer-events: none;
        }
        
        @keyframes float-random {
            0% {
                transform: translateY(0) translateX(0) rotate(0);
            }
            100% {
                transform: translateY(-50px) translateX(20px) rotate(20deg);
            }
        }
    `;
    document.head.appendChild(styleSheet);
}

// Parallax effect on scroll
window.addEventListener('scroll', () => {
    const scrollPosition = window.pageYOffset;
    
    // Apply parallax to floating shapes
    document.querySelectorAll('.floating-shape').forEach(shape => {
        const speed = 0.05;
        shape.style.transform = `translateY(${scrollPosition * speed}px)`;
    });
});

// Add interactive hover effects to feature cards
document.querySelectorAll('.features-section > div > div').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.querySelector('.icon-bounce').style.animationPlayState = 'running';
    });
    
    card.addEventListener('mouseleave', () => {
        card.querySelector('.icon-bounce').style.animationPlayState = 'paused';
    });
});
