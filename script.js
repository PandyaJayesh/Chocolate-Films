// Check if device supports touch
const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

// Adjust animation duration for touch devices
const animationDuration = isTouchDevice ? 0.6 : 0.8;

// Wait for DOM to load
window.addEventListener('load', () => {
    // Initialize counter
    let counter = 0;
    const counterElement = document.querySelector('.counter');
    
    // Counter animation with faster speed on mobile
    const counterSpeed = isTouchDevice ? 30 : 50;
    const counterAnimation = setInterval(() => {
        if (counter < 100) {
            counter += Math.floor(Math.random() * 10) + 1;
            if (counter > 100) counter = 100;
            counterElement.textContent = counter;
        }
        if (counter === 100) {
            clearInterval(counterAnimation);
            startRevealAnimation();
        }
    }, counterSpeed);

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Main reveal animation
    function startRevealAnimation() {
        const tl = gsap.timeline();

        if (prefersReducedMotion) {
            // Simplified animation for reduced motion preference
            tl.to('.loading-screen', {
                duration: 0.3,
                opacity: 0,
                display: 'none'
            })
            .to('.reveal-screen', {
                duration: 0.3,
                opacity: 0,
                display: 'none'
            })
            .to('.intro-text span', {
                duration: 0.3,
                opacity: 1
            })
            .to('.main-content h2', {
                duration: 0.3,
                opacity: 1
            });
        } else {
            // Full animation
            tl.to('.loading-screen', {
                duration: animationDuration,
                opacity: 0,
                ease: 'power2.inOut'
            })
            .to('.loading-screen', {
                display: 'none'
            })
            .to('.reveal-screen', {
                duration: 1.2,
                scaleY: 0,
                transformOrigin: 'top',
                ease: 'power4.inOut'
            })
            .to('.intro-text span', {
                duration: 1.5,
                y: 0,
                stagger: 0.2,
                ease: 'power4.out'
            }, '-=0.5')
            .to('.intro-text', {
                duration: 1,
                opacity: 0,
                y: -50,
                delay: 1,
                ease: 'power4.inOut'
            })
            .to('.main-content h2', {
                duration: 1,
                opacity: 1,
                y: 0,
                ease: 'power4.out'
            }, '-=0.5');
        }
    }
});

// Handle visibility change
document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') {
        window.location.reload();
    }
});







