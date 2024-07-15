document.addEventListener('DOMContentLoaded', function () {
    // Navigation scroll effect
    const header = document.querySelector('header');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.section');
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('nav ul');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        updateActiveNavLink();
    });

    function updateActiveNavLink() {
        let currentSection = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop && pageYOffset < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === currentSection) {
                link.classList.add('active');
            }
        });
    }

    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            window.scrollTo({
                top: targetSection.offsetTop - 70,
                behavior: 'smooth'
            });

            // Close mobile menu if open
            if (navMenu.classList.contains('show')) {
                navMenu.classList.remove('show');
            }
        });
    });

    // Mobile menu toggle
    menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('show');
    });

    // Animated text for hero section
    const heroTitle = document.querySelector('.animated-text');
    const heroText = heroTitle.textContent;
    heroTitle.textContent = '';

    for (let i = 0; i < heroText.length; i++) {
        const span = document.createElement('span');
        span.textContent = heroText[i];
        span.style.animationDelay = `${i * 0.1}s`;
        heroTitle.appendChild(span);
    }

    // Skills animation
    const skillCategories = document.querySelectorAll('.skill-category');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    skillCategories.forEach(category => {
        observer.observe(category);
    });

    // Project card hover effect
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'scale(1.05)';
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'scale(1)';
        });
    });

    // Contact form validation and submission
    const contactForm = document.getElementById('contactForm');
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();
        if (validateForm()) {
            // Simulating form submission
            showMessage('Message sent successfully!', 'success');
            contactForm.reset();
        }
    });

    function validateForm() {
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const subject = document.getElementById('subject').value.trim();
        const message = document.getElementById('message').value.trim();

        if (name === '' || email === '' || subject === '' || message === '') {
            showMessage('Please fill in all fields.', 'error');
            return false;
        }

        if (!isValidEmail(email)) {
            showMessage('Please enter a valid email address.', 'error');
            return false;
        }

        return true;
    }

    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    function showMessage(message, type) {
        const messageElement = document.createElement('div');
        messageElement.textContent = message;
        messageElement.className = `message ${type}`;
        contactForm.appendChild(messageElement);

        setTimeout(() => {
            messageElement.remove();
        }, 3000);
    }

    // Lazy loading images
    const images = document.querySelectorAll('img');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('fade-in');
                observer.unobserve(img);
            }
        });
    });

    images.forEach(img => {
        imageObserver.observe(img);
    });

    // Typing effect for about section
    const aboutText = document.querySelector('.about-text p:first-child');
    const text = aboutText.textContent;
    aboutText.textContent = '';
    let i = 0;

    function typeWriter() {
        if (i < text.length) {
            aboutText.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 20);
        }
    }

    const aboutSection = document.getElementById('about');
    const aboutObserver = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
            typeWriter();
            aboutObserver.unobserve(aboutSection);
        }
    });

    aboutObserver.observe(aboutSection);

    // Scroll to top button
    const scrollTopBtn = document.createElement('button');
    scrollTopBtn.innerHTML = '&uarr;';
    scrollTopBtn.className = 'scroll-top-btn';
    document.body.appendChild(scrollTopBtn);

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollTopBtn.style.display = 'block';
        } else {
            scrollTopBtn.style.display = 'none';
        }
    });

    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Add custom cursor
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    document.body.appendChild(cursor);

    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });

    // Project filter functionality
    const projectFilterButtons = document.querySelectorAll('.project-filter-btn');
    const projectItems = document.querySelectorAll('.project-card');

    projectFilterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.dataset.filter;
            projectItems.forEach(item => {
                if (filter === 'all' || item.dataset.category === filter) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });

            projectFilterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
        });
    });

    // Dark mode toggle
    const darkModeToggle = document.createElement('button');
    darkModeToggle.textContent = '🌙';
    darkModeToggle.className = 'dark-mode-toggle';
    document.body.appendChild(darkModeToggle);

    darkModeToggle.addEventListener

    // Dark mode toggle (continued)
    darkModeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        if (document.body.classList.contains('dark-mode')) {
            darkModeToggle.textContent = '☀️';
            localStorage.setItem('darkMode', 'enabled');
        } else {
            darkModeToggle.textContent = '🌙';
            localStorage.setItem('darkMode', 'disabled');
        }
    });

    // Check for saved dark mode preference
    if (localStorage.getItem('darkMode') === 'enabled') {
        document.body.classList.add('dark-mode');
        darkModeToggle.textContent = '☀️';
    }

    // Parallax effect for hero section
    const heroSection = document.getElementById('home');
    window.addEventListener('scroll', () => {
        const scrollPosition = window.pageYOffset;
        heroSection.style.backgroundPositionY = scrollPosition * 0.7 + 'px';
    });

    // Animated progress bars for skills
    const skillBars = document.querySelectorAll('.skill-bar');
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skillBar = entry.target;
                const percentage = skillBar.dataset.percentage;
                skillBar.style.width = percentage;
                skillBar.textContent = percentage;
                skillObserver.unobserve(skillBar);
            }
        });
    }, { threshold: 0.5 });

    skillBars.forEach(bar => {
        skillObserver.observe(bar);
    });

    // Project modal
    const projectLinks = document.querySelectorAll('.project-link');
    const modal = document.createElement('div');
    modal.className = 'modal';
    document.body.appendChild(modal);

    projectLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const projectId = link.closest('.project-card').dataset.id;
            openProjectModal(projectId);
        });
    });

    function openProjectModal(projectId) {
        // Fetch project details (you would typically get this from a database or API)
        const projectDetails = getProjectDetails(projectId);
        
        modal.innerHTML = `
            <div class="modal-content">
                <span class="close-modal">&times;</span>
                <h2>${projectDetails.title}</h2>
                <img src="${projectDetails.image}" alt="${projectDetails.title}">
                <p>${projectDetails.description}</p>
                <h3>Technologies Used:</h3>
                <ul>
                    ${projectDetails.technologies.map(tech => `<li>${tech}</li>`).join('')}
                </ul>
                <a href="${projectDetails.liveLink}" target="_blank" class="modal-btn">View Live</a>
                <a href="${projectDetails.githubLink}" target="_blank" class="modal-btn">GitHub Repo</a>
            </div>
        `;
        modal.style.display = 'block';

        const closeModal = modal.querySelector('.close-modal');
        closeModal.addEventListener('click', () => {
            modal.style.display = 'none';
        });

        window.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.style.display = 'none';
            }
        });
    }

    function getProjectDetails(projectId) {
        // This is a mock function. In a real application, you would fetch this data from a server.
        const projects = {
            '1': {
                title: 'Gym Management System',
                image: 'images/gym-management.jpg',
                description: 'A comprehensive gym management system with features for member management, class scheduling, and billing.',
                technologies: ['HTML', 'CSS', 'JavaScript', 'Java', 'Hibernate', 'MySQL'],
                liveLink: '#',
                githubLink: '#'
            },
            '2': {
                title: 'Gym Management System API',
                image: 'images/gym-api.jpg',
                description: 'A RESTful API for the gym management system, providing endpoints for data management and retrieval.',
                technologies: ['Java', 'Spring Boot', 'Hibernate', 'MySQL'],
                liveLink: '#',
                githubLink: '#'
            },
            '3': {
                title: 'Personal Portfolio Website',
                image: 'images/portfolio.jpg',
                description: 'A responsive personal portfolio website showcasing projects and skills.',
                technologies: ['HTML', 'CSS', 'JavaScript'],
                liveLink: '#',
                githubLink: '#'
            }
        };
        return projects[projectId];
    }

    // Animated counters for statistics
    const counters = document.querySelectorAll('.counter');
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.dataset.target);
                let count = 0;
                const updateCounter = () => {
                    const increment = target / 200;
                    if (count < target) {
                        count += increment;
                        counter.textContent = Math.ceil(count);
                        setTimeout(updateCounter, 10);
                    } else {
                        counter.textContent = target;
                    }
                };
                updateCounter();
                counterObserver.unobserve(counter);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => {
        counterObserver.observe(counter);
    });

    // Testimonial slider
    const testimonialSlider = document.querySelector('.testimonial-slider');
    const testimonials = document.querySelectorAll('.testimonial');
    let currentTestimonial = 0;

    function showTestimonial(index) {
        testimonials.forEach((testimonial, i) => {
            testimonial.style.transform = `translateX(${100 * (i - index)}%)`;
        });
    }

    function nextTestimonial() {
        currentTestimonial = (currentTestimonial + 1) % testimonials.length;
        showTestimonial(currentTestimonial);
    }

    function prevTestimonial() {
        currentTestimonial = (currentTestimonial - 1 + testimonials.length) % testimonials.length;
        showTestimonial(currentTestimonial);
    }

    setInterval(nextTestimonial, 5000); // Auto-advance every 5 seconds

    // Add navigation buttons for testimonials
    const prevBtn = document.createElement('button');
    prevBtn.textContent = '←';
    prevBtn.className = 'testimonial-nav prev';
    prevBtn.addEventListener('click', prevTestimonial);

    const nextBtn = document.createElement('button');
    nextBtn.textContent = '→';
    nextBtn.className = 'testimonial-nav next';
    nextBtn.addEventListener('click', nextTestimonial);

    testimonialSlider.appendChild(prevBtn);
    testimonialSlider.appendChild(nextBtn);

    // Implement lazy loading for project images
    const projectImages = document.querySelectorAll('.project-card img');
    const projectImageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('fade-in');
                projectImageObserver.unobserve(img);
            }
        });
    }, { threshold: 0.5, rootMargin: '0px 0px 200px 0px' });

    projectImages.forEach(img => {
        projectImageObserver.observe(img);
    });

    // Add a 'scroll to explore' indicator
    const scrollIndicator = document.createElement('div');
    scrollIndicator.className = 'scroll-indicator';
    scrollIndicator.innerHTML = 'Scroll to explore<br>↓';
    heroSection.appendChild(scrollIndicator);

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 100) {
            scrollIndicator.style.opacity = '0';
        } else {
            scrollIndicator.style.opacity = '1';
        }
    });

    // Initialize AOS (Animate on Scroll) library
    AOS.init({
        duration: 1000,
        once: true,
        mirror: false
    });

    // Add custom cursor interactions
    document.addEventListener('mousemove', (e) => {
        const customCursor = document.querySelector('.custom-cursor');
        customCursor.style.left = e.clientX + 'px';
        customCursor.style.top = e.clientY + 'px';
    });

    const hoverElements = document.querySelectorAll('a, button, .project-card');
    hoverElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            document.querySelector('.custom-cursor').classList.add('hover');
        });
        element.addEventListener('mouseleave', () => {
            document.querySelector('.custom-cursor').classList.remove('hover');
        });
    });
});