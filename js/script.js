// script.js - Advanced Animations for Portfolio

document.addEventListener('DOMContentLoaded', function() {
    console.log('Loading advanced animations...');

    // GSAP Animation Library (you need to include GSAP in your HTML)
    // If you don't want to use external library, we'll create our own advanced animations
    
    // 1. Parallax Scrolling Effect
    initParallax();
    
    // 2. Particle Background Effect
    initParticles();
    
    // 3. Text Typing Animation
    initTypingAnimation();
    
    // 4. Floating Elements
    initFloatingElements();
    
    // 5. Scroll-triggered Animations
    initScrollAnimations();
    
    // 6. Advanced Hover Effects
    initHoverEffects();
    
    // 7. Page Load Animation
    initPageLoadAnimation();
    
    // 8. Advanced Cursor Effects
    initCursorEffects();
    
    // 9. Morphing Shapes
    initMorphingShapes();
    
    // 10. 3D Transform Effects
    init3DEffects();
    
    // 11. Advanced Form Animations
    initFormAnimations();
    
    // 12. Audio Visualizer (if audio elements exist)
    initAudioVisualizer();
});

// ==============================================
// 1. PARALLAX SCROLLING EFFECT
// ==============================================
function initParallax() {
    const parallaxElements = document.querySelectorAll('[data-parallax]');
    
    if (!parallaxElements.length) return;
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        
        parallaxElements.forEach(element => {
            const speed = element.dataset.parallaxSpeed || 0.5;
            const yPos = -(scrolled * speed);
            element.style.transform = `translate3d(0, ${yPos}px, 0)`;
        });
    });
}

// ==============================================
// 2. PARTICLE BACKGROUND EFFECT
// ==============================================
function initParticles() {
    const canvas = document.createElement('canvas');
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '-1';
    canvas.style.opacity = '0.3';
    document.body.appendChild(canvas);
    
    const ctx = canvas.getContext('2d');
    let particles = [];
    const particleCount = 100;
    
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    
    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2 + 0.5;
            this.speedX = Math.random() * 0.5 - 0.25;
            this.speedY = Math.random() * 0.5 - 0.25;
            this.color = `rgba(${Math.random() * 100 + 155}, ${Math.random() * 100 + 155}, 255, 0.7)`;
        }
        
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            
            if (this.x > canvas.width) this.x = 0;
            if (this.x < 0) this.x = canvas.width;
            if (this.y > canvas.height) this.y = 0;
            if (this.y < 0) this.y = canvas.height;
        }
        
        draw() {
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
            
            // Draw connections between nearby particles
            for (let i = 0; i < particles.length; i++) {
                const dx = this.x - particles[i].x;
                const dy = this.y - particles[i].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 100) {
                    ctx.beginPath();
                    ctx.strokeStyle = `rgba(100, 100, 255, ${0.2 * (1 - distance/100)})`;
                    ctx.lineWidth = 0.5;
                    ctx.moveTo(this.x, this.y);
                    ctx.lineTo(particles[i].x, particles[i].y);
                    ctx.stroke();
                }
            }
        }
    }
    
    function initParticlesArray() {
        particles = [];
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }
    }
    
    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });
        requestAnimationFrame(animateParticles);
    }
    
    resizeCanvas();
    initParticlesArray();
    animateParticles();
    
    window.addEventListener('resize', () => {
        resizeCanvas();
        initParticlesArray();
    });
}

// ==============================================
// 3. TEXT TYPING ANIMATION
// ==============================================
function initTypingAnimation() {
    const typingElements = document.querySelectorAll('[data-typing]');
    
    typingElements.forEach(element => {
        const text = element.textContent;
        element.textContent = '';
        let i = 0;
        
        function typeWriter() {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 50 + Math.random() * 50);
            }
        }
        
        // Start typing when element is in viewport
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    typeWriter();
                    observer.unobserve(entry.target);
                }
            });
        });
        
        observer.observe(element);
    });
}