const menuBtn = document.querySelector('.menu-btn');
        const overlay = document.querySelector('.overlay');
        const overlayMenu = document.querySelector('.overlay-menu');
        const menuLinks = document.querySelectorAll('.menu-link');
        const topSlide = document.querySelector('.overlay-slide.top');
        const bottomSlide = document.querySelector('.overlay-slide.bottom');
        let menuOpen = false;

        // Timeline for opening animation
        const openTl = gsap.timeline({ paused: true });

        // Initial setup
        gsap.set(topSlide, { scaleY: 0 });
        gsap.set(bottomSlide, { scaleY: 0 });
        gsap.set(menuLinks, { y: 100 });
        gsap.set(overlayMenu, { visibility: 'hidden' });

        // Build the timeline
        openTl
            .to(overlay, { visibility: 'visible', duration: 0 })
            .to(topSlide, {
                scaleY: 1,
                duration: 0.5,
                ease: "power2.inOut"
            })
            .to(bottomSlide, {
                scaleY: 1,
                duration: 0.5,
                ease: "power2.inOut"
            }, "-=0.3")
            .to(overlayMenu, { visibility: 'visible', duration: 0 })
            .to(menuLinks, {
                y: 0,
                duration: 0.8,
                ease: "power4.out",
                stagger: 0.1
            })
            .to('.line', {
                scaleX: 1,
                transformOrigin: "left",
                duration: 0.8,
                ease: "power4.out",
                stagger: 0.1
            }, "-=0.8");

        // Timeline for closing animation
        const closeTl = gsap.timeline({ paused: true });

        closeTl
            .to(menuLinks, {
                y: 100,
                duration: 0.5,
                ease: "power2.in",
                stagger: 0.05
            })
            .to('.line', {
                scaleX: 0,
                transformOrigin: "right",
                duration: 0.5,
                ease: "power2.in",
                stagger: 0.05
            }, "-=0.5")
            .to(overlayMenu, { visibility: 'hidden', duration: 0 })
            .to(bottomSlide, {
                scaleY: 0,
                duration: 0.5,
                ease: "power2.inOut"
            })
            .to(topSlide, {
                scaleY: 0,
                duration: 0.5,
                ease: "power2.inOut"
            }, "-=0.3")
            .to(overlay, { visibility: 'hidden', duration: 0 });

        menuBtn.addEventListener('click', () => {
            if (!menuOpen) {
                menuBtn.classList.add('open');
                document.body.style.overflow = 'hidden';
                openTl.play(0);
                menuOpen = true;
            } else {
                menuBtn.classList.remove('open');
                document.body.style.overflow = 'visible';
                closeTl.play(0);
                menuOpen = false;
            }
        });

        // Close menu when clicking links
        menuLinks.forEach(link => {
            link.addEventListener('click', () => {
                menuBtn.classList.remove('open');
                document.body.style.overflow = 'visible';
                closeTl.play(0);
                menuOpen = false;
            });
        });

        // about us
        function wrapWordsInSpans(text, containerId, delay = 0) {
            const container = document.getElementById(containerId);
            const words = text.split(' ');
            
            container.innerHTML = words
              .map((word, index) => {
                return `<div class="word"><span style="animation-delay: ${delay + index * 0.1}s">${word}</span></div>`;
              })
              .join('');
          }
      
          // Initialize text animations
          wrapWordsInSpans('We Create Stories That Define Brands', 'titleContainer', 0.2);
          wrapWordsInSpans('As storytellers in motion, we blend cinematic artistry with cutting-edge technology to create unforgettable narratives that resonate with audiences worldwide.', 'descriptionContainer', 0.4);
      
          function animateNumber(element, target, duration = 2000) {
            let start = 0;
            const increment = target / (duration / 16);
            
            function updateNumber() {
              start += increment;
              if (start < target) {
                element.textContent = Math.floor(start);
                requestAnimationFrame(updateNumber);
              } else {
                element.textContent = target;
              }
            }
            
            updateNumber();
          }
      
          // Intersection Observer for triggering animations when in view
          const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
              if (entry.isIntersecting) {
                animateNumber(document.getElementById('awards'), 47);
                animateNumber(document.getElementById('projects'), 156);
                animateNumber(document.getElementById('clients'), 89);
                animateNumber(document.getElementById('years'), 12);
                observer.unobserve(entry.target);
              }
            });
          }, { threshold: 0.5 });
      
          observer.observe(document.querySelector('.stats-container'));


        //   our services
        gsap.registerPlugin(ScrollTrigger);

