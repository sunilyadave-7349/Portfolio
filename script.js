/**
 * Portfolio JavaScript - Modern Interactivity, Pixel Vertical Nav & Theme Controller
 */

document.addEventListener('DOMContentLoaded', () => {
  // =========================================================================
  // 1. NIGHT / LIGHT THEME TOGGLE (MEDIA QUERY & PERSISTENCE)
  // =========================================================================
  const themeToggleBtn = document.getElementById('theme-toggle');
  const themeToggleMobile = document.getElementById('theme-toggle-mobile');
  const htmlElement = document.documentElement;

  // Auto-detect browser/system default theme via media query
  const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
  const savedTheme = localStorage.getItem('theme');

  if (savedTheme) {
    htmlElement.setAttribute('data-theme', savedTheme);
  } else {
    // If no manual preference, adopt browser default
    const systemTheme = prefersDarkScheme.matches ? 'dark' : 'light';
    htmlElement.setAttribute('data-theme', systemTheme);
  }

  // Listen for real-time OS/browser theme changes if user hasn't overridden
  prefersDarkScheme.addEventListener('change', (e) => {
    if (!localStorage.getItem('theme')) {
      const newSystemTheme = e.matches ? 'dark' : 'light';
      htmlElement.setAttribute('data-theme', newSystemTheme);
    }
  });

  function toggleTheme() {
    const currentTheme = htmlElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    htmlElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  }

  if (themeToggleBtn) themeToggleBtn.addEventListener('click', toggleTheme);
  if (themeToggleMobile) themeToggleMobile.addEventListener('click', toggleTheme);


  // =========================================================================
  // 2. TYPEWRITER EFFECT IN HERO SECTION
  // =========================================================================
  const typewriterElement = document.getElementById('typewriter');
  const phrases = [
    'FULL STACK WEB APPS',
    'CLEAN ALGORITHMIC CODE',
    'RESPONSIVE UI DESIGNS',
    'HIGH IMPACT SOFTWARE'
  ];

  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 90;

  function typeEffect() {
    if (!typewriterElement) return;

    const currentPhrase = phrases[phraseIndex];
    
    if (isDeleting) {
      typewriterElement.textContent = currentPhrase.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 45;
    } else {
      typewriterElement.textContent = currentPhrase.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 90;
    }

    if (!isDeleting && charIndex === currentPhrase.length) {
      isDeleting = true;
      typingSpeed = 1800; // Pause at end of sentence
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      typingSpeed = 400; // Pause before new sentence
    }

    setTimeout(typeEffect, typingSpeed);
  }

  typeEffect();


  // =========================================================================
  // 3. HORIZONTAL NAVBAR MOBILE DROPDOWN TOGGLE
  // =========================================================================
  const mobileToggleBtn = document.getElementById('mobile-menu-toggle');
  const horizontalNav = document.getElementById('main-navigation');
  const navMenuLinks = document.querySelectorAll('.nav-menu-link');

  if (mobileToggleBtn && horizontalNav) {
    mobileToggleBtn.addEventListener('click', () => {
      const isOpen = horizontalNav.classList.toggle('open');
      mobileToggleBtn.setAttribute('aria-expanded', isOpen);
    });

    // Close dropdown when clicking any navigation link
    navMenuLinks.forEach(link => {
      link.addEventListener('click', () => {
        horizontalNav.classList.remove('open');
        mobileToggleBtn.setAttribute('aria-expanded', 'false');
      });
    });
  }


  // =========================================================================
  // 4. ACTIVE NAVIGATION LINK ON SCROLL (ALL 8 SECTIONS)
  // =========================================================================
  const sections = document.querySelectorAll('section[id]');

  function highlightNavOnScroll() {
    const scrollY = window.pageYOffset + 110;

    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop;
      const sectionId = current.getAttribute('id');
      const targetNavLink = document.querySelector(`.nav-menu-list a[href*="${sectionId}"]`);

      if (targetNavLink) {
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          targetNavLink.classList.add('active');
        } else {
          targetNavLink.classList.remove('active');
        }
      }
    });
  }

  window.addEventListener('scroll', highlightNavOnScroll);
  highlightNavOnScroll();


  // =========================================================================
  // 5. SKILLS ARSENAL CATEGORY FILTER & ANIMATED PROGRESS BARS
  // =========================================================================
  const skillTabButtons = document.querySelectorAll('.pixel-tab-btn');
  const skillCards = document.querySelectorAll('.skill-category-card.pixel-card');
  const skillBars = document.querySelectorAll('.skill-pixel-fill');

  // Interactive Category Filter Tabs
  skillTabButtons.forEach(button => {
    button.addEventListener('click', () => {
      skillTabButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');

      const filterValue = button.getAttribute('data-filter');

      skillCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // IntersectionObserver to animate skill progress bars on scroll
  if ('IntersectionObserver' in window) {
    const skillsSection = document.getElementById('skills');
    if (skillsSection) {
      const skillsObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            skillBars.forEach(bar => {
              const targetWidth = bar.style.getPropertyValue('--target-width') || bar.getAttribute('style').match(/width:\s*(\d+%)/)?.[1] || '80%';
              bar.style.width = targetWidth;
            });
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.2 });

      skillsObserver.observe(skillsSection);
    }
  }

  // =========================================================================
  // 6. PROJECT FILTERING LOGIC
  // =========================================================================
  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      filterButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');

      const filterValue = button.getAttribute('data-filter');

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });


  // =========================================================================
  // 6. INTERACTIVE RETRO CHAT TERMINAL
  // =========================================================================
  const chatForm = document.getElementById('chat-form');
  const chatInput = document.getElementById('chat-input');
  const chatMessages = document.getElementById('chat-messages');
  const quickChips = document.querySelectorAll('.quick-chip');

  const botResponses = {
    skills: '⚡ <strong>Technical Skills:</strong> JavaScript (ES6+), React.js, Python, Java, Node.js, Express, HTML5/CSS3, SQL (MySQL/PostgreSQL), Git, and Data Structures & Algorithms.',
    projects: '🚀 <strong>Featured Projects:</strong> E-Commerce Web App (React/Node/MongoDB), Task Manager Kanban (JavaScript/HTML5), and Weather Analytics Dashboard (Python/Flask/Chart.js). Check the Projects section for live demos!',
    education: '🎓 <strong>Education:</strong> Bachelor of Engineering (B.E.) in Computer Science (2020–2024), First Class with Distinction.',
    hire: '💼 <strong>Availability:</strong> Sunil is available immediately for Full-Time Junior Software Engineer, Frontend/Backend, or Internship roles. Email: <a href="mailto:sunile732k8@gmail.com">sunile732k8@gmail.com</a>',
    contact: '📬 <strong>Direct Contact:</strong> Phone: +91 7349172129 | Email: sunile732k8@gmail.com | LinkedIn: <a href="https://www.linkedin.com/in/sunil-e-65388839" target="_blank">linkedin.com/in/sunil-e</a>',
    resume: '📄 You can download Sunil\'s official resume using the "GET RESUME" button in the hero or sidebar!',
    help: 'Available commands: <code>skills</code>, <code>projects</code>, <code>education</code>, <code>hire</code>, <code>contact</code>, <code>resume</code>, or ask any custom question!'
  };

  function appendChatMessage(sender, text, isUser = false) {
    if (!chatMessages) return;

    const msgDiv = document.createElement('div');
    msgDiv.className = `chat-msg ${isUser ? 'user-msg' : 'bot-msg'}`;

    const senderSpan = document.createElement('span');
    senderSpan.className = 'msg-sender';
    senderSpan.textContent = sender;

    const contentSpan = document.createElement('span');
    contentSpan.className = 'msg-content';
    contentSpan.innerHTML = text;

    msgDiv.appendChild(senderSpan);
    msgDiv.appendChild(contentSpan);

    chatMessages.appendChild(msgDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  function handleBotReply(userInput) {
    const cleanInput = userInput.trim().toLowerCase();

    let matchedKey = null;
    if (cleanInput.includes('skill') || cleanInput.includes('stack') || cleanInput.includes('tech')) matchedKey = 'skills';
    else if (cleanInput.includes('project') || cleanInput.includes('work') || cleanInput.includes('app')) matchedKey = 'projects';
    else if (cleanInput.includes('edu') || cleanInput.includes('degree') || cleanInput.includes('college')) matchedKey = 'education';
    else if (cleanInput.includes('hire') || cleanInput.includes('job') || cleanInput.includes('offer') || cleanInput.includes('salary')) matchedKey = 'hire';
    else if (cleanInput.includes('contact') || cleanInput.includes('email') || cleanInput.includes('phone') || cleanInput.includes('reach')) matchedKey = 'contact';
    else if (cleanInput.includes('resume') || cleanInput.includes('cv')) matchedKey = 'resume';
    else if (cleanInput.includes('help')) matchedKey = 'help';

    setTimeout(() => {
      if (matchedKey && botResponses[matchedKey]) {
        appendChatMessage('[BOT]:', botResponses[matchedKey], false);
      } else {
        appendChatMessage('[BOT]:', `Thanks for asking about "<em>${userInput}</em>"! Sunil is a dedicated problem solver ready to tackle new challenges. Feel free to connect directly via <a href="#contact">Contact Form</a> or email him at <a href="mailto:sunile732k8@gmail.com">sunile732k8@gmail.com</a>.`, false);
      }
    }, 400);
  }

  if (chatForm && chatInput) {
    chatForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const message = chatInput.value.trim();
      if (!message) return;

      appendChatMessage('[YOU]:', message, true);
      chatInput.value = '';
      handleBotReply(message);
    });
  }

  quickChips.forEach(chip => {
    chip.addEventListener('click', () => {
      const query = chip.getAttribute('data-query');
      if (query && botResponses[query]) {
        appendChatMessage('[YOU]:', chip.textContent, true);
        setTimeout(() => {
          appendChatMessage('[BOT]:', botResponses[query], false);
        }, 300);
      }
    });
  });


  // =========================================================================
  // 7. CONTACT FORM VALIDATION & INTERACTION
  // =========================================================================
  const contactForm = document.getElementById('contact-form');
  const formToast = document.getElementById('form-toast');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      let isValid = true;
      const nameInput = document.getElementById('contact-name');
      const emailInput = document.getElementById('contact-email');
      const subjectInput = document.getElementById('contact-subject');
      const messageInput = document.getElementById('contact-message');

      const inputs = [nameInput, emailInput, subjectInput, messageInput];

      inputs.forEach(input => {
        const group = input.parentElement;
        if (!input.value.trim()) {
          group.classList.add('has-error');
          isValid = false;
        } else if (input.type === 'email' && !validateEmail(input.value)) {
          group.classList.add('has-error');
          isValid = false;
        } else {
          group.classList.remove('has-error');
        }
      });

      if (isValid) {
        formToast.textContent = '🎉 Thank you! Your message has been sent successfully.';
        formToast.className = 'form-toast success';
        contactForm.reset();

        setTimeout(() => {
          formToast.style.display = 'none';
        }, 5000);
      }
    });

    contactForm.querySelectorAll('.form-input, .form-textarea').forEach(input => {
      input.addEventListener('input', () => {
        input.parentElement.classList.remove('has-error');
      });
    });
  }

  function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }


  // =========================================================================
  // 8. DYNAMIC COPYRIGHT YEAR
  // =========================================================================
  const yearElement = document.getElementById('current-year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }


  // =========================================================================
  // 9. TIMELINE MILESTONE FILTER (STEP 6 - INTERACTIVE TIMELINE)
  //    Clicking filter pills shows/hides timeline articles by data-milestone.
  // =========================================================================
  const timelineFilterBtns = document.querySelectorAll('.t-filter-btn');
  const timelineItems = document.querySelectorAll('.timeline-item');

  timelineFilterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Update active state on filter buttons
      timelineFilterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-tfilter');

      // Show/hide timeline items based on their data-milestone attribute
      timelineItems.forEach(item => {
        const milestone = item.getAttribute('data-milestone');
        if (filterValue === 'all' || milestone === filterValue) {
          item.style.display = 'block';
          // Re-trigger entrance animation by toggling a class
          item.style.animation = 'none';
          item.offsetHeight; // Force reflow
          item.style.animation = '';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });


  // =========================================================================
  // 10. SCROLL REVEAL ANIMATIONS (STEP 14 - VISUAL ENHANCEMENTS)
  //     Uses IntersectionObserver to animate elements into view as user scrolls.
  //     This creates a dynamic, alive feeling without heavy libraries.
  // =========================================================================
  if ('IntersectionObserver' in window) {

    // Add the .reveal class to elements that should animate on scroll
    const revealTargets = document.querySelectorAll(
      '.timeline-item, .project-card, .testimonial-pixel-card, ' +
      '.sub-info-card, .about-bio-card, .pixel-video-frame, .video-stats-row, ' +
      '.contact-info-card, .contact-form-card'
    );

    // Start elements hidden (opacity 0, shifted down)
    revealTargets.forEach(el => {
      el.style.opacity = '0';
      el.style.transform = el.style.transform
        ? el.style.transform + ' translateY(24px)'
        : 'translateY(24px)';
      el.style.transition = 'opacity 0.6s ease, transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
    });

    // Observer reveals elements when they enter the viewport
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry, idx) => {
        if (entry.isIntersecting) {
          // Stagger delay so sibling elements cascade in sequence
          setTimeout(() => {
            entry.target.style.opacity = '1';
            entry.target.style.transform = entry.target.style.transform
              .replace('translateY(24px)', '')
              .trim() || 'none';
          }, idx * 60); // 60ms stagger per element

          observer.unobserve(entry.target); // Only animate once
        }
      });
    }, {
      threshold: 0.1,     // Trigger when 10% of element is visible
      rootMargin: '0px 0px -40px 0px'  // Slight offset from viewport bottom
    });

    revealTargets.forEach(el => revealObserver.observe(el));
  }


  // =========================================================================
  // 11. HERO PARALLAX MICRO-ANIMATION (STEP 14 - VISUAL EFFECTS)
  //     Subtle mouse-tracking parallax on the hero HUD card for a premium feel.
  //     Adds depth without being distracting.
  // =========================================================================
  const heroSection = document.getElementById('hero');
  const hudCard = document.querySelector('.pixel-hud-card');

  if (heroSection && hudCard) {
    heroSection.addEventListener('mousemove', (e) => {
      const rect = heroSection.getBoundingClientRect();
      // Calculate mouse position relative to center of hero (range: -1 to 1)
      const xRatio = (e.clientX - rect.left) / rect.width - 0.5;
      const yRatio = (e.clientY - rect.top) / rect.height - 0.5;

      // Apply subtle rotation — max 4 degrees in any direction
      hudCard.style.transform = `
        rotateY(${xRatio * 8}deg)
        rotateX(${-yRatio * 6}deg)
        translateY(-4px)
      `;
    });

    heroSection.addEventListener('mouseleave', () => {
      // Smoothly return to default position when mouse leaves hero
      hudCard.style.transition = 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
      hudCard.style.transform = 'translateY(0)';
      setTimeout(() => {
        hudCard.style.transition = '';
      }, 500);
    });
  }

});
