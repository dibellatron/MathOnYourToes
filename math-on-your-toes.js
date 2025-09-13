// Math on Your Toes - Interactive Features and Accessibility

document.addEventListener('DOMContentLoaded', function() {
    // Accessibility Controls
    initializeAccessibilityControls();
    
    // Easter Egg Accommodation Request
    initializeAccommodationRequest();
    
    // Keyboard Navigation
    initializeKeyboardNavigation();
    
    // Video Accessibility
    initializeVideoAccessibility();
    
    // Smooth Scrolling for Internal Links
    initializeSmoothScrolling();
});

function initializeAccessibilityControls() {
    const highContrastToggle = document.getElementById('high-contrast-toggle');
    const fontSizeToggle = document.getElementById('font-size-toggle');
    const sitStandToggle = document.getElementById('sit-stand-toggle');
    
    // High Contrast Toggle
    if (highContrastToggle) {
        highContrastToggle.addEventListener('click', function() {
            document.body.classList.toggle('high-contrast');
            const isHighContrast = document.body.classList.contains('high-contrast');
            
            // Store preference
            localStorage.setItem('high-contrast', isHighContrast);
            
            // Update button text
            highContrastToggle.setAttribute('aria-pressed', isHighContrast);
            
            // Announce change to screen readers
            announceToScreenReader(isHighContrast ? 'High contrast mode enabled' : 'High contrast mode disabled');
        });
        
        // Load saved preference
        if (localStorage.getItem('high-contrast') === 'true') {
            document.body.classList.add('high-contrast');
            highContrastToggle.setAttribute('aria-pressed', 'true');
        }
    }
    
    // Font Size Toggle
    if (fontSizeToggle) {
        fontSizeToggle.addEventListener('click', function() {
            document.body.classList.toggle('large-font');
            const isLargeFont = document.body.classList.contains('large-font');
            
            // Store preference
            localStorage.setItem('large-font', isLargeFont);
            
            // Update button text
            fontSizeToggle.setAttribute('aria-pressed', isLargeFont);
            fontSizeToggle.textContent = isLargeFont ? 'A-' : 'A+';
            
            // Announce change to screen readers
            announceToScreenReader(isLargeFont ? 'Large font mode enabled' : 'Large font mode disabled');
        });
        
        // Load saved preference
        if (localStorage.getItem('large-font') === 'true') {
            document.body.classList.add('large-font');
            fontSizeToggle.setAttribute('aria-pressed', 'true');
            fontSizeToggle.textContent = 'A-';
        }
    }
    
    // Sit/Stand Toggle (Satirical)
    if (sitStandToggle) {
        sitStandToggle.addEventListener('click', function() {
            const currentPreference = sitStandToggle.getAttribute('data-preference') || 'standing';
            const newPreference = currentPreference === 'standing' ? 'sitting' : 'standing';
            
            sitStandToggle.setAttribute('data-preference', newPreference);
            sitStandToggle.textContent = newPreference === 'sitting' ? '🪑' : '🕴️';
            sitStandToggle.setAttribute('aria-label', `Currently set to ${newPreference} preference (satirical)`);
            
            // Show a humorous message
            showSatiricalMessage(newPreference);
        });
    }
}

function showSatiricalMessage(preference) {
    const message = preference === 'sitting' 
        ? 'Accommodation approved! No documentation needed. We trust you know your needs.'
        : 'Standing preference noted. Please remember: your physical position does not determine your worth or engagement!';
    
    announceToScreenReader(message);
    
    // Create temporary toast message
    const toast = document.createElement('div');
    toast.className = 'satirical-toast';
    toast.textContent = message;
    toast.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: var(--accessibility-blue);
        color: white;
        padding: 1rem;
        border-radius: 8px;
        max-width: 300px;
        z-index: 1001;
        animation: slideIn 0.3s ease-out;
    `;
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateX(100%)';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}


function initializeAccommodationRequest() {
    const requestButton = document.getElementById('accommodation-request');
    const responseDiv = document.getElementById('accommodation-response');
    
    if (requestButton && responseDiv) {
        requestButton.addEventListener('click', function() {
            responseDiv.classList.remove('hidden');
            requestButton.style.display = 'none';
            
            // Announce to screen readers
            announceToScreenReader('Accommodation automatically approved. No documentation needed. We trust you know your needs.');
            
            // Focus the response for screen readers
            responseDiv.setAttribute('tabindex', '-1');
            responseDiv.focus();
        });
    }
}


function initializeKeyboardNavigation() {
    // Add keyboard support for cards and interactive elements
    const cards = document.querySelectorAll('.resource-card, .myth-item, .reality-item');
    
    cards.forEach(card => {
        const link = card.querySelector('a');
        if (link) {
            card.setAttribute('tabindex', '0');
            card.addEventListener('keydown', function(e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    link.click();
                }
            });
        }
    });
    
    // Add skip links for main sections
    addSkipLinks();
}

function addSkipLinks() {
    const sections = ['video', 'context', 'research', 'lyrics', 'resources'];
    const nav = document.createElement('nav');
    nav.setAttribute('aria-label', 'Section navigation');
    nav.className = 'section-nav';
    nav.style.cssText = `
        position: fixed;
        top: 60px;
        left: 6px;
        z-index: 999;
        background: white;
        padding: 10px;
        border-radius: 5px;
        box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        transform: translateX(-100%);
        transition: transform 0.3s;
    `;
    
    const list = document.createElement('ul');
    list.style.cssText = 'list-style: none; margin: 0; padding: 0;';
    
    sections.forEach(section => {
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.href = `#${section}`;
        a.textContent = `Skip to ${section.charAt(0).toUpperCase() + section.slice(1)}`;
        a.style.cssText = 'display: block; padding: 5px 0; text-decoration: none; color: var(--accessibility-blue);';
        
        a.addEventListener('focus', () => {
            nav.style.transform = 'translateX(0)';
        });
        
        a.addEventListener('blur', () => {
            setTimeout(() => {
                if (!nav.contains(document.activeElement)) {
                    nav.style.transform = 'translateX(-100%)';
                }
            }, 100);
        });
        
        li.appendChild(a);
        list.appendChild(li);
    });
    
    nav.appendChild(list);
    document.body.appendChild(nav);
}

