/* 
================================================================
PORTFOLIO JAVASCRIPT
- Time display in navigation
- Smooth scroll navigation
- Active link highlighting
- Scroll animations
- Interactive effects
================================================================
*/

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    
    /* ============================================================
       TIME DISPLAY
       - Shows current time in navigation bar (IST timezone)
       - Updates every second
       ============================================================ */
    function updateTime() {
        const now = new Date();
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const timeString = `${hours}:${minutes} IST`;
        
        const timeElement = document.getElementById('current-time');
        if (timeElement) {
            timeElement.textContent = timeString;
        }
    }
    
    // Update time immediately on load
    updateTime();
    // Update time every second
    setInterval(updateTime, 1000);

    /* ============================================================
       SMOOTH SCROLL NAVIGATION
       - Handles clicks on anchor links
       - Smoothly scrolls to target section
       - Accounts for fixed navigation height
       ============================================================ */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            
            if (target) {
                const navHeight = document.querySelector('.nav').offsetHeight;
                const targetPosition = target.offsetTop - navHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    /* ============================================================
       ACTIVE NAVIGATION LINK
       - Highlights current section in navigation
       - Updates based on scroll position
       ============================================================ */
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    function updateActiveNavLink() {
        const scrollY = window.pageYOffset;
        
        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');
            
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    // Update active link on scroll
    window.addEventListener('scroll', updateActiveNavLink);

    /* ============================================================
       PARALLAX EFFECT
       - Subtle parallax effect on hero section
       - Creates depth on scroll
       ============================================================ */
    const hero = document.querySelector('.hero');
    if (hero) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const parallaxSpeed = 0.5;
            hero.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
        });
    }

    /* ============================================================
       SCROLL REVEAL ANIMATION
       - Reveals elements as they come into view
       - Uses Intersection Observer API
       ============================================================ */
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Element is visible, reveal it
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Apply reveal animation to these elements
    const elementsToAnimate = document.querySelectorAll('.project-card, .event, .role, .photo-item');
    elementsToAnimate.forEach(el => {
        // Set initial state
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        // Observe for intersection
        observer.observe(el);
    });

    /* ============================================================
       PROJECT CARD 3D TILT EFFECT
       - Creates subtle 3D tilt on mouse movement
       - Adds interactive depth to project cards
       ============================================================ */
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        // Track mouse movement over card
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            // Calculate rotation based on mouse position
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            // Apply 3D transform
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
        });
        
        // Reset transform when mouse leaves
        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });

    /* ============================================================
       PHOTO GALLERY INTERACTION
       - Simple click interaction for photos
       - Could be extended to full lightbox
       ============================================================ */
    const photoItems = document.querySelectorAll('.photo-item');
    photoItems.forEach(photo => {
        photo.addEventListener('click', () => {
            // Simple zoom toggle - can be expanded
            photo.style.transition = 'all 0.3s ease';
            if (photo.classList.contains('zoomed')) {
                photo.classList.remove('zoomed');
            } else {
                photo.classList.add('zoomed');
            }
        });
    });

    /* ============================================================
       CONSOLE EASTER EGG
       - Fun message for curious developers
       - Shows technical personality
       ============================================================ */
    console.log('%c👋 Hey there, fellow developer!', 
        'color: #ff3333; font-size: 16px; font-weight: bold; text-shadow: 2px 2px 0px rgba(0,0,0,0.5);');
    console.log('%c\nLooks like you\'re curious about how this portfolio is built.', 
        'color: #b4b4b4; font-size: 12px;');
    console.log('%c\nStack: Vanilla HTML, CSS, and JavaScript', 
        'color: #6b6b6b; font-size: 11px;');
    console.log('%cFont: Monospace throughout for technical aesthetic', 
        'color: #6b6b6b; font-size: 11px;');
    console.log('%c\nWant to chat about tech, infrastructure, or grab coffee? Reach out!', 
        'color: #ff3333; font-size: 11px;');
    console.log('%c\npiyush@example.com', 
        'color: #b4b4b4; font-size: 11px; font-family: monospace;');

    /* ============================================================
       TYPING EFFECT
       - Animated typing effect for hero identity text
       - Creates engaging first impression
       ============================================================ */
    const identityElement = document.querySelector('.hero .identity');
    if (identityElement) {
        const originalText = identityElement.textContent;
        identityElement.textContent = '';
        let charIndex = 0;
        
        function typeWriter() {
            if (charIndex < originalText.length) {
                identityElement.textContent += originalText.charAt(charIndex);
                charIndex++;
                setTimeout(typeWriter, 30);
            }
        }
        
        // Start typing effect after short delay
        setTimeout(typeWriter, 500);
    }

    /* ============================================================
       LAZY LOAD IMAGES
       - Improves page load performance
       - Loads images as they come into view
       ============================================================ */
    const images = document.querySelectorAll('img[src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                
                // Fade in image when loaded
                img.style.opacity = '0';
                img.style.transition = 'opacity 0.5s ease';
                
                img.onload = () => {
                    img.style.opacity = '1';
                };
                
                // Stop observing this image
                observer.unobserve(img);
            }
        });
    });

    // Start observing all images
    //images.forEach(img => imageObserver.observe(img)); //hides img on active

    /* ============================================================
       EVENT CARD BACKGROUND FIX
       - Ensures event card backgrounds load properly
       - Maintains overlay visibility
       ============================================================ */
    const eventCards = document.querySelectorAll('.event');
    eventCards.forEach(card => {
        // Ensure background image is loaded
        const bgImage = card.style.backgroundImage;
        if (bgImage) {
            const img = new Image();
            img.src = bgImage.slice(5, -2); // Extract URL from 'url("...")'
            img.onload = () => {
                card.style.backgroundSize = 'cover';
                card.style.backgroundPosition = 'center';
            };
        }
    });

    /* ============================================================
       TECH PILL INTERACTION
       - Subtle interaction feedback
       - Could add sound effects or haptics
       ============================================================ */
    const techPills = document.querySelectorAll('.tech-pill');
    techPills.forEach(pill => {
        pill.addEventListener('mouseenter', () => {
            // Hover effect handled by CSS
            // Additional interactions could be added here
        });
    });

    /* ============================================================
       NAVIGATION BACKGROUND BLUR
       - Adds blur effect to nav on scroll
       - Improves readability over content
       ============================================================ */
    const nav = document.querySelector('.nav');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.style.background = 'rgba(0, 0, 0, 0.98)';
        } else {
            nav.style.background = 'rgba(0, 0, 0, 0.95)';
        }
    });

    /* ============================================================
       LOG INITIALIZATION
       - Confirms all JavaScript is loaded
       ============================================================ */
    console.log('%c✓ Portfolio initialized successfully', 
        'color: #00ff00; font-size: 12px; font-weight: bold;');
});

/* ============================================================
   CUSTOM CURSOR EFFECT (OPTIONAL)
   - Uncomment to enable custom cursor trail
   - Creates particle effect following cursor
   ============================================================ */
/*
document.addEventListener('mousemove', (e) => {
    const cursor = document.createElement('div');
    cursor.style.position = 'fixed';
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
    cursor.style.width = '5px';
    cursor.style.height = '5px';
    cursor.style.background = 'var(--accent)';
    cursor.style.borderRadius = '50%';
    cursor.style.pointerEvents = 'none';
    cursor.style.opacity = '0.5';
    cursor.style.transition = 'opacity 0.5s ease';
    
    document.body.appendChild(cursor);
    
    setTimeout(() => {
        cursor.style.opacity = '0';
        setTimeout(() => cursor.remove(), 500);
    }, 100);
});
*/