// ==============================================
// 4. FLOATING ELEMENTS
// ==============================================
function initFloatingElements() {
    const floatElements = document.querySelectorAll('.skill-card, .project-card');
    
    floatElements.forEach(element => {
        element.style.transition = 'transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
        
        // Add subtle floating animation
        element.addEventListener('mouseenter', () => {
            element.style.transform = 'translateY(-20px) scale(1.05) rotateX(5deg) rotateY(5deg)';
        });
        
        element.addEventListener('mouseleave', () => {
            element.style.transform = 'translateY(0) scale(1) rotateX(0) rotateY(0)';
        });
    });
}

// ==============================================
// 5. SCROLL-TRIGGERED ANIMATIONS
// ==============================================
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.skill-card, .project-card, .info-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add staggered animation delay
                const index = Array.from(animatedElements).indexOf(entry.target);
                const delay = index * 100;
                
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, delay);
                
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '50px'
    });
    
    // Set initial state
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(50px)';
        element.style.transition = 'opacity 0.8s ease, transform 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
        observer.observe(element);
    });
}

// ==============================================
// 6. ADVANCED HOVER EFFECTS
// ==============================================
function initHoverEffects() {
    // Advanced button hover effects
    const buttons = document.querySelectorAll('.btn-primary, .btn-secondary, .submit-btn, .project-link');
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', (e) => {
            const rect = button.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            // Create ripple effect
            const ripple = document.createElement('span');
            ripple.style.position = 'absolute';
            ripple.style.borderRadius = '50%';
            ripple.style.backgroundColor = 'rgba(255, 255, 255, 0.3)';
            ripple.style.transform = 'scale(0)';
            ripple.style.animation = 'ripple 0.6s linear';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            
            button.style.position = 'relative';
            button.style.overflow = 'hidden';
            button.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
        
        // Add shine effect
        button.addEventListener('mousemove', (e) => {
            const rect = button.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            button.style.setProperty('--mouse-x', `${x}px`);
            button.style.setProperty('--mouse-y', `${y}px`);
        });
    });
    
    // Add CSS for ripple animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
        
        .btn-primary, .btn-secondary, .submit-btn, .project-link {
            position: relative;
            overflow: hidden;
        }
        
        .btn-primary:hover, .btn-secondary:hover, .submit-btn:hover, .project-link:hover {
            transform: translateY(-3px);
            box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
        }
    `;
    document.head.appendChild(style);
}

// ==============================================
// 7. PAGE LOAD ANIMATION
// ==============================================
function initPageLoadAnimation() {
    // Create loading animation
    const loader = document.createElement('div');
    loader.style.position = 'fixed';
    loader.style.top = '0';
    loader.style.left = '0';
    loader.style.width = '100%';
    loader.style.height = '100%';
    loader.style.backgroundColor = '#1a252f';
    loader.style.display = 'flex';
    loader.style.justifyContent = 'center';
    loader.style.alignItems = 'center';
    loader.style.zIndex = '9999';
    loader.style.transition = 'opacity 0.5s ease';
    
    // Create animated circles
    for (let i = 0; i < 3; i++) {
        const circle = document.createElement('div');
        circle.style.width = '20px';
        circle.style.height = '20px';
        circle.style.borderRadius = '50%';
        circle.style.backgroundColor = '#3498db';
        circle.style.margin = '0 10px';
        circle.style.animation = `bounce 1.4s infinite ${i * 0.2}s`;
        loader.appendChild(circle);
    }
    
    document.body.appendChild(loader);
    
    // Add CSS for bounce animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes bounce {
            0%, 80%, 100% {
                transform: scale(0);
            }
            40% {
                transform: scale(1);
            }
        }
    `;
    document.head.appendChild(style);
    
    // Remove loader after page load
    window.addEventListener('load', () => {
        setTimeout(() => {
            loader.style.opacity = '0';
            setTimeout(() => {
                loader.remove();
            }, 500);
        }, 1000);
    });
}

