/**
 * ENIGMA E-CELL LANDING PAGE - FIXED JAVASCRIPT
 * v2.3 - Working Gallery Scroll Trigger & Enhanced Animations
 * 
 * FIXES:
 * - Gallery scroll-trigger now works properly with smooth horizontal movement
 * - Enhanced multilingual animation with faster, smoother transitions
 * - Improved accessibility and reduced motion support
 * - Performance optimized with proper event handling
 */

'use strict';

// ===============================
// ENHANCED ANIMATION CONFIGURATION
// ===============================

/* ENHANCED: Faster, smoother timing constants - easily adjustable */
// Change DISPLAY_DURATION to adjust how long each language shows (in milliseconds)
const DISPLAY_DURATION = 1800; // 700ms = faster language cycling
// Change TRANSITION_DURATION to adjust fade speed (in milliseconds) 
const TRANSITION_DURATION = 180; // 180ms = smooth, fast crossfade
// Change TRANSITION_EASING for different animation feel
const TRANSITION_EASING = 'cubic-bezier(0.2, 0.9, 0.2, 1)'; // Smooth, natural easing

/* Language configuration - easily editable */
// To add/remove/reorder languages: modify this array
const LANGUAGES = [
  { text: 'ENIGMA', lang: 'en', label: 'English' },
  { text: 'एनिग्मा', lang: 'hi', label: 'Hindi' }, // Devanagari script
  { text: 'ಎನಿಗ್ಮಾ', lang: 'kn', label: 'Kannada' }, // Kannada script
  { text: 'एनिग्मा', lang: 'mr', label: 'Marathi' }, // Devanagari script  
  { text: 'એનિગ્મા', lang: 'gu', label: 'Gujarati' }, // Gujarati script
  { text: 'এনিগ্মা', lang: 'bn', label: 'Bengali' } // Bengali script
];

/* FIXED: Gallery scroll configuration - properly implemented */
// Change GALLERY_PIN_OFFSET to adjust when gallery starts pinning (pixels from section start)
const GALLERY_PIN_OFFSET = 100;
// Change GALLERY_SCROLL_SENSITIVITY to adjust horizontal scroll speed (0.5-2.0 recommended)
const GALLERY_SCROLL_SENSITIVITY = 1.0;
// Enable/disable gallery scroll functionality
const GALLERY_ENABLED = true;

// ===============================
// STATE MANAGEMENT
// ===============================

// Enhanced state for multilingual animation
let currentLanguageIndex = 0;
let animationInterval = null;
let prefersReducedMotion = false;
let isTransitioning = false;

// FIXED: Gallery state management with proper scroll calculations
let galleryState = {
  isActive: false,
  isInitialized: false,
  sectionElement: null,
  containerElement: null,
  trackElement: null,
  totalScrollDistance: 0,
  startOffset: 0,
  endOffset: 0,
  trackWidth: 0,
  containerWidth: 0
};

// DOM elements cache
let DOM = {};

const STATE = {
  isNavOpen: false,
  isScrolling: false,
  currentSection: 'hero',
  observers: [],
  statsAnimated: false,
  reducedMotion: false
};

// ===============================
// ENHANCED MULTILINGUAL ANIMATION SYSTEM
// ===============================

/**
 * ENHANCED: Initialize smooth multilingual text animation
 */
function initEnhancedMultilingualAnimation() {
  prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  
  const heroTextElement = document.getElementById('hero-text');
  if (!heroTextElement) {
    console.warn('Hero text element not found for multilingual animation');
    return;
  }
  
  // Set up enhanced accessibility attributes
  heroTextElement.setAttribute('aria-live', 'polite');
  heroTextElement.setAttribute('aria-atomic', 'true');
  heroTextElement.setAttribute('aria-label', 'Company name in multiple languages');
  
  // If reduced motion is preferred, keep static text
  if (prefersReducedMotion) {
    heroTextElement.textContent = LANGUAGES[0].text;
    heroTextElement.setAttribute('lang', LANGUAGES[0].lang);
    console.log('Reduced motion detected - multilingual animation disabled');
    return;
  }
  
  // Start enhanced animation cycle
  startEnhancedLanguageCycle(heroTextElement);
  
  console.log('Enhanced multilingual animation initialized');
}

