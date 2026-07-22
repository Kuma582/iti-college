/**
 * Excellence ITI - Modular UI Components Loader
 * Dynamically injects Header, Footer, Modals, and Floating Widgets
 * Manages Responsive Interactions (Mobile Navigation, Modals, Chatbot)
 */

(function () {
    // 1. Detect current page to highlight active nav links
    const currentPath = window.location.pathname;
    const currentPage = currentPath.substring(currentPath.lastIndexOf('/') + 1) || 'index.html';

    // Helper: generate class lists for active vs inactive menu links
    function getNavLinkClass(linkPage) {
        const isActive = currentPage === linkPage || (currentPage === '' && linkPage === 'index.html');
        if (isActive) {
            return "text-brandBlue dark:text-brandGold border-b-2 border-brandBlue dark:border-brandGold pb-1 font-bold";
        }
        return "hover:text-brandBlue dark:hover:text-brandGold transition-colors pb-1 border-b-2 border-transparent hover:border-brandGold text-slate-700 dark:text-slate-300";
    }

    // Template: Top Information Bar + Main Mega Nav
    function getHeaderHTML() {
        return `
            <!-- Top Information Bar -->
            <div class="bg-brandBlue text-white text-[11px] md:text-xs py-2 px-6 flex flex-col md:flex-row justify-between items-center border-b border-brandGold/50">
                <div class="flex gap-4">
                    <span><i class="fa-solid fa-phone mr-1 text-brandGold"></i> <span class="cms-phone">+91-6209303249</span></span>
                    <span><i class="fa-solid fa-envelope mr-1 text-brandGold"></i><span class="cms-email">anmolsharma8783@gmail.com</span></span>
                </div>
                <!-- Mobile 360 Tour Button (Replaces codes on phone) -->
                <div class="flex md:hidden mt-2.5 w-full justify-center">
                    <a href="#" id="mobile-tour-trigger" class="bg-brandGold text-slate-900 px-6 py-1.5 rounded-full text-[11px] font-bold hover:bg-yellow-400 transition-all flex items-center gap-2 shadow-sm shadow-brandGold/20 animate-pulse">
                        <i class="fa-solid fa-vr-cardboard"></i> 360° Virtual Campus Tour
                    </a>
                </div>
                
                <!-- Desktop Affiliation Codes -->
                <div class="hidden md:flex gap-4 mt-2 md:mt-0 font-medium tracking-wide">
                    <span>NCVT Affiliated: DGET-6/24/2024-TC</span>
                    <span class="text-brandGold font-bold">AISHE CODE: C-54321</span>
                </div>
            </div>

            <!-- Sticky Header & Mega Nav -->
            <div class="bg-white/70 dark:bg-slate-900/70 backdrop-blur-md border-b border-white/50 dark:border-slate-800/50 sticky top-0 z-50 shadow-sm transition-all duration-300">
                <div class="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
                    <!-- Logo -->
                    <a href="index.html" class="flex items-center gap-3 group">
                        <div class="w-12 h-12 bg-gradient-to-br from-brandBlue to-blue-800 rounded-2xl flex items-center justify-center text-white font-bold text-2xl shadow-soft group-hover:shadow-glow transition-all duration-300 border border-brandGold/20">
                            <i class="fa-solid fa-bolt text-brandGold"></i>
                        </div>
                        <div>
                            <h1 class="text-xl font-poppins font-bold text-brandBlue dark:text-white tracking-tight leading-none group-hover:text-blue-700 transition">
                                EXCELLENCE ITI</h1>
                            <span class="text-[10px] text-slate-500 dark:text-slate-400 font-semibold tracking-widest uppercase">Industrial Training Institute</span>
                        </div>
                    </a>

                    <!-- Desktop Nav -->
                    <nav class="hidden lg:flex items-center gap-4 xl:gap-6 font-semibold text-sm">
                        <a href="index.html" class="${getNavLinkClass('index.html')}">Home</a>
                        <a href="about.html" class="${getNavLinkClass('about.html')}">About Us</a>
                        <a href="courses.html" class="${getNavLinkClass('courses.html')}">Courses</a>
                        <a href="admission.html" class="${getNavLinkClass('admission.html')}">Admission</a>
                        <a href="placement.html" class="${getNavLinkClass('placement.html')}">Placement Cell</a>
                        <a href="faculty.html" class="${getNavLinkClass('faculty.html')}">Faculty</a>
                        <a href="facilities.html" class="${getNavLinkClass('facilities.html')}">Facilities</a>
                        <a href="gallery.html" class="${getNavLinkClass('gallery.html')}">Gallery</a>
                        <a href="student-corner.html" class="${getNavLinkClass('student-corner.html')}">Notice</a>
                        <a href="contact.html" class="${getNavLinkClass('contact.html')}">Contact</a>
                    </nav>

                    <!-- Login CTA -->
                    <div class="hidden lg:block" id="desktop-login-cta-container">
                        <a href="login.html" class="bg-brandBlue dark:bg-brandGold text-white dark:text-slate-900 text-sm font-semibold px-6 py-2.5 rounded-full hover:bg-blue-800 dark:hover:bg-yellow-400 transition-all shadow-soft hover:shadow-lg border border-brandBlue dark:border-brandGold flex items-center gap-2">
                            <i class="fa-solid fa-user-shield"></i> MIS Login
                        </a>
                    </div>

                    <!-- Mobile Menu Toggle Button -->
                    <button id="mobile-menu-hamburger" class="lg:hidden text-2xl text-brandBlue dark:text-white hover:text-brandGold transition-colors">
                        <i class="fa-solid fa-bars"></i>
                    </button>
                </div>
            </div>
        `;
    }

    // Template: Shared Footer Component
    function getFooterHTML() {
        return `
            <div class="max-w-7xl mx-auto grid md:grid-cols-4 gap-12 mb-12">
                <div class="space-y-6 md:col-span-1">
                    <a href="index.html" class="flex items-center gap-3">
                        <div class="w-10 h-10 bg-gradient-to-br from-brandBlue to-blue-800 rounded-xl flex items-center justify-center text-white font-bold text-xl border border-brandGold/20">
                            <i class="fa-solid fa-bolt text-brandGold"></i>
                        </div>
                        <div>
                            <h1 class="text-lg font-poppins font-bold text-white tracking-tight leading-none">EXCELLENCE ITI</h1>
                        </div>
                    </a>
                    <p class="text-sm leading-relaxed">Central India's leading NCVT affiliated industrial training institute, creating the workforce of tomorrow.</p>
                    <div class="flex gap-4">
                        <a href="#" class="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-brandBlue hover:text-white transition-colors"><i class="fa-brands fa-facebook-f"></i></a>
                        <a href="#" class="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-brandBlue hover:text-white transition-colors"><i class="fa-brands fa-twitter"></i></a>
                        <a href="#" class="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-brandBlue hover:text-white transition-colors"><i class="fa-brands fa-instagram"></i></a>
                        <a href="#" class="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-brandBlue hover:text-white transition-colors"><i class="fa-brands fa-linkedin-in"></i></a>
                    </div>
                </div>

                <div>
                    <h4 class="text-white font-bold mb-6 text-lg font-poppins">Quick Links</h4>
                    <ul class="space-y-3 text-sm">
                        <li><a href="about.html" class="hover:text-brandGold transition-colors">About Institute</a></li>
                        <li><a href="courses.html" class="hover:text-brandGold transition-colors">Available Trades</a></li>
                        <li><a href="admission.html" class="hover:text-brandGold transition-colors">Admission 2026</a></li>
                        <li><a href="faculty.html" class="hover:text-brandGold transition-colors">Our Faculty</a></li>
                        <li><a href="contact.html" class="hover:text-brandGold transition-colors">Contact Us</a></li>
                    </ul>
                </div>

                <div>
                    <h4 class="text-white font-bold mb-6 text-lg font-poppins">Student Resources</h4>
                    <ul class="space-y-3 text-sm">
                        <li><a href="student-corner.html" class="hover:text-brandGold transition-colors">Notice Board</a></li>
                        <li><a href="facilities.html" class="hover:text-brandGold transition-colors">Campus Facilities</a></li>
                        <li><a href="placement.html" class="hover:text-brandGold transition-colors">Placement Cell</a></li>
                        <li><a href="gallery.html" class="hover:text-brandGold transition-colors">Photo Gallery</a></li>
                        <li><a href="calendar.html" class="hover:text-brandGold transition-colors">Academic Calendar</a></li>
                        <li><a href="downloads.html" class="hover:text-brandGold transition-colors">Downloads & Syllabus</a></li>
                        <li><a href="login.html" class="hover:text-brandGold transition-colors">MIS Portal Login</a></li>
                    </ul>
                </div>

                <div>
                    <h4 class="text-white font-bold mb-6 text-lg font-poppins">Contact Info</h4>
                    <ul class="space-y-4 text-sm">
                        <li class="flex items-start gap-3">
                            <i class="fa-solid fa-location-dot mt-1 text-brandGold"></i>
                            <span class="cms-address">Excellence ITI Campus, Main Industrial Estate, City - 400001</span>
                        </li>
                        <li class="flex items-center gap-3">
                            <i class="fa-solid fa-phone text-brandGold"></i>
                            <span class="cms-phone">+91-6209303249</span>
                        </li>
                        <li class="flex items-center gap-3">
                            <i class="fa-solid fa-envelope text-brandGold"></i>
                            <span class="cms-email">admissions@excellenceiti.com</span>
                        </li>
                    </ul>
                </div>
            </div>

            <div class="max-w-7xl mx-auto pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-medium text-slate-500">
                <p>&copy; 2026 Excellence ITI. All Rights Reserved. Designed with <i class="fa-solid fa-heart text-red-500 mx-1"></i></p>
                <div class="flex gap-6">
                    <a href="#" class="hover:text-white transition">Privacy Policy</a>
                    <a href="#" class="hover:text-white transition">Terms of Service</a>
                </div>
            </div>
        `;
    }

    // Template: Shared floating buttons, AI Chat window, and Modals
    function getWidgetsHTML() {
        return `
            <!-- Floating Admission Enquiry (Right Side) -->
            <a href="tel:+916209303249" class="cms-phone-link fixed right-0 top-1/3 -translate-y-1/2 z-[80] flex flex-col shadow-[-5px_5px_20px_rgba(0,0,0,0.2)] hover:-translate-x-2 transition-transform duration-300 rounded-l-xl overflow-hidden group cursor-pointer hidden sm:flex">
                <div class="bg-yellow-400 text-brandBlue font-black text-sm md:text-base px-6 py-2 text-center shadow-sm">
                    For Admission Enquiry
                </div>
                <div class="bg-brandBlue text-white font-black text-base md:text-lg px-6 py-3 text-center cms-phone">
                    +91-6209303249
                </div>
            </a>

            <!-- Floating Contact (WhatsApp + AI Bot) -->
            <div class="fixed bottom-6 right-6 z-[90] flex flex-col gap-4">
                <!-- AI Assistant Bot -->
                <button id="btn-ai-bot" class="w-14 h-14 bg-slate-900 text-white rounded-full shadow-glow flex items-center justify-center text-2xl transition-transform hover:scale-110 active:scale-95 group relative" title="Ask AI">
                    <i class="fa-solid fa-robot group-hover:animate-bounce"></i>
                    <span class="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></span>
                </button>

                <!-- WhatsApp -->
                <a href="https://wa.me/916209303249" target="_blank" class="cms-wa-link w-14 h-14 bg-green-500 text-white rounded-full shadow-[0_0_15px_rgba(34,197,94,0.4)] flex items-center justify-center text-3xl transition-transform hover:scale-110 active:scale-95 group" title="Chat on WhatsApp">
                    <i class="fa-brands fa-whatsapp"></i>
                </a>
            </div>

            <!-- AI Chat Window -->
            <div id="ai-chat-window" class="fixed bottom-24 right-6 sm:right-24 z-[100] w-[calc(100vw-32px)] sm:w-96 bg-white border border-slate-200 rounded-2xl shadow-2xl opacity-0 invisible transform translate-y-4 transition-all duration-300 flex flex-col overflow-hidden">
                <div class="bg-slate-900 p-4 text-white flex justify-between items-center">
                    <div class="flex items-center gap-2">
                        <div class="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center border border-slate-700">
                            <i class="fa-solid fa-robot text-brandGold text-lg"></i>
                        </div>
                        <div>
                            <h4 class="font-bold text-sm leading-tight">Excellence AI</h4>
                            <span class="text-[10px] text-green-400 flex items-center gap-1"><span class="w-1.5 h-1.5 bg-green-400 rounded-full"></span> Online</span>
                        </div>
                    </div>
                    <button id="close-ai-chat" class="text-slate-400 hover:text-white transition w-8 h-8 flex items-center justify-center rounded-full hover:bg-slate-800"><i class="fa-solid fa-xmark text-lg"></i></button>
                </div>
                <div class="p-4 h-72 overflow-y-auto bg-slate-50 flex flex-col gap-4" id="ai-chat-body">
                    <div class="bg-white p-3 rounded-tr-xl rounded-b-xl shadow-sm self-start max-w-[85%] border border-slate-100">
                        <p class="text-sm text-slate-700">Hi there! 👋 I'm Excellence AI. How can I assist you with admissions, trades, or campus information today?</p>
                    </div>
                </div>
                <div class="p-3 bg-white border-t border-slate-100 flex gap-2">
                    <input type="text" id="ai-chat-input" placeholder="Type your query..." class="flex-1 bg-slate-100 text-slate-800 text-sm rounded-full px-4 outline-none border border-transparent focus:border-brandBlue/50 transition">
                    <button id="ai-chat-send" class="w-10 h-10 rounded-full bg-brandBlue text-white flex items-center justify-center shrink-0 hover:bg-blue-800 transition shadow-sm"><i class="fa-solid fa-paper-plane text-sm relative -left-0.5"></i></button>
                </div>
            </div>

            <!-- 360 Virtual Tour Modal -->
            <div id="tour-modal" class="fixed inset-0 z-[500] bg-black/95 backdrop-blur-sm opacity-0 invisible hidden transition-all duration-300 flex items-center justify-center p-4 lg:p-10">
                <div class="relative w-full max-w-6xl h-[70vh] lg:h-[85vh] bg-slate-900 rounded-2xl overflow-hidden shadow-2xl border border-white/20">
                    <div class="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-black/80 to-transparent z-10 flex justify-between items-center px-6 pointer-events-none">
                        <h3 class="text-white font-bold text-lg drop-shadow-md flex items-center gap-2"><i class="fa-solid fa-vr-cardboard text-brandGold"></i> 360° Virtual Campus Tour</h3>
                    </div>
                    <button id="close-tour-modal" class="absolute top-4 right-4 z-20 w-10 h-10 bg-white/20 hover:bg-red-500 rounded-full flex items-center justify-center text-white transition-all backdrop-blur-md shadow-lg border border-white/30">
                        <i class="fa-solid fa-times text-xl"></i>
                    </button>
                    <iframe id="tour-iframe" width="100%" height="100%" src="https://www.youtube.com/embed/f2vC4X9K-5E?rel=0&modestbranding=1" title="360 Virtual Tour" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; xr-spatial-tracking" allowfullscreen class="absolute inset-0"></iframe>
                </div>
            </div>

            <!-- Onload Admission Popup Modal -->
            <div id="admission-popup" class="fixed inset-0 z-[300] bg-slate-900/90 backdrop-blur-sm opacity-0 invisible transition-all duration-500 flex items-center justify-center p-4">
                <div class="relative bg-white w-full max-w-xl rounded-2xl shadow-2xl overflow-hidden transform scale-90 transition-transform duration-500 max-h-[90vh] flex flex-col" id="admission-popup-content">
                    <button id="close-admission-popup" class="absolute top-3 right-3 z-50 w-8 h-8 bg-black/20 hover:bg-red-500 rounded-full flex items-center justify-center text-white transition shadow-lg backdrop-blur-md">
                        <i class="fa-solid fa-xmark text-lg"></i>
                    </button>
                    
                    <div class="overflow-y-auto flex-1">
                        <div class="relative w-full bg-brandBlue overflow-hidden">
                            <div class="absolute top-0 right-0 w-[120%] sm:w-[90%] h-full bg-brandGold transform origin-top-right -skew-x-12 translate-x-12"></div>
                            
                            <div class="relative z-10 p-5 sm:p-8 flex flex-col justify-between gap-6">
                                <div class="flex items-center gap-3 bg-white/95 backdrop-blur-md w-max px-4 py-2 rounded-xl shadow-sm border border-white/50">
                                    <div class="w-10 h-10 bg-brandBlue rounded-full flex items-center justify-center shadow-inner">
                                        <i class="fa-solid fa-bolt text-brandGold text-xl"></i>
                                    </div>
                                    <div>
                                        <h2 class="text-xl sm:text-2xl font-black text-slate-900 leading-none tracking-tight">EXCELLENCE ITI</h2>
                                        <p class="text-[8px] sm:text-[10px] font-bold text-slate-500 tracking-widest uppercase mt-1">Central India's Premier Institute</p>
                                    </div>
                                </div>
                                
                                <div class="text-right mt-2 sm:mt-4">
                                    <h1 class="text-4xl sm:text-5xl font-black text-white drop-shadow-lg italic tracking-tight leading-none">ADMISSIONS</h1>
                                    <h1 class="text-4xl sm:text-5xl font-black text-white drop-shadow-lg italic tracking-tight leading-none">OPEN</h1>
                                    <div class="inline-block bg-white text-brandBlue text-2xl sm:text-4xl font-black px-4 py-1.5 mt-2 rounded-lg shadow-xl transform -rotate-2">
                                        2026-27
                                    </div>
                                </div>
                                
                                <div class="bg-white/95 backdrop-blur-md p-4 sm:p-5 rounded-xl mt-4 shadow-xl border border-white/50">
                                    <h3 class="text-center font-black text-red-600 text-lg sm:text-xl tracking-wider uppercase mb-2">Join Top NCVT Trades</h3>
                                    <p class="text-center text-xs sm:text-sm font-bold text-slate-700 mb-3 px-2 leading-relaxed">Prepare for global careers with the BEST placement opportunities.</p>
                                    
                                    <div class="flex justify-center flex-wrap gap-2 text-[10px] sm:text-xs font-black text-brandBlue">
                                        <span class="px-3 py-1.5 bg-slate-50 rounded-lg border-2 border-slate-100 shadow-sm">ELECTRICIAN</span>
                                        <span class="px-3 py-1.5 bg-slate-50 rounded-lg border-2 border-slate-100 shadow-sm">FITTER</span>
                                        <span class="px-3 py-1.5 bg-slate-50 rounded-lg border-2 border-slate-100 shadow-sm">WELDER</span>
                                        <span class="px-3 py-1.5 bg-slate-50 rounded-lg border-2 border-slate-100 shadow-sm">COPA</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div class="bg-slate-50 p-3 sm:p-4 flex justify-center items-center gap-4 sm:gap-8 border-t border-slate-200">
                            <div class="text-center"><i class="fa-solid fa-award text-2xl sm:text-3xl text-slate-300"></i><p class="text-[8px] font-black mt-1 text-slate-500 tracking-wider">NCVT ACCREDITED</p></div>
                            <div class="text-center"><i class="fa-solid fa-handshake-angle text-2xl sm:text-3xl text-slate-300"></i><p class="text-[8px] font-black mt-1 text-slate-500 tracking-wider">SKILL INDIA</p></div>
                            <div class="text-center"><i class="fa-solid fa-industry text-2xl sm:text-3xl text-slate-300"></i><p class="text-[8px] font-black mt-1 text-slate-500 tracking-wider">DGT APPROVED</p></div>
                            <div class="text-center"><i class="fa-solid fa-graduation-cap text-2xl sm:text-3xl text-slate-300"></i><p class="text-[8px] font-black mt-1 text-slate-500 tracking-wider">100% PLACEMENT</p></div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    // Function to initialize active page event listeners and modal logic
    function initInteractiveHandlers() {
        // A. Mobile Navigation Drawer Slide In/Out
        const hamburgerBtn = document.getElementById('mobile-menu-hamburger');
        if (hamburgerBtn) {
            hamburgerBtn.addEventListener('click', () => {
                // Check if menu already exists
                let mDrawer = document.getElementById('mobile-menu-drawer');
                if (!mDrawer) {
                    mDrawer = document.createElement('div');
                    mDrawer.id = 'mobile-menu-drawer';
                    mDrawer.className = 'fixed inset-0 z-[100] bg-slate-900/95 backdrop-blur-sm transform translate-x-full transition-transform duration-300 flex flex-col pt-24 px-8 overflow-y-auto pb-12';
                    
                    const closeBtn = document.createElement('button');
                    closeBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>';
                    closeBtn.className = 'absolute top-6 right-6 text-white text-3xl hover:text-brandGold transition-colors';
                    mDrawer.appendChild(closeBtn);

                    // Add links
                    const navLinks = [
                        { name: 'Home', href: 'index.html' },
                        { name: 'About Us', href: 'about.html' },
                        { name: 'Courses', href: 'courses.html' },
                        { name: 'Admission', href: 'admission.html' },
                        { name: 'Placement Cell', href: 'placement.html' },
                        { name: 'Faculty', href: 'faculty.html' },
                        { name: 'Facilities', href: 'facilities.html' },
                        { name: 'Gallery', href: 'gallery.html' },
                        { name: 'Notice Board', href: 'student-corner.html' },
                        { name: 'Contact', href: 'contact.html' }
                    ];

                    navLinks.forEach(item => {
                        const mLink = document.createElement('a');
                        mLink.href = item.href;
                        mLink.textContent = item.name;
                        mLink.className = 'text-white text-xl font-poppins font-bold py-4 border-b border-white/10 hover:text-brandGold transition-colors';
                        
                        // Highlight active in mobile menu
                        if (currentPage === item.href || (currentPage === '' && item.href === 'index.html')) {
                            mLink.classList.add('text-brandGold');
                        }

                        mLink.addEventListener('click', () => {
                            mDrawer.classList.add('translate-x-full');
                            document.body.style.overflow = '';
                        });
                        mDrawer.appendChild(mLink);
                    });

                    // Add Login inside Mobile Drawer
                    const mobileLogin = document.createElement('a');
                    mobileLogin.href = 'login.html';
                    mobileLogin.innerHTML = '<i class="fa-solid fa-user-shield mr-2"></i>MIS Login';
                    mobileLogin.className = 'text-brandGold text-xl font-poppins font-bold py-6 border-b border-white/10 flex items-center';
                    mobileLogin.id = 'mobile-menu-login-link';
                    mDrawer.appendChild(mobileLogin);

                    document.body.appendChild(mDrawer);

                    closeBtn.addEventListener('click', () => {
                        mDrawer.classList.add('translate-x-full');
                        document.body.style.overflow = '';
                    });
                }

                mDrawer.classList.remove('translate-x-full');
                document.body.style.overflow = 'hidden';
            });
        }

        // B. 360 Tour Modal Logic
        const openTourModal = () => {
            const tourModal = document.getElementById('tour-modal');
            if (tourModal) {
                tourModal.classList.remove('hidden', 'opacity-0', 'invisible');
            }
        };

        const closeTourModal = () => {
            const tourModal = document.getElementById('tour-modal');
            if (tourModal) {
                tourModal.classList.add('hidden', 'opacity-0', 'invisible');
                const iframe = document.getElementById('tour-iframe');
                if (iframe) {
                    iframe.src = iframe.src; // stop playback
                }
            }
        };

        const tourTrigger = document.getElementById('mobile-tour-trigger');
        if (tourTrigger) {
            tourTrigger.addEventListener('click', (e) => {
                e.preventDefault();
                openTourModal();
            });
        }

        const closeTourBtn = document.getElementById('close-tour-modal');
        if (closeTourBtn) {
            closeTourBtn.addEventListener('click', closeTourModal);
        }

        // Hook up any local page links asking for 360 tour
        document.querySelectorAll('a[href*="tour-modal"], [onclick*="tour-modal"]').forEach(el => {
            el.removeAttribute('onclick');
            el.addEventListener('click', (e) => {
                e.preventDefault();
                openTourModal();
            });
        });

        // C. Admission Popup logic
        const popup = document.getElementById('admission-popup');
        const content = document.getElementById('admission-popup-content');
        if (popup && content) {
            // Show popup on landing page (index.html) after a short delay
            if (currentPage === 'index.html' || currentPage === '') {
                setTimeout(() => {
                    popup.classList.remove('opacity-0', 'invisible');
                    content.classList.remove('scale-90');
                }, 800);
            }

            const closePopup = () => {
                popup.classList.add('opacity-0', 'invisible');
                content.classList.add('scale-90');
            };

            const closePopupBtn = document.getElementById('close-admission-popup');
            if (closePopupBtn) {
                closePopupBtn.addEventListener('click', closePopup);
            }
        }

        // D. AI Chatbot UI Toggles
        const chatBtn = document.getElementById('btn-ai-bot');
        const chatWin = document.getElementById('ai-chat-window');
        const chatClose = document.getElementById('close-ai-chat');
        if (chatBtn && chatWin) {
            chatBtn.addEventListener('click', () => {
                chatWin.classList.toggle('opacity-0');
                chatWin.classList.toggle('invisible');
                chatWin.classList.toggle('translate-y-4');
            });
        }
        if (chatClose && chatWin) {
            chatClose.addEventListener('click', () => {
                chatWin.classList.add('opacity-0', 'invisible', 'translate-y-4');
            });
        }

        // E. AI Chatbot Reply Logic
        const chatInput = document.getElementById('ai-chat-input');
        const chatSend = document.getElementById('ai-chat-send');
        const chatBody = document.getElementById('ai-chat-body');

        function handleChatSend() {
            const text = chatInput.value.trim();
            if (!text) return;

            // Render user bubble
            chatBody.innerHTML += `
                <div class="bg-brandBlue text-white p-3 rounded-tl-xl rounded-b-xl shadow-sm self-end max-w-[85%] mt-2">
                    <p class="text-sm">${text}</p>
                </div>
            `;
            chatInput.value = '';
            chatBody.scrollTop = chatBody.scrollHeight;

            // Show typing indicator bubble
            const typingId = 'typing-' + Date.now();
            chatBody.innerHTML += `
                <div id="${typingId}" class="bg-white p-4 rounded-tr-xl rounded-b-xl shadow-sm self-start w-16 border border-slate-100 flex justify-center gap-1 mt-2">
                    <div class="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce"></div>
                    <div class="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style="animation-delay: 0.1s"></div>
                    <div class="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style="animation-delay: 0.2s"></div>
                </div>
            `;
            chatBody.scrollTop = chatBody.scrollHeight;

            // Determine bot answer
            const lowerText = text.toLowerCase();
            const isHindi = lowerText.includes('kya') || lowerText.includes('kaise') || lowerText.includes('hai') || localStorage.getItem('lang') === 'hi';
            
            let response = isHindi 
                ? "Aapke sawal ke liye dhanyawad. Ek human representative aapse jald sampark karega, ya aap niche diye WhatsApp button se turant chat kar sakte hain!"
                : "Thank you for your question. A human representative will connect with you shortly, or you can use the WhatsApp button below to chat with us instantly!";
            
            if (lowerText.includes('chatbot') || lowerText.includes('bot')) {
                response = isHindi 
                    ? "Main Excellence ITI AI Chatbot hoon! Main yahan campus ki jankari ke liye 24/7 uplabdh hoon." 
                    : "I am the Excellence ITI AI Chatbot! I am here 24/7 to help you navigate our campus features.";
            } else if (lowerText.includes('admission') || lowerText.includes('namankan')) {
                response = isHindi
                    ? "Ek AI Admission Assistant ke roop mein, main 2026-27 session ke liye online form, fees aur criteria ki jankari de sakta hoon."
                    : "As your AI Admission Assistant, I can guide you through our online application process, fee structures, and eligibility criteria for the 2026-27 session.";
            } else if (lowerText.includes('career') || lowerText.includes('guidance') || lowerText.includes('job') || lowerText.includes('naukri')) {
                response = isHindi
                    ? "AI Career Guidance ke liye, humara system aapki skills ko analyze karke best NCVT trade (jaise Electrician ya Fitter) suggest karta hai."
                    : "For AI Career Guidance, our system analyzes your strengths and suggests the best NCVT trades (like Electrician or Fitter) to maximize your placement chances.";
            } else if (lowerText.includes('faq') || lowerText.includes('sawal')) {
                response = isHindi
                    ? "Main aapke sabhi AI FAQs ka jawab de sakta hoon! Hostel, library aur workshop ke baare mein koi bhi sawal poochein."
                    : "I can answer all your AI FAQs! Ask me about hostel facilities, workshop timings, library access, and more.";
            } else if (lowerText.includes('notice') || lowerText.includes('soochna')) {
                response = isHindi
                    ? "AI Notice Generator ka istemal karke, admin automatically campus alert aur chhutti ki soochna bana sakte hain."
                    : "Using our AI Notice Generator, administrators can automatically draft and publish urgent campus alerts and holiday notices directly to the student portal.";
            } else if (lowerText.includes('email') || lowerText.includes('mail')) {
                response = isHindi
                    ? "Humara AI Email Generator staff ko students aur parents ko professional email likhne mein madad karta hai."
                    : "Our AI Email Generator helps staff quickly compose professional emails to students and parents regarding attendance and performance.";
            } else if (lowerText.includes('performance') || lowerText.includes('analysis') || lowerText.includes('marks') || lowerText.includes('result')) {
                response = isHindi
                    ? "AI Student Performance Analysis tool test scores aur attendance ko real-time mein track karta hai taaki students ki madad ki ja sake."
                    : "The AI Student Performance Analysis tool tracks test scores and attendance in real-time to identify areas where students need extra academic support.";
            }

            setTimeout(() => {
                const typingIndicator = document.getElementById(typingId);
                if (typingIndicator) typingIndicator.remove();

                chatBody.innerHTML += `
                    <div class="bg-white p-3 rounded-tr-xl rounded-b-xl shadow-sm self-start max-w-[85%] border border-slate-100 mt-2">
                        <p class="text-sm text-slate-700">${response}</p>
                    </div>
                `;
                chatBody.scrollTop = chatBody.scrollHeight;
            }, 1200);
        }

        if (chatSend && chatInput) {
            chatSend.addEventListener('click', handleChatSend);
            chatInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') handleChatSend();
            });
        }
    }

    // Main Mount Execution
    function mountComponents() {
        // Guard against dashboard and login pages where we want to keep native layouts
        if (document.querySelector('aside') || window.location.pathname.includes('dashboard') || window.location.pathname.includes('login')) {
            return;
        }

        // 1. Mount Header
        const headerPlaceholder = document.getElementById('header-placeholder');
        if (headerPlaceholder) {
            headerPlaceholder.innerHTML = getHeaderHTML();
        }

        // 2. Mount Footer
        const footerPlaceholder = document.getElementById('footer-placeholder');
        if (footerPlaceholder) {
            footerPlaceholder.innerHTML = getFooterHTML();
        }

        // 3. Mount widgets and modals at end of body if not dashboard
        let widgetsContainer = document.getElementById('shared-widgets-container');
        if (!widgetsContainer) {
            widgetsContainer = document.createElement('div');
            widgetsContainer.id = 'shared-widgets-container';
            widgetsContainer.innerHTML = getWidgetsHTML();
            document.body.appendChild(widgetsContainer);
        }

        // 4. Initialize interactions
        initInteractiveHandlers();
    }

    // Run as early as possible
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', mountComponents);
    } else {
        mountComponents();
    }
})();
