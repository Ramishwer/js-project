// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Mobile menu toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('active');
});
// Dropdown behavior: mobile toggle, keyboard nav, outside-click close
document.querySelectorAll('.dropdown-toggle').forEach(btn => {
    const li = btn.parentElement;
    const menu = li.querySelector('.dropdown');
    const items = menu ? Array.from(menu.querySelectorAll('a')) : [];

    function openDropdown() {
        li.classList.add('open');
        btn.setAttribute('aria-expanded', 'true');
    }
    function closeDropdown() {
        li.classList.remove('open');
        btn.setAttribute('aria-expanded', 'false');
    }

    btn.addEventListener('click', (e) => {
        const isMobile = window.innerWidth <= 768 || navLinks.classList.contains('active');
        if (isMobile) {
            e.preventDefault();
            li.classList.toggle('open');
            const expanded = btn.getAttribute('aria-expanded') === 'true';
            btn.setAttribute('aria-expanded', (!expanded).toString());
        }
    });

    // Keyboard interactions
    btn.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            li.classList.toggle('open');
            const expanded = btn.getAttribute('aria-expanded') === 'true';
            btn.setAttribute('aria-expanded', (!expanded).toString());
            if (!expanded) items[0]?.focus();
        } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            openDropdown();
            items[0]?.focus();
        } else if (e.key === 'Escape') {
            closeDropdown();
            btn.focus();
        }
    });

    items.forEach((link, idx) => {
        link.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowDown') {
                e.preventDefault();
                items[(idx + 1) % items.length].focus();
            } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                items[(idx - 1 + items.length) % items.length].focus();
            } else if (e.key === 'Escape') {
                closeDropdown();
                btn.focus();
            }
        });
    });
});

// Close open dropdowns when clicking outside
document.addEventListener('click', (e) => {
    document.querySelectorAll('.has-dropdown.open').forEach(li => {
        if (!li.contains(e.target)) {
            li.classList.remove('open');
            li.querySelector('.dropdown-toggle')?.setAttribute('aria-expanded', 'false');
        }
    });
});

// Reset dropdowns on resize
window.addEventListener('resize', () => {
    document.querySelectorAll('.has-dropdown.open').forEach(li => {
        li.classList.remove('open');
        li.querySelector('.dropdown-toggle')?.setAttribute('aria-expanded', 'false');
    });
});

// Contact form submission
const contactForm = document.getElementById('contact-form');

contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    
    // Simple validation
    if (name && email && message) {
        // In a real application, you would send this data to a server
        alert(`Thank you, ${name}! Your message has been sent. We'll get back to you soon.`);
        
        // Clear the form
        contactForm.reset();
    } else {
        alert('Please fill in all fields.');
    }
});

// Add scroll effect to header
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Animate elements on scroll
const observerOptions = {
    threshold: 0,
    rootMargin: '0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, observerOptions);

// Observe elements to animate
document.querySelectorAll('.service-card, .portfolio-item, .stat, .fade-in').forEach(el => {
    observer.observe(el);
});

// Fallback: show all fade-in elements after 1 second if not animated
setTimeout(() => {
    document.querySelectorAll('.fade-in:not(.animate)').forEach(el => {
        el.classList.add('animate');
    });
}, 1000);

// Image modal for intro and portfolio images
function createImageModal() {
    const modal = document.createElement('div');
    modal.id = 'image-modal';
    modal.style.position = 'fixed';
    modal.style.top = '0';
    modal.style.left = '0';
    modal.style.width = '100%';
    modal.style.height = '100%';
    modal.style.background = 'rgba(0,0,0,0.8)';
    modal.style.display = 'flex';
    modal.style.alignItems = 'center';
    modal.style.justifyContent = 'center';
    modal.style.padding = '20px';
    modal.style.zIndex = '2000';
    modal.style.cursor = 'zoom-out';

    const img = document.createElement('img');
    img.style.maxWidth = '100%';
    img.style.maxHeight = '100%';
    img.style.borderRadius = '8px';
    modal.appendChild(img);

    modal.addEventListener('click', () => document.body.removeChild(modal));
    return { modal, img };
}

document.addEventListener('click', (e) => {
    const target = e.target;
    if (target.classList && target.classList.contains('intro-image')) {
        const { modal, img } = createImageModal();
        img.src = target.src;
        img.alt = target.alt || '';
        document.body.appendChild(modal);
    }
});

// Small enhancement: update footer year if present
const footerYear = document.querySelector('footer p');
if (footerYear) {
    const year = new Date().getFullYear();
    footerYear.innerHTML = `&copy; ${year} TechNova Solutions. All rights reserved.`;
}