/**
 * ENHANCED: Start language cycling with smooth crossfade + scale
 * @param {HTMLElement} element - The text element to animate
 */
function startEnhancedLanguageCycle(element) {
  // Set initial language
  updateLanguageText(element, currentLanguageIndex);
  
  // Create interval for smooth language switching
  animationInterval = setInterval(() => {
    if (isTransitioning) return;
    
    // Move to next language
    currentLanguageIndex = (currentLanguageIndex + 1) % LANGUAGES.length;
    
    // Animate the text change
    animateEnhancedLanguageChange(element, currentLanguageIndex);
  }, DISPLAY_DURATION);
}

/**
 * ENHANCED: Animate language change with smooth crossfade and scale
 * @param {HTMLElement} element - The text element to animate
 * @param {number} languageIndex - Index of the new language
 */
function animateEnhancedLanguageChange(element, languageIndex) {
  if (isTransitioning) return;
  
  isTransitioning = true;
  
  // Apply smooth CSS transitions
  element.style.transition = `opacity ${TRANSITION_DURATION}ms ${TRANSITION_EASING}, transform ${TRANSITION_DURATION}ms ${TRANSITION_EASING}`;
  
  // Add fade-out class
  element.classList.add('fade-out');
  
  // Change text at halfway point for seamless crossfade
  setTimeout(() => {
    updateLanguageText(element, languageIndex);
    
    // Remove fade-out and add fade-in
    element.classList.remove('fade-out');
    element.classList.add('fade-in');
    
    // Clean up after animation
    setTimeout(() => {
      element.classList.remove('fade-in');
      isTransitioning = false;
    }, TRANSITION_DURATION);
    
  }, TRANSITION_DURATION / 2);
}

/**
 * Update language text and attributes
 * @param {HTMLElement} element - The text element to update
 * @param {number} languageIndex - Index of the language to display
 */
function updateLanguageText(element, languageIndex) {
  const language = LANGUAGES[languageIndex];
  
  element.textContent = language.text;
  element.setAttribute('lang', language.lang);
  element.setAttribute('aria-label', `${language.label}: ${language.text}`);
  
  console.log(`Language changed to: ${language.label} (${language.text})`);
}

/**
 * Stop multilingual animation
 */
function stopMultilingualAnimation() {
  if (animationInterval) {
    clearInterval(animationInterval);
    animationInterval = null;
    isTransitioning = false;
  }
}

/**
 * Handle motion preference changes
 */
function handleMotionPreferenceChange() {
  const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  
  mediaQuery.addListener((e) => {
    prefersReducedMotion = e.matches;
    
    const heroTextElement = document.getElementById('hero-text');
    if (!heroTextElement) return;
    
    if (prefersReducedMotion) {
      stopMultilingualAnimation();
      heroTextElement.textContent = LANGUAGES[0].text;
      heroTextElement.setAttribute('lang', LANGUAGES[0].lang);
      heroTextElement.classList.remove('fade-out', 'fade-in');
      heroTextElement.style.transition = '';
    } else {
      initEnhancedMultilingualAnimation();
    }
  });
}

// ===============================
// FIXED: HORIZONTAL EVENT GALLERY SYSTEM
// ===============================

/**
 * FIXED: Initialize scroll-triggered horizontal gallery
 */
function initEventGallery() {
  if (!GALLERY_ENABLED) return;
  
  // Check for reduced motion
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) {
    console.log('Reduced motion detected - gallery scroll disabled');
    return;
  }
  
  // Get gallery elements
  galleryState.sectionElement = document.getElementById('event-gallery');
  galleryState.containerElement = document.querySelector('.gallery-container');
  galleryState.trackElement = document.getElementById('gallery-track');
  
  if (!galleryState.sectionElement || !galleryState.containerElement || !galleryState.trackElement) {
    console.warn('Gallery elements not found');
    return;
  }
  
  // Wait for images to load, then initialize
  Promise.all(Array.from(galleryState.trackElement.querySelectorAll('img')).map(img => {
    return new Promise((resolve) => {
      if (img.complete) {
        resolve();
      } else {
        img.addEventListener('load', resolve, { once: true });
        img.addEventListener('error', resolve, { once: true });
      }
    });
  })).then(() => {
    setupGalleryDimensions();
    setupGalleryScrollListener();
    setupGalleryKeyboardNavigation();
    galleryState.isInitialized = true;
    console.log('Event gallery initialized successfully');
  });
}