// ==============================================
// 8. ADVANCED CURSOR EFFECTS
// ==============================================
function initCursorEffects() {
    // Create custom cursor
    const cursor = document.createElement('div');
    cursor.style.position = 'fixed';
    cursor.style.width = '20px';
    cursor.style.height = '20px';
    cursor.style.borderRadius = '50%';
    cursor.style.backgroundColor = 'rgba(52, 152, 219, 0.5)';
    cursor.style.pointerEvents = 'none';
    cursor.style.zIndex = '9999';
    cursor.style.mixBlendMode = 'difference';
    cursor.style.transition = 'transform 0.2s ease, background-color 0.2s ease';
    document.body.appendChild(cursor);
    
    const follower = document.createElement('div');
    follower.style.position = 'fixed';
    follower.style.width = '40px';
    follower.style.height = '40px';
    follower.style.borderRadius = '50%';
    follower.style.border = '2px solid rgba(52, 152, 219, 0.3)';
    follower.style.pointerEvents = 'none';
    follower.style.zIndex = '9998';
    follower.style.transition = 'transform 0.4s ease, width 0.4s ease, height 0.4s ease';
    document.body.appendChild(follower);
    
    let mouseX = 0;
    let mouseY = 0;
    let followerX = 0;
    let followerY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        cursor.style.left = mouseX - 10 + 'px';
        cursor.style.top = mouseY - 10 + 'px';
    });
    
    function animate() {
        followerX += (mouseX - followerX) * 0.1;
        followerY += (mouseY - followerY) * 0.1;
        follower.style.left = followerX - 20 + 'px';
        follower.style.top = followerY - 20 + 'px';
        requestAnimationFrame(animate);
    }
    
    animate();
    
    // Cursor effects on hover
    const hoverElements = document.querySelectorAll('a, button, .skill-card, .project-card');
    
    hoverElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            cursor.style.transform = 'scale(1.5)';
            cursor.style.backgroundColor = 'rgba(231, 76, 60, 0.8)';
            follower.style.width = '60px';
            follower.style.height = '60px';
        });
        
        element.addEventListener('mouseleave', () => {
            cursor.style.transform = 'scale(1)';
            cursor.style.backgroundColor = 'rgba(52, 152, 219, 0.5)';
            follower.style.width = '40px';
            follower.style.height = '40px';
        });
    });
}

// ==============================================
// 9. MORPHING SHAPES
// ==============================================
function initMorphingShapes() {
    const shapesContainer = document.createElement('div');
    shapesContainer.style.position = 'fixed';
    shapesContainer.style.top = '0';
    shapesContainer.style.left = '0';
    shapesContainer.style.width = '100%';
    shapesContainer.style.height = '100%';
    shapesContainer.style.pointerEvents = 'none';
    shapesContainer.style.zIndex = '-1';
    shapesContainer.style.opacity = '0.1';
    document.body.appendChild(shapesContainer);
    
    const shapes = [];
    const shapeCount = 5;
    
    class MorphingShape {
        constructor() {
            this.element = document.createElement('div');
            this.element.style.position = 'absolute';
            this.element.style.width = Math.random() * 200 + 100 + 'px';
            this.element.style.height = Math.random() * 200 + 100 + 'px';
            this.element.style.left = Math.random() * 100 + '%';
            this.element.style.top = Math.random() * 100 + '%';
            this.element.style.background = `linear-gradient(45deg, 
                hsl(${Math.random() * 360}, 70%, 60%),
                hsl(${Math.random() * 360}, 70%, 60%)
            )`;
            this.element.style.borderRadius = this.getRandomBorderRadius();
            this.element.style.filter = 'blur(40px)';
            this.element.style.opacity = '0.5';
            this.element.style.transition = 'all 3s cubic-bezier(0.4, 0, 0.2, 1)';
            
            shapesContainer.appendChild(this.element);
            
            this.morph();
        }
        
        getRandomBorderRadius() {
            return `${Math.random() * 50}% ${Math.random() * 50}% ${Math.random() * 50}% ${Math.random() * 50}% / ${Math.random() * 50}% ${Math.random() * 50}% ${Math.random() * 50}% ${Math.random() * 50}%`;
        }
        
        morph() {
            setInterval(() => {
                this.element.style.borderRadius = this.getRandomBorderRadius();
                this.element.style.transform = `
                    translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px)
                    rotate(${Math.random() * 360}deg)
                    scale(${Math.random() * 0.5 + 0.75})
                `;
            }, 3000);
        }
    }
    
    for (let i = 0; i < shapeCount; i++) {
        shapes.push(new MorphingShape());
    }
}

