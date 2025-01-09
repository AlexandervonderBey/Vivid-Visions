// Mobile menu functionality
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileMenu = document.getElementById('mobileMenu');

mobileMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
});

// Search functionality
const searchBtn = document.getElementById('searchBtn');
const searchBar = document.getElementById('searchBar');

searchBtn.addEventListener('click', () => {
    searchBar.classList.toggle('hidden');
});

// Close search bar when clicking outside
document.addEventListener('click', (e) => {
    if (!searchBtn.contains(e.target) && !searchBar.contains(e.target)) {
        searchBar.classList.add('hidden');
    }
});

// Dark mode toggle with localStorage
const darkModeBtn = document.getElementById('darkModeBtn');

// Check for saved dark mode preference
if (localStorage.getItem('darkMode') === 'enabled') {
    document.documentElement.classList.add('dark');
}

darkModeBtn.addEventListener('click', () => {
    if (document.documentElement.classList.contains('dark')) {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('darkMode', 'disabled');
    } else {
        document.documentElement.classList.add('dark');
        localStorage.setItem('darkMode', 'enabled');
    }
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!mobileMenuBtn.contains(e.target) && !mobileMenu.contains(e.target)) {
        mobileMenu.classList.add('hidden');
    }
});

// Login button (placeholder)
const loginBtn = document.getElementById('loginBtn');

loginBtn.addEventListener('click', () => {
    alert('Login functionality coming soon!');
});

// Slideshow functionality
const slides = [
    {
        image: 'images/boundless-abstraction.webp',
        title: 'Boundless Dimensions by Artie G. T.',
        duration: 'April 5,2025 - July 5, 2025',
        description: '„Boundless Dimensions“ invites viewers to explore the fusion of emotions, technology, and abstraction. Artie G. T. transforms universal themes into expressive works, inspiring curiosity and personal interpretation.'
    },
    {
        image: 'images/stories-in-strokes.webp',
        title: 'Stories in Strokes by Linea Verve',
        duration: 'August 5, 2025 – November 5, 2025',
        description: '„Stories in Strokes“ celebrates simplicity and expression through hand-drawn sketches by Linea Verve. Each artwork captures raw emotions and ideas with minimal lines, leaving space for imagination and interpretation.'
    },
    {
        image: 'images/fruitscapes.webp',
        title: 'Fruitscapes by Chroma Terra',
        duration: 'August 5, 2025 – November 5, 2025',
        description: '„Fruitscapes“ transforms the ordinary into the extraordinary. Chroma Terra captures the essence of bananas and persimmons through abstract, textured compositions that celebrate the beauty of simplicity and form.'
    },
    {
        image: 'images/tides-and-tales.webp',
        title: 'Tides and Tales by Marin A. Brush',
        duration: 'December 5, 2025 – March 5, 2026',
        description: '„Tides and Tales“ explores the resilience and solitude of seafarers, brought to life by Marin A. Brush’s expressive oil paintings. The artworks capture the moods of the sea and its people with rich textures and earthy tones.'
    }
];

let currentSlide = 0;
const slideshow = document.getElementById('slideshow');
const slideInfo = document.getElementById('slideInfo');
const prevSlide = document.getElementById('prevSlide');
const nextSlide = document.getElementById('nextSlide');
const slideIndicators = document.getElementById('slideIndicators');

// Initialize slideshow
function initializeSlideshow() {
    // Create indicators
    slides.forEach((_, index) => {
        const dot = document.createElement('button');
        dot.className = `w-4 h-4 rounded-full transition-colors ${
            index === 0 ? 'bg-primary' : 'bg-white/50'
        }`;
        dot.onclick = () => goToSlide(index);
        slideIndicators.appendChild(dot);
    });
    updateSlide();
}

function updateSlide() {
    // Update image with fade trabsition
    slideshow.style.opacity = '0';
    setTimeout(() => {
        slideshow.style.backgroundImage = `url(${slides[currentSlide].image})`;
        slideshow.style.backgroundSize = 'cover';
        slideshow.style.backgroundPosition = 'center';
        slideshow.style.opacity = '1';
    }, 700);

    // Update text
    const title = slideInfo.querySelector('h2');
    const duration = slideInfo.querySelector('h2 + p');
    const description = slideInfo.querySelector('.text-xl');
    title.textContent = slides[currentSlide].title;
    duration.textContent = slides[currentSlide].duration;
    description.textContent = slides[currentSlide].description;

    // Update indicators
    Array.from(slideIndicators.children).forEach((dot, index) => {
        dot.className = `w-4 h-4 rounded-full transition-colors ${
            index === currentSlide ? 'bg-primary' : 'bg-white/100'
        }`;
    });
}

function goToSlide(index) {
    currentSlide = index;
    updateSlide();
}

function nextSlideHandler() {
    currentSlide = (currentSlide + 1) % slides.length;
    updateSlide();
}

function prevSlideHandler() {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    updateSlide();
}

// Event listeners
prevSlide.addEventListener('click', prevSlideHandler);
nextSlide.addEventListener('click', nextSlideHandler);

// Increase slide duration to 8 seconds
let slideInterval = setInterval(nextSlideHandler, 8000);

// Pause auto-advance on hover
slideshow.parentElement.addEventListener('mouseenter', () => {
    clearInterval(slideInterval);
});

slideshow.parentElement.addEventListener('mouseleave', () => {
    slideInterval = setInterval(nextSlideHandler, 8000);
});

// Initialize slideshow on page load
initializeSlideshow();

// Header scroll functionality
const header = document.getElementById('header');
let lastScroll = 0;

function updateHeader() {
    const currentScroll = window.scrollY;
    
    if (currentScroll <= 0) {
        // At the top
        header.classList.remove('bg-white/70', 'dark:bg-gray-900/70', 'shadow-md');
        header.classList.add('bg-transparent');
    } else if (currentScroll > lastScroll) {
        // Scrolling down
        header.classList.remove('bg-transparent');
        header.classList.add('bg-white/70', 'dark:bg-gray-900/70', 'shadow-md');
    } else {
        // Scrolling up
        header.classList.remove('bg-transparent');
        header.classList.add('bg-white/70', 'dark:bg-gray-900/70', 'shadow-md');
    }
    
    lastScroll = currentScroll;
}

window.addEventListener('scroll', updateHeader);
updateHeader(); // Initial call