/**
 * FIXED: Calculate gallery scroll dimensions
 */
function setupGalleryDimensions() {
  if (!galleryState.trackElement || !galleryState.containerElement || !galleryState.sectionElement) return;
  
  // Force layout calculation
  galleryState.containerElement.style.visibility = 'visible';
  
  // Calculate dimensions
  galleryState.trackWidth = galleryState.trackElement.scrollWidth;
  galleryState.containerWidth = galleryState.containerElement.clientWidth;
  galleryState.totalScrollDistance = Math.max(0, galleryState.trackWidth - galleryState.containerWidth);
  
  // Calculate section boundaries for pinning
  const rect = galleryState.sectionElement.getBoundingClientRect();
  const scrollTop = window.pageYOffset;
  galleryState.startOffset = scrollTop + rect.top - GALLERY_PIN_OFFSET;
  galleryState.endOffset = galleryState.startOffset + galleryState.sectionElement.offsetHeight - window.innerHeight;
  
  console.log('Gallery dimensions calculated:', {
    trackWidth: galleryState.trackWidth,
    containerWidth: galleryState.containerWidth,
    totalScrollDistance: galleryState.totalScrollDistance,
    startOffset: galleryState.startOffset,
    endOffset: galleryState.endOffset
  });
}

/**
 * FIXED: Set up scroll listener for gallery
 */
function setupGalleryScrollListener() {
  // Throttled scroll handler for smooth performance
  const throttledScrollHandler = throttle(updateGalleryPosition, 8); // ~120fps for ultra smooth
  window.addEventListener('scroll', throttledScrollHandler, { passive: true });
  
  // Handle window resize
  const debouncedResizeHandler = debounce(() => {
    if (galleryState.isInitialized) {
      setupGalleryDimensions();
    }
  }, 250);
  window.addEventListener('resize', debouncedResizeHandler);
}

/**
 * FIXED: Update gallery position based on scroll
 */
function updateGalleryPosition() {
  if (!galleryState.isInitialized || galleryState.totalScrollDistance <= 0) return;
  
  const scrollTop = window.pageYOffset;
  
  // Check if we're in the gallery section
  if (scrollTop >= galleryState.startOffset && scrollTop <= galleryState.endOffset) {
    if (!galleryState.isActive) {
      galleryState.isActive = true;
      galleryState.trackElement.style.willChange = 'transform';
    }
    
    // Calculate scroll progress (0 to 1)
    const sectionScrollDistance = galleryState.endOffset - galleryState.startOffset;
    const scrollProgress = (scrollTop - galleryState.startOffset) / sectionScrollDistance;
    const clampedProgress = Math.max(0, Math.min(1, scrollProgress));
    
    // Apply smooth easing
    const easedProgress = easeInOutQuad(clampedProgress);
    
    // Calculate horizontal offset
    const horizontalOffset = easedProgress * galleryState.totalScrollDistance * GALLERY_SCROLL_SENSITIVITY;
    
    // Apply transform
    galleryState.trackElement.style.transform = `translateX(-${horizontalOffset}px)`;
    
  } else {
    // Reset when outside gallery section
    if (galleryState.isActive) {
      galleryState.isActive = false;
      galleryState.trackElement.style.willChange = 'auto';
      
      // Set final position based on scroll direction
      if (scrollTop < galleryState.startOffset) {
        galleryState.trackElement.style.transform = 'translateX(0px)';
      } else {
        galleryState.trackElement.style.transform = `translateX(-${galleryState.totalScrollDistance * GALLERY_SCROLL_SENSITIVITY}px)`;
      }
    }
  }
}

/**
 * Smooth easing function for gallery movement
 * @param {number} t - Progress value (0-1)
 * @returns {number} - Eased value
 */
function easeInOutQuad(t) {
  return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
}

/**
 * ADDED: Keyboard navigation for gallery accessibility
 */