function initializeVideoAccessibility() {
    const video = document.getElementById('main-video');
    
    if (video) {
        // Add keyboard shortcuts for video control
        video.addEventListener('keydown', function(e) {
            switch(e.key) {
                case ' ':
                    e.preventDefault();
                    if (video.paused) {
                        video.play();
                        announceToScreenReader('Video playing');
                    } else {
                        video.pause();
                        announceToScreenReader('Video paused');
                    }
                    break;
                case 'ArrowLeft':
                    e.preventDefault();
                    video.currentTime = Math.max(0, video.currentTime - 10);
                    announceToScreenReader('Rewound 10 seconds');
                    break;
                case 'ArrowRight':
                    e.preventDefault();
                    video.currentTime = Math.min(video.duration, video.currentTime + 10);
                    announceToScreenReader('Fast forwarded 10 seconds');
                    break;
                case 'ArrowUp':
                    e.preventDefault();
                    video.volume = Math.min(1, video.volume + 0.1);
                    announceToScreenReader(`Volume: ${Math.round(video.volume * 100)}%`);
                    break;
                case 'ArrowDown':
                    e.preventDefault();
                    video.volume = Math.max(0, video.volume - 0.1);
                    announceToScreenReader(`Volume: ${Math.round(video.volume * 100)}%`);
                    break;
                case 'f':
                    e.preventDefault();
                    if (video.requestFullscreen) {
                        video.requestFullscreen();
                        announceToScreenReader('Entering fullscreen');
                    }
                    break;
                case 'Escape':
                    if (document.fullscreenElement) {
                        document.exitFullscreen();
                        announceToScreenReader('Exiting fullscreen');
                    }
                    break;
            }
        });
        
        // Add video event listeners for accessibility announcements
        video.addEventListener('loadstart', () => announceToScreenReader('Video loading'));
        video.addEventListener('canplay', () => announceToScreenReader('Video ready to play'));
        video.addEventListener('ended', () => announceToScreenReader('Video ended'));
    }
}

function initializeSmoothScrolling() {
    // Add smooth scrolling to all internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Focus management for accessibility
                target.setAttribute('tabindex', '-1');
                target.focus();
            }
        });
    });
}

function announceToScreenReader(message) {
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', 'polite');
    announcement.setAttribute('aria-atomic', 'true');
    announcement.className = 'sr-only';
    announcement.textContent = message;
    
    document.body.appendChild(announcement);
    
    // Remove after announcement
    setTimeout(() => {
        document.body.removeChild(announcement);
    }, 1000);
}

// Analytics (Privacy-Friendly)
function trackPageView() {
    // Only track basic page views, no personal data
    if (window.gtag) {
        gtag('event', 'page_view', {
            page_title: 'Math on Your Toes',
            page_location: window.location.href
        });
    }
}

function trackVideoEngagement(action) {
    if (window.gtag) {
        gtag('event', 'video_engagement', {
            event_category: 'Video',
            event_label: action
        });
    }
}

// Initialize analytics
document.addEventListener('DOMContentLoaded', function() {
    trackPageView();
    
    const video = document.getElementById('main-video');
    if (video) {
        video.addEventListener('play', () => trackVideoEngagement('play'));
        video.addEventListener('pause', () => trackVideoEngagement('pause'));
        video.addEventListener('ended', () => trackVideoEngagement('complete'));
    }
});

// Performance optimization: Lazy load non-critical content
function initializeLazyLoading() {
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
}

// Error handling
window.addEventListener('error', function(e) {
    console.error('Error occurred:', e.error);
    
    // Show user-friendly error message for critical failures
    if (e.error && e.error.message) {
        announceToScreenReader('An error occurred. Please refresh the page or contact support if the problem persists.');
    }
});

// Initialize everything when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    initializeLazyLoading();
    
    // Add version info to console (for debugging)
    console.log('Math on Your Toes v1.0.0 - Satirical Musical About Ableism in Education');
    console.log('If you\'re seeing this, you might be a developer! Consider contributing to inclusive education.');
});