// Initialize magnetic cursor
    const cursor = document.querySelector('.magnetic-cursor');
    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;

    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    gsap.to(cursor, {
      opacity: 1,
      duration: 0.5,
      delay: 1
    });

    gsap.ticker.add(() => {
      const diffX = mouseX - cursorX;
      const diffY = mouseY - cursorY;
      
      cursorX += diffX * 0.1;
      cursorY += diffY * 0.1;
      
      gsap.set(cursor, {
        x: cursorX - 10,
        y: cursorY - 10
      });
    });

    // Animate services header
    gsap.from('.services-header', {
      y: 50,
      opacity: 0,
      duration: 1,
      scrollTrigger: {
        trigger: '.services-header',
        start: 'top 80%',
        toggleActions: 'play none none reverse'
      }
    });

    // Animate service cards
    const cards = document.querySelectorAll('.service-card');
    cards.forEach((card, index) => {
      gsap.set(card, { opacity: 0, y: 50 }); // Set initial state
      
      gsap.to(card, {
        y: 0,
        opacity: 1,
        duration: 0.8,
        delay: index * 0.2,
        scrollTrigger: {
          trigger: card,
          start: 'top 85%',
          toggleActions: 'play none none reverse'
        }
      });
    });

    // Magnetic effect on service cards
    if (window.innerWidth > 768) {
      cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
          const rect = card.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          
          gsap.to(cursor, {
            scale: 2,
            duration: 0.3
          });
          
          gsap.to(card, {
            x: (x - rect.width / 2) / rect.width * 20,
            y: (y - rect.height / 2) / rect.height * 20,
            rotation: ((x - rect.width / 2) / rect.width) * 5,
            duration: 0.3
          });
        });

        card.addEventListener('mouseleave', () => {
          gsap.to(cursor, {
            scale: 1,
            duration: 0.3
          });
          
          gsap.to(card, {
            x: 0,
            y: 0,
            rotation: 0,
            duration: 0.3
          });
        });
      });
    }

    // our team
    gsap.registerPlugin(ScrollTrigger);

    // Animate header
    gsap.from('.team-header', {
      y: 100,
      opacity: 0,
      duration: 1,
      scrollTrigger: {
        trigger: '.team-header',
        start: 'top 80%',
        toggleActions: 'play none none reverse'
      }
    });

    // Animate team members
    const teamMembers = document.querySelectorAll('.team-member');
    teamMembers.forEach((member, index) => {
      gsap.from(member, {
        y: 100,
        opacity: 0,
        duration: 1,
        delay: index * 0.2,
        scrollTrigger: {
          trigger: member,
          start: 'top 85%',
          toggleActions: 'play none none reverse'
        }
      });
    });

    // Parallax effect on images
    teamMembers.forEach(member => {
      const image = member.querySelector('.member-image');
      
      gsap.to(image, {
        y: '20%',
        ease: 'none',
        scrollTrigger: {
          trigger: member,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true
        }
      });
    });

    
    // footer
   
    // Scroll to top functionality
    const scrollToTop = document.querySelector('.scroll-to-top');

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 200) {
            scrollToTop.classList.add('visible');
        } else {
            scrollToTop.classList.remove('visible');
        }
    });

    scrollToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Newsletter form submission
    const newsletterForm = document.querySelector('.newsletter-form');
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const input = newsletterForm.querySelector('input');
        if (input.value) {
            alert('Thank you for subscribing!');
            input.value = '';
        }
    });

    // Hover sound effect for links
    const links = document.querySelectorAll('a, button');
    links.forEach(link => {
        link.addEventListener('mouseenter', () => {
            const audio = new Audio('data:audio/mp3;base64,SUQzBAAAAAAAI1RTU0UAAAAPAAADTGF2ZjU4Ljc2LjEwMAAAAAAAAAAAAAAA//tQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAASW5mbwAAAA8AAAASAAAeMwAUFBQUFCgoKCgoKDw8PDw8PFBQUFBQUG9vb29vb4CAgICAgJSUlJSUlKCgoKCgoLCwsLCwsL+/v7+/v9DQ0NDQ0NDQ0NDQ3d3d3d3d6urq6urq9/f39/f3//////////8AAAAATGF2YzU4LjEzAAAAAAAAAAAAAAAAJAYAAAAAAAAAHjOZTf9/AAAAAAAAAAAAAAAA//tQZAACFBQTGH0MwAI2ACYnQAAEKBM0f4x4AEhIJmNBAABMAAADXqx2qCQkOjw+JxkL/5D8nIWFhYWFnJzs5OTMzJDIyM0ODg4ODiHBwcHBvDZyc3KSkpKFCwsLC4WFhXVjYzIyMjIlyioqNzcjIzc3Nzcuzs7OzkFCWnGKiqysrK3h4eHh4e4uLhYUPHx8fHxwAABYWGBgKioqKiov///////////+AAAA//tQZAUCUpzOGv/0AAhNiCbPQAAEKCMke/h4AElIJp94BAAmFhYWFhYWFpdLS0tLV1dXV11dXV1dVFRUVFRkZGRkZGhoaGhoaGqqqqqqqqqqqrGxsbGxwcHBwcHOzs7Ozs7Y2NjY2NnBwcHBwdvb29vb2//////////+AWFjg4ODg4UPDw8PDQ8PDw8PDw8KCiEhISEhISEhISEhIGBgYGBgAAAAABQUFBYWAgICAgICAAAAEhIVFRUVAAAAAAAA//tQZAIDlMJDHv3vQAg6CCY/eAACI4j0fTGAAEEQIt58xgAEAAAAAH0fR9H0fX8f5/n+f5/n+f53lQUFBQUFBTu7vVBQUFBQUFBQUFBQUFBQUFLu7u7u7uQUFBQUFBQUFBQUFBQAAFBQUFBQUFApSUlKCgUFApKCgUFKBQUFBQUFBQUFACgoKCgoKCgoAAAAAAAAAAAAAAAAAsLCwsLAAAAsLCwsLCwsLCwsLA=');
            audio.volume = 0.1;
            audio.play().catch(() => {});
        });
    });