function setupGalleryKeyboardNavigation() {
  if (!galleryState.trackElement) return;
  
  const images = galleryState.trackElement.querySelectorAll('.gallery-image');
  
  images.forEach((img, index) => {
    // Add keyboard navigation
    img.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
        e.preventDefault();
        
        let nextIndex;
        if (e.key === 'ArrowLeft') {
          nextIndex = index > 0 ? index - 1 : images.length - 1;
        } else {
          nextIndex = index < images.length - 1 ? index + 1 : 0;
        }
        
        images[nextIndex].focus();
      }
    });
  });
}

// ===============================
// UTILITY FUNCTIONS
// ===============================

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

function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

function prefersReducedMotionCheck() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function smoothScrollTo(target, offset = 80) {
  const element = typeof target === 'string' ? document.querySelector(target) : target;
  
  if (!element) return;
  
  const targetPosition = element.offsetTop - offset;
  
  window.scrollTo({
    top: targetPosition,
    behavior: 'smooth'
  });
}

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function log(message, data = null) {
  if (console && console.log) {
    console.log(`[Enigma E-Cell] ${message}`, data || '');
  }
}

// ===============================
// NAVIGATION FUNCTIONALITY
// ===============================

function initNavigation() {
  log('Initializing navigation...');
  
  DOM.navbar = document.getElementById('navbar');
  DOM.navMenu = document.getElementById('nav-menu');
  DOM.mobileMenuBtn = document.getElementById('mobile-menu-btn');
  DOM.navLinks = document.querySelectorAll('.nav-link');
  
  if (!DOM.navbar || !DOM.navMenu || !DOM.mobileMenuBtn) {
    log('Navigation elements not found');
    return;
  }
  
  setupMobileMenu();
  setupNavigationLinks();
  setupScrollDetection();
  
  log('Navigation initialized successfully');
}

function setupMobileMenu() {
  DOM.mobileMenuBtn.addEventListener('click', toggleMobileMenu);
  
  document.addEventListener('click', (e) => {
    if (STATE.isNavOpen && 
        !DOM.navMenu.contains(e.target) && 
        !DOM.mobileMenuBtn.contains(e.target)) {
      closeMobileMenu();
    }
  });
  
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && STATE.isNavOpen) {
      closeMobileMenu();
      DOM.mobileMenuBtn.focus();
    }
  });
  
  window.addEventListener('resize', debounce(() => {
    if (window.innerWidth > 768 && STATE.isNavOpen) {
      closeMobileMenu();
    }
  }, 250));
}

function toggleMobileMenu() {
  if (STATE.isNavOpen) {
    closeMobileMenu();
  } else {
    openMobileMenu();
  }
}

function openMobileMenu() {
  STATE.isNavOpen = true;
  DOM.navMenu.classList.add('active');
  DOM.mobileMenuBtn.setAttribute('aria-expanded', 'true');
  DOM.mobileMenuBtn.classList.add('active');
  
  document.body.style.overflow = 'hidden';
  
  const firstNavLink = DOM.navMenu.querySelector('.nav-link');
  if (firstNavLink) {
    setTimeout(() => firstNavLink.focus(), 300);
  }
  
  log('Mobile menu opened');
}

function closeMobileMenu() {
  STATE.isNavOpen = false;
  DOM.navMenu.classList.remove('active');
  DOM.mobileMenuBtn.setAttribute('aria-expanded', 'false');
  DOM.mobileMenuBtn.classList.remove('active');
  
  document.body.style.overflow = '';
  
  log('Mobile menu closed');
}

function setupNavigationLinks() {
  DOM.navLinks.forEach(link => {
    link.addEventListener('click', handleNavigationClick);
  });
}

function handleNavigationClick(e) {
  e.preventDefault();
  
  const href = e.target.getAttribute('href');
  
  if (href && href.startsWith('#')) {
    const targetElement = document.querySelector(href);
    
    if (targetElement) {
      if (STATE.isNavOpen) {
        closeMobileMenu();
      }
      
      smoothScrollTo(targetElement);
      updateActiveNavLink(href);
      
      if (history.pushState) {
        history.pushState(null, null, href);
      }
      
      log(`Navigated to ${href}`);
    }
  }
}

function updateActiveNavLink(activeHref) {
  DOM.navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === activeHref) {
      link.classList.add('active');
    }
  });
}

