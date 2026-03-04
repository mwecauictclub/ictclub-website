// Main JavaScript for MWECAU ICT Club Website

// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', () => {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
            
            // Toggle icon
            const icon = mobileMenuBtn.querySelector('[data-lucide]');
            if (icon) {
                const isMenuIcon = icon.getAttribute('data-lucide') === 'menu';
                icon.setAttribute('data-lucide', isMenuIcon ? 'x' : 'menu');
                lucide.createIcons();
            }
        });
    }
});

// GSAP Animations
gsap.registerPlugin(ScrollTrigger);

// Navbar animation on scroll
const navbar = document.getElementById('navbar');
if (navbar) {
    gsap.from(navbar, {
        y: -100,
        opacity: 0,
        duration: 0.5,
        ease: 'power2.out'
    });
}

// Utility function for error handling
function showError(containerId, message) {
    const container = document.getElementById(containerId);
    if (container) {
        container.innerHTML = `
            <div class="col-span-3 text-center py-12">
                <i data-lucide="alert-circle" class="w-12 h-12 text-red-500 mx-auto mb-4"></i>
                <p class="text-text-muted">${message}</p>
            </div>
        `;
        lucide.createIcons();
    }
}

// Loading spinner
function showLoading(containerId) {
    const container = document.getElementById(containerId);
    if (container) {
        container.innerHTML = `
            <div class="col-span-3 text-center py-12">
                <div class="inline-block w-8 h-8 border-4 border-orange border-t-transparent rounded-full animate-spin"></div>
                <p class="text-text-muted mt-4">Loading...</p>
            </div>
        `;
    }
}