// ==============================================
// 10. 3D TRANSFORM EFFECTS
// ==============================================
function init3DEffects() {
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        section.style.perspective = '1000px';
        section.style.transformStyle = 'preserve-3d';
        
        window.addEventListener('scroll', () => {
            const rect = section.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            
            if (rect.top < windowHeight && rect.bottom > 0) {
                const distanceFromCenter = (rect.top + rect.height/2 - windowHeight/2);
                const rotateY = (distanceFromCenter / windowHeight) * 5;
                
                section.style.transform = `rotateY(${rotateY}deg)`;
            }
        });
    });
}

// ==============================================
// 11. ADVANCED FORM ANIMATIONS
// ==============================================
function initFormAnimations() {
    const formInputs = document.querySelectorAll('.form-control');
    
    formInputs.forEach(input => {
        // Label animation
        const label = input.previousElementSibling;
        if (label && label.tagName === 'LABEL') {
            input.addEventListener('focus', () => {
                label.style.transform = 'translateY(-10px) scale(0.9)';
                label.style.color = '#3498db';
            });
            
            input.addEventListener('blur', () => {
                if (!input.value) {
                    label.style.transform = 'translateY(0) scale(1)';
                    label.style.color = '';
                }
            });
        }
        
        // Wave animation on focus
        input.addEventListener('focus', () => {
            input.style.animation = 'wave 0.5s ease';
            setTimeout(() => {
                input.style.animation = '';
            }, 500);
        });
    });
    
    // Add wave animation CSS
    const style = document.createElement('style');
    style.textContent = `
        @keyframes wave {
            0%, 100% {
                transform: translateX(0);
            }
            25% {
                transform: translateX(-5px);
            }
            75% {
                transform: translateX(5px);
            }
        }
    `;
    document.head.appendChild(style);
}

// ==============================================
// 12. AUDIO VISUALIZER (if audio exists)
// ==============================================
function initAudioVisualizer() {
    const audioElements = document.querySelectorAll('audio');
    
    if (!audioElements.length) return;
    
    audioElements.forEach(audio => {
        const canvas = document.createElement('canvas');
        canvas.style.position = 'absolute';
        canvas.style.bottom = '0';
        canvas.style.left = '0';
        canvas.style.width = '100%';
        canvas.style.height = '50px';
        canvas.style.opacity = '0.5';
        audio.parentElement.style.position = 'relative';
        audio.parentElement.appendChild(canvas);
        
        const ctx = canvas.getContext('2d');
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const analyser = audioContext.createAnalyser();
        const source = audioContext.createMediaElementSource(audio);
        
        source.connect(analyser);
        analyser.connect(audioContext.destination);
        analyser.fftSize = 256;
        
        const bufferLength = analyser.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);
        
        function draw() {
            if (!audio.paused) {
                requestAnimationFrame(draw);
            }
            
            analyser.getByteFrequencyData(dataArray);
            
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            const barWidth = (canvas.width / bufferLength) * 2.5;
            let barHeight;
            let x = 0;
            
            for (let i = 0; i < bufferLength; i++) {
                barHeight = dataArray[i];
                
                ctx.fillStyle = `rgb(${barHeight + 100}, 50, 150)`;
                ctx.fillRect(x, canvas.height - barHeight / 2, barWidth, barHeight / 2);
                
                x += barWidth + 1;
            }
        }
        
        audio.addEventListener('play', () => {
            audioContext.resume().then(() => {
                draw();
            });
        });
    });
}

// ==============================================
// ADDITIONAL UTILITY FUNCTIONS
// ==============================================

// Debounce function for scroll events
function debounce(func, wait = 20, immediate = true) {
    let timeout;
    return function() {
        const context = this, args = arguments;
        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

// Throttle function for resize events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Add data attributes for animations
function addAnimationAttributes() {
    // Add parallax to hero section
    const hero = document.querySelector('#home');
    if (hero) {
        hero.setAttribute('data-parallax', '');
        hero.setAttribute('data-parallax-speed', '0.3');
    }
    
    // Add typing animation to hero title
    const heroTitle = document.querySelector('#home h2');
    if (heroTitle) {
        heroTitle.setAttribute('data-typing', '');
    }
}

// Initialize everything
addAnimationAttributes();

console.log('Advanced animations loaded successfully!');