function setupScrollDetection() {
  const handleScroll = throttle(() => {
    const scrolled = window.pageYOffset > 20;
    
    if (scrolled) {
      DOM.navbar.classList.add('scrolled');
    } else {
      DOM.navbar.classList.remove('scrolled');
    }
  }, 10);
  
  window.addEventListener('scroll', handleScroll, { passive: true });
}

// ===============================
// HERO SECTION FUNCTIONALITY
// ===============================

function initHeroAnimations() {
  log('Initializing hero animations...');
  
  DOM.scrollDown = document.getElementById('scroll-down');
  
  if (DOM.scrollDown) {
    DOM.scrollDown.addEventListener('click', () => {
      const aboutSection = document.getElementById('about');
      if (aboutSection) {
        smoothScrollTo(aboutSection);
      }
    });
  }
  
  log('Hero animations initialized successfully');
}

// ===============================
// STATISTICS COUNTER
// ===============================

function initStatsCounter() {
  const statNumbers = document.querySelectorAll('.stat-number');
  
  if (statNumbers.length === 0) return;
  
  const observerCallback = (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !STATE.statsAnimated) {
        STATE.statsAnimated = true;
        animateStats();
      }
    });
  };
  
  const observer = new IntersectionObserver(observerCallback, {
    threshold: 0.5,
    rootMargin: '0px 0px -100px 0px'
  });
  
  statNumbers.forEach(stat => observer.observe(stat));
}

function animateStats() {
  const statNumbers = document.querySelectorAll('.stat-number');
  
  statNumbers.forEach(stat => {
    const target = parseInt(stat.getAttribute('data-count'));
    const duration = 2000;
    const startTime = performance.now();
    
    function updateNumber(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      const easeOutCubic = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(target * easeOutCubic);
      
      stat.textContent = current;
      
      if (progress < 1) {
        requestAnimationFrame(updateNumber);
      } else {
        stat.textContent = target;
      }
    }
    
    requestAnimationFrame(updateNumber);
  });
}

// ===============================
// CONTACT FORM FUNCTIONALITY
// ===============================

function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;
  
  form.addEventListener('submit', handleFormSubmit);
  
  const inputs = form.querySelectorAll('.form-control');
  inputs.forEach(input => {
    input.addEventListener('blur', () => validateField(input));
    input.addEventListener('input', () => clearFieldError(input));
  });
}

function handleFormSubmit(e) {
  e.preventDefault();
  
  const form = e.target;
  const isValid = validateForm(form);
  
  if (!isValid) return;
  
  const submitBtn = document.getElementById('submit-btn');
  const btnText = submitBtn.querySelector('.btn-text');
  const btnLoading = submitBtn.querySelector('.btn-loading');
  
  submitBtn.disabled = true;
  submitBtn.classList.add('loading');
  btnText.style.display = 'none';
  btnLoading.style.display = 'block';
  
  setTimeout(() => {
    showSuccessMessage();
    form.reset();
    
    submitBtn.disabled = false;
    submitBtn.classList.remove('loading');
    btnText.style.display = 'block';
    btnLoading.style.display = 'none';
    
    const inputs = form.querySelectorAll('.form-control');
    inputs.forEach(input => {
      input.classList.remove('success', 'error');
    });
  }, 2000);
}

function validateForm(form) {
  const inputs = form.querySelectorAll('.form-control[required]');
  let isValid = true;
  
  inputs.forEach(input => {
    if (!validateField(input)) {
      isValid = false;
    }
  });
  
  return isValid;
}

function validateField(input) {
  const value = input.value.trim();
  const fieldName = input.name;
  let isValid = true;
  let errorMessage = '';
  
  if (!value) {
    errorMessage = `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} is required`;
    isValid = false;
  } else {
    switch (fieldName) {
      case 'email':
        if (!isValidEmail(value)) {
          errorMessage = 'Please enter a valid email address';
          isValid = false;
        }
        break;
      case 'name':
        if (value.length < 2) {
          errorMessage = 'Name must be at least 2 characters long';
          isValid = false;
        }
        break;
      case 'message':
        if (value.length < 10) {
          errorMessage = 'Message must be at least 10 characters long';
          isValid = false;
        }
        break;
    }
  }
  
  const errorElement = document.getElementById(`${fieldName}-error`);
  
  if (isValid) {
    input.classList.remove('error');
    input.classList.add('success');
    if (errorElement) {
      errorElement.textContent = '';
      errorElement.classList.remove('show');
    }
  } else {
    input.classList.remove('success');
    input.classList.add('error');
    if (errorElement) {
      errorElement.textContent = errorMessage;
      errorElement.classList.add('show');
    }
  }
  
  return isValid;
}

function clearFieldError(input) {
  const fieldName = input.name;
  const errorElement = document.getElementById(`${fieldName}-error`);
  
  if (input.classList.contains('error')) {
    input.classList.remove('error');
    if (errorElement) {
      errorElement.classList.remove('show');
    }
  }
}

function showSuccessMessage() {
  const successMessage = document.getElementById('success-message');
  if (successMessage) {
    successMessage.classList.add('show');
    
    setTimeout(() => {
      successMessage.classList.remove('show');
    }, 5000);
  }
}

// ===============================
// BACK TO TOP FUNCTIONALITY
// ===============================

function initBackToTop() {
  const backToTopBtn = document.getElementById('back-to-top');
  if (!backToTopBtn) return;
  
  const handleScroll = throttle(() => {
    const scrolled = window.pageYOffset;
    
    if (scrolled > 300) {
      backToTopBtn.classList.add('show');
    } else {
      backToTopBtn.classList.remove('show');
    }
  }, 100);
  
  window.addEventListener('scroll', handleScroll, { passive: true });
  
  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

// ===============================
// INTERSECTION OBSERVER ANIMATIONS
// ===============================

function initScrollAnimations() {
  const animatedElements = document.querySelectorAll('.fade-in-up, .fade-in-left, .fade-in-right');
  
  if (animatedElements.length === 0) return;
  
  const observerCallback = (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  };
  
  const observer = new IntersectionObserver(observerCallback, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });
  
  animatedElements.forEach(element => {
    observer.observe(element);
  });
}

// ===============================
// MAIN INITIALIZATION
// ===============================

/**
 * FIXED: Main initialization with proper error handling
 */
function init() {
  log('Initializing Enhanced Enigma E-Cell website...');
  
  // Check for reduced motion preference
  STATE.reducedMotion = prefersReducedMotionCheck();
  
  // Cache DOM elements
  DOM.body = document.body;
  DOM.html = document.documentElement;
  
  try {
    // Initialize multilingual animation
    initEnhancedMultilingualAnimation();
    handleMotionPreferenceChange();
    
    // FIXED: Initialize gallery with proper error handling
    initEventGallery();
    
    // Initialize existing functionality
    initNavigation();
    initHeroAnimations();
    initStatsCounter();
    initContactForm();
    initBackToTop();
    initScrollAnimations();
    
    log('Website initialization complete');
  } catch (error) {
    console.error('Error during initialization:', error);
    // Graceful fallback
    initNavigation();
    initContactForm();
  }
}

// ===============================
// EVENT LISTENERS
// ===============================

document.addEventListener('DOMContentLoaded', init);

// Handle page visibility changes
document.addEventListener('visibilitychange', () => {
  if (document.hidden) {
    stopMultilingualAnimation();
  } else {
    if (!prefersReducedMotion) {
      initEnhancedMultilingualAnimation();
    }
  }
});

// Enhanced window resize handler
window.addEventListener('resize', debounce(() => {
  if (window.innerWidth > 768 && STATE.isNavOpen) {
    closeMobileMenu();
  }
  
  // Recalculate gallery dimensions on resize
  if (galleryState.isInitialized) {
    setupGalleryDimensions();
  }
}, 250));

// Cleanup on page unload
window.addEventListener('beforeunload', () => {
  stopMultilingualAnimation();
});

/* 
 * ACCESSIBILITY NOTES:
 * - Multilingual animation respects prefers-reduced-motion with instant text changes
 * - Screen reader friendly with aria-live="polite" and aria-atomic="true"
 * - Gallery degrades to vertical layout for reduced motion users
 * - Keyboard navigation supported for gallery images with arrow keys
 * - All scroll effects are performance optimized with proper throttling
 */
