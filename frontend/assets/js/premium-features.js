/**
 * Premium Features: Dark Mode, i18n, Search, Voice, Notifications
 */

document.addEventListener('DOMContentLoaded', () => {
    injectPremiumControls();
    initDarkMode();
    initi18n();
    initSearchAndVoice();
    initNotifications();
    injectFloatingContact();
    addLogoAnimation();
    initCustomCursor();
    initParticleBackground();
    init3DTilt();
    initScrollReveal();
});

// 0. Logo Animation
function addLogoAnimation() {
    // Inject a custom CSS animation for the logo
    const style = document.createElement('style');
    style.textContent = `
        @keyframes logoFloat {
            0%, 100% { transform: translateY(0) scale(1); }
            50% { transform: translateY(-4px) scale(1.05); }
        }
        @keyframes boltGlow {
            0%, 100% { filter: drop-shadow(0 0 2px rgba(244, 180, 0, 0.4)); }
            50% { filter: drop-shadow(0 0 8px rgba(244, 180, 0, 0.9)); }
        }
        .logo-container-animated {
            animation: logoFloat 3s ease-in-out infinite;
        }
        .logo-bolt-animated {
            animation: boltGlow 2s ease-in-out infinite;
        }
    `;
    document.head.appendChild(style);

    // Apply to the main header logo
    const logoDiv = document.querySelector('header a[href="index.html"] div');
    const logoBolt = document.querySelector('header a[href="index.html"] i.fa-bolt');
    
    if (logoDiv) logoDiv.classList.add('logo-container-animated');
    if (logoBolt) logoBolt.classList.add('logo-bolt-animated');
}

// 1. Inject Premium Controls into Header
function injectPremiumControls() {
    const headerNav = document.querySelector('header .max-w-7xl');
    if (!headerNav) return;

    const controlsContainer = document.createElement('div');
    controlsContainer.className = 'hidden lg:flex items-center ml-4 pl-4 border-l border-slate-200 dark:border-slate-700';
    
    controlsContainer.innerHTML = `
        <div class="relative group">
            <button class="text-slate-600 hover:text-brandBlue dark:text-slate-300 dark:hover:text-brandGold transition text-xl w-10 h-10 rounded-full flex items-center justify-center hover:bg-slate-100 dark:hover:bg-slate-800" title="Tools & Settings">
                <i class="fa-solid fa-ellipsis-vertical"></i>
                <span class="absolute top-1.5 right-2 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
            </button>
            
            <div class="absolute right-0 mt-2 w-72 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 overflow-hidden transform origin-top-right scale-95 group-hover:scale-100">
                <div class="p-4 bg-slate-50 dark:bg-slate-900/80 border-b border-slate-100 dark:border-slate-700">
                    <h4 class="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">Preferences</h4>
                    <div class="space-y-4">
                        <div class="flex items-center justify-between">
                            <span class="text-sm font-semibold text-slate-700 dark:text-slate-300"><i class="fa-solid fa-language w-6 text-brandBlue dark:text-brandGold"></i> Language</span>
                            <button id="btn-lang" class="text-xs font-bold text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 px-3 py-1 rounded-full shadow-sm hover:bg-slate-50 transition">HI</button>
                        </div>
                        <div class="flex items-center justify-between">
                            <span class="text-sm font-semibold text-slate-700 dark:text-slate-300"><i class="fa-solid fa-palette w-6 text-brandBlue dark:text-brandGold"></i> Theme</span>
                            <button id="btn-dark-mode" class="text-xs font-bold text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 px-3 py-1 rounded-full shadow-sm hover:bg-slate-50 transition w-16 text-center">
                                <span class="dark:hidden">Dark</span>
                                <span class="hidden dark:inline">Light</span>
                            </button>
                        </div>
                    </div>
                </div>
                <div class="p-2">
                    <button id="btn-global-search" class="w-full text-left px-4 py-3 text-sm font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700/50 rounded-xl transition flex items-center group/item">
                        <i class="fa-solid fa-magnifying-glass w-8 text-slate-400 group-hover/item:text-brandBlue transition"></i> 
                        Advanced Search
                    </button>
                    <button id="btn-notifications-open" class="w-full text-left px-4 py-3 text-sm font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700/50 rounded-xl transition flex items-center justify-between group/item">
                        <span class="flex items-center"><i class="fa-solid fa-bell w-8 text-slate-400 group-hover/item:text-brandBlue transition"></i> Notifications</span>
                        <span class="bg-red-500 text-white text-[10px] px-2 py-0.5 rounded-full font-bold shadow-sm">3 New</span>
                    </button>
                </div>
            </div>
        </div>
    `;

    const loginCta = headerNav.querySelector('.hidden.lg\\:block');
    if (loginCta) {
        headerNav.insertBefore(controlsContainer, loginCta);
    } else {
        headerNav.appendChild(controlsContainer);
    }

    if(window.innerWidth < 1024) {
        // Create Mobile Floating Action Button & Menu
        const mobMenuContainer = document.createElement('div');
        mobMenuContainer.className = 'fixed bottom-6 right-6 z-[100] lg:hidden flex flex-col items-end';
        
        mobMenuContainer.innerHTML = `
            <!-- Mobile Action Sheet -->
            <div id="mob-action-sheet" class="mb-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-2xl p-2 w-64 origin-bottom-right transform scale-0 opacity-0 transition-all duration-300">
                <div class="p-3 border-b border-slate-100 dark:border-slate-700">
                    <h4 class="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3">Preferences</h4>
                    <div class="space-y-3">
                        <div class="flex items-center justify-between">
                            <span class="text-sm font-semibold text-slate-700 dark:text-slate-300"><i class="fa-solid fa-language w-5 text-brandBlue dark:text-brandGold"></i> Language</span>
                            <button id="mob-btn-lang" class="text-xs font-bold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-700 px-3 py-1 rounded-full shadow-sm">HI</button>
                        </div>
                        <div class="flex items-center justify-between">
                            <span class="text-sm font-semibold text-slate-700 dark:text-slate-300"><i class="fa-solid fa-palette w-5 text-brandBlue dark:text-brandGold"></i> Theme</span>
                            <button id="mob-btn-dark-mode" class="text-xs font-bold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-700 px-3 py-1 rounded-full shadow-sm w-16">
                                <span class="dark:hidden">Dark</span>
                                <span class="hidden dark:inline">Light</span>
                            </button>
                        </div>
                    </div>
                </div>
                <div class="p-1">
                    <button id="mob-btn-search" class="w-full text-left px-3 py-3 text-sm font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700/50 rounded-xl transition flex items-center">
                        <i class="fa-solid fa-magnifying-glass w-7 text-slate-400"></i> Search
                    </button>
                    <button id="mob-btn-notifications" class="w-full text-left px-3 py-3 text-sm font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700/50 rounded-xl transition flex items-center justify-between">
                        <span class="flex items-center"><i class="fa-solid fa-bell w-7 text-slate-400"></i> Notifications</span>
                        <span class="bg-red-500 text-white text-[10px] px-2 py-0.5 rounded-full font-bold">3 New</span>
                    </button>
                </div>
            </div>
            
            <!-- Main FAB -->
            <button id="mob-fab-main" class="w-14 h-14 bg-brandBlue text-white rounded-full shadow-[0_0_20px_rgba(11,60,145,0.4)] flex items-center justify-center text-2xl transition-transform active:scale-95 relative">
                <i class="fa-solid fa-gear"></i>
                <span class="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full border-2 border-white dark:border-slate-900 animate-pulse"></span>
            </button>
        `;
        document.body.appendChild(mobMenuContainer);
        
        // Mobile Interactions
        const fabMain = document.getElementById('mob-fab-main');
        const actionSheet = document.getElementById('mob-action-sheet');
        let isSheetOpen = false;

        fabMain.addEventListener('click', () => {
            isSheetOpen = !isSheetOpen;
            if(isSheetOpen) {
                actionSheet.classList.remove('scale-0', 'opacity-0');
                actionSheet.classList.add('scale-100', 'opacity-100');
                fabMain.innerHTML = '<i class="fa-solid fa-xmark"></i>';
            } else {
                actionSheet.classList.add('scale-0', 'opacity-0');
                actionSheet.classList.remove('scale-100', 'opacity-100');
                fabMain.innerHTML = '<i class="fa-solid fa-gear"></i><span class="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full border-2 border-white dark:border-slate-900 animate-pulse"></span>';
            }
        });

        // Close on outside click
        document.addEventListener('click', (e) => {
            if(isSheetOpen && !mobMenuContainer.contains(e.target)) {
                fabMain.click();
            }
        });

        // Map mobile buttons to existing logic
        document.getElementById('mob-btn-dark-mode').addEventListener('click', toggleDarkMode);
        document.getElementById('mob-btn-search').addEventListener('click', () => {
            fabMain.click(); // close menu
            openSearchModal();
        });
        
        // For language toggle, we need to wire it similarly to initi18n. 
        // We'll update the button text when it's clicked.
        document.getElementById('mob-btn-lang').addEventListener('click', (e) => {
            let currentLang = localStorage.getItem('lang') || 'en';
            currentLang = currentLang === 'en' ? 'hi' : 'en';
            localStorage.setItem('lang', currentLang);
            e.target.textContent = currentLang === 'en' ? 'HI' : 'EN';
            
            // Also update desktop button if it exists
            const desktopLangBtn = document.getElementById('btn-lang');
            if(desktopLangBtn) desktopLangBtn.textContent = currentLang === 'en' ? 'HI' : 'EN';
            
            applyTranslations(currentLang);
        });

        // We map the mob-btn-notifications to open the notif modal.
        // We'll dispatch a click event to the main notifications button if it exists.
        document.getElementById('mob-btn-notifications').addEventListener('click', () => {
            fabMain.click(); // close menu
            const notifBtn = document.getElementById('btn-notifications-open');
            if (notifBtn) notifBtn.click();
        });
    }
}

// 2. Dark Mode Logic (Futuristic 2035 - Default to Dark)
function initDarkMode() {
    const toggleBtn = document.getElementById('btn-dark-mode');
    
    // Default to dark for the 2035 look unless explicitly set to light
    if (!('theme' in localStorage) || localStorage.theme === 'dark') {
        document.documentElement.classList.add('dark');
        localStorage.theme = 'dark';
    } else {
        document.documentElement.classList.remove('dark');
    }

    if (toggleBtn) {
        toggleBtn.addEventListener('click', toggleDarkMode);
    }
}

function toggleDarkMode() {
    document.documentElement.classList.toggle('dark');
    if (document.documentElement.classList.contains('dark')) {
        localStorage.theme = 'dark';
    } else {
        localStorage.theme = 'light';
    }
}

// 3. i18n Logic
function initi18n() {
    const langBtn = document.getElementById('btn-lang');
    let currentLang = localStorage.getItem('lang') || 'en';
    
    // Update button text
    if (langBtn) langBtn.textContent = currentLang === 'en' ? 'HI' : 'EN';
    
    applyTranslations(currentLang);

    if (langBtn) {
        langBtn.addEventListener('click', () => {
            currentLang = currentLang === 'en' ? 'hi' : 'en';
            localStorage.setItem('lang', currentLang);
            langBtn.textContent = currentLang === 'en' ? 'HI' : 'EN';
            applyTranslations(currentLang);
        });
    }
}

function applyTranslations(lang) {
    if (!window.i18nData) return;
    const dict = window.i18nData[lang];
    if (!dict) return;

    // Apply to elements with data-i18n
    const elements = document.querySelectorAll('[data-i18n]');
    elements.forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (dict[key]) {
            el.textContent = dict[key];
        }
    });
}

// 4. Search and Voice Search
function initSearchAndVoice() {
    const searchBtn = document.getElementById('btn-global-search');
    if (searchBtn) searchBtn.addEventListener('click', openSearchModal);
    
    // Inject Search Modal
    const searchModal = document.createElement('div');
    searchModal.id = 'search-modal';
    searchModal.className = 'fixed inset-0 z-[200] bg-slate-900/80 backdrop-blur-sm opacity-0 invisible transition-all duration-300 flex items-start justify-center pt-24 px-4';
    searchModal.innerHTML = `
        <div class="bg-white dark:bg-slate-800 w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden transform -translate-y-8 transition-transform duration-300" id="search-modal-content">
            <div class="p-4 border-b border-slate-100 dark:border-slate-700 flex items-center gap-3 relative">
                <i class="fa-solid fa-magnifying-glass text-slate-400 text-xl ml-2"></i>
                <input type="text" id="global-search-input" placeholder="Search courses, facilities, notices..." class="flex-1 bg-transparent border-none outline-none text-lg text-slate-800 dark:text-white placeholder-slate-400 font-poppins" autocomplete="off">
                <button id="btn-voice-search" class="w-10 h-10 rounded-full flex items-center justify-center text-slate-400 hover:text-brandBlue hover:bg-blue-50 dark:hover:bg-slate-700 transition" title="Voice Search">
                    <i class="fa-solid fa-microphone"></i>
                </button>
                <button id="close-search" class="w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-slate-700 transition">
                    <i class="fa-solid fa-xmark text-lg"></i>
                </button>
            </div>
            <div class="p-4 max-h-96 overflow-y-auto" id="search-results">
                <div class="text-center text-slate-400 py-8 text-sm">
                    <i class="fa-solid fa-keyboard text-3xl mb-3 opacity-50 block"></i>
                    Start typing to search...
                </div>
            </div>
        </div>
    `;
    document.body.appendChild(searchModal);

    document.getElementById('close-search').addEventListener('click', closeSearchModal);
    searchModal.addEventListener('click', (e) => {
        if (e.target === searchModal) closeSearchModal();
    });

    const searchInput = document.getElementById('global-search-input');
    searchInput.addEventListener('input', (e) => performSearch(e.target.value));

    // Voice Search
    const voiceBtn = document.getElementById('btn-voice-search');
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
        const recognition = new SpeechRecognition();
        recognition.continuous = false;
        recognition.lang = 'en-IN'; // Default, could tie to i18n
        
        recognition.onstart = function() {
            voiceBtn.classList.add('text-red-500', 'animate-pulse');
            voiceBtn.classList.remove('text-slate-400');
            searchInput.placeholder = "Listening...";
        };
        
        recognition.onresult = function(event) {
            const transcript = event.results[0][0].transcript;
            searchInput.value = transcript;
            performSearch(transcript);
        };
        
        recognition.onerror = function(event) {
            console.error(event.error);
            resetVoiceBtn();
        };
        
        recognition.onend = function() {
            resetVoiceBtn();
        };

        function resetVoiceBtn() {
            voiceBtn.classList.remove('text-red-500', 'animate-pulse');
            voiceBtn.classList.add('text-slate-400');
            searchInput.placeholder = "Search courses, facilities, notices...";
        }

        voiceBtn.addEventListener('click', () => {
            recognition.start();
        });
    } else {
        voiceBtn.style.display = 'none'; // Not supported
    }
}

function openSearchModal() {
    const modal = document.getElementById('search-modal');
    const content = document.getElementById('search-modal-content');
    modal.classList.remove('opacity-0', 'invisible');
    content.classList.remove('-translate-y-8');
    setTimeout(() => document.getElementById('global-search-input').focus(), 100);
}

function closeSearchModal() {
    const modal = document.getElementById('search-modal');
    const content = document.getElementById('search-modal-content');
    modal.classList.add('opacity-0', 'invisible');
    content.classList.add('-translate-y-8');
}

function performSearch(query) {
    const resultsContainer = document.getElementById('search-results');
    if (!query.trim()) {
        resultsContainer.innerHTML = '<div class="text-center text-slate-400 py-8 text-sm"><i class="fa-solid fa-keyboard text-3xl mb-3 opacity-50 block"></i>Start typing to search...</div>';
        return;
    }

    query = query.toLowerCase();
    
    // Dummy index of site content
    const siteIndex = [
        { title: 'Electrician (NCVT)', type: 'Course', url: 'courses.html', desc: 'Master electrical wiring and grids.' },
        { title: 'Fitter (NCVT)', type: 'Course', url: 'courses.html', desc: 'Expertise in high-precision machining.' },
        { title: 'Admissions 2026', type: 'Page', url: 'admission.html', desc: 'Apply online for the new session.' },
        { title: 'Campus Facilities', type: 'Page', url: 'facilities.html', desc: 'Hostel, Library, Labs.' },
        { title: 'Download Center', type: 'Resource', url: 'downloads.html', desc: 'Syllabus, Brochures, Forms.' },
        { title: 'Campus Tour', type: 'Feature', url: 'tour.html', desc: '360 degree virtual tour.' }
    ];

    const results = siteIndex.filter(item => 
        item.title.toLowerCase().includes(query) || item.desc.toLowerCase().includes(query)
    );

    if (results.length === 0) {
        resultsContainer.innerHTML = '<div class="text-center text-slate-400 py-8 text-sm">No results found for "'+query+'"</div>';
        return;
    }

    resultsContainer.innerHTML = results.map(res => `
        <a href="${res.url}" class="block p-3 hover:bg-slate-50 dark:hover:bg-slate-700/50 rounded-lg border-b border-slate-50 dark:border-slate-700 last:border-0 transition group">
            <div class="flex items-start justify-between">
                <div>
                    <h4 class="text-brandBlue dark:text-blue-400 font-semibold group-hover:underline">${res.title}</h4>
                    <p class="text-xs text-slate-500 dark:text-slate-400 mt-1">${res.desc}</p>
                </div>
                <span class="text-[10px] bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-300 px-2 py-1 rounded font-medium uppercase tracking-wider">${res.type}</span>
            </div>
        </a>
    `).join('');
}

// 5. Live Notifications
function initNotifications() {
    const notifBtn = document.getElementById('btn-notifications-open');
    if (!notifBtn) return;
    
    // Inject Notifications Modal
    const notifModal = document.createElement('div');
    notifModal.id = 'notif-modal';
    notifModal.className = 'fixed inset-0 z-[200] bg-slate-900/80 backdrop-blur-sm opacity-0 invisible transition-all duration-300 flex items-start justify-end pt-20 px-4 sm:px-8';
    
    const notifications = [
        { title: 'Result Declared', time: '10 mins ago', desc: 'First semester NCVT results are out. Check student portal.', type: 'alert' },
        { title: 'Holiday Notice', time: '2 hours ago', desc: 'Campus closed tomorrow due to local festival.', type: 'info' },
        { title: 'New Trade Added', time: '1 day ago', desc: 'Admissions open for new IoT Technician course.', type: 'success' }
    ];

    const notifListHtml = notifications.map(n => `
        <a href="student-corner.html" class="block p-4 border-b border-slate-100 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition">
            <div class="flex items-start gap-3">
                <div class="w-2.5 h-2.5 mt-1.5 rounded-full ${n.type === 'alert' ? 'bg-red-500' : (n.type==='success' ? 'bg-green-500' : 'bg-brandBlue')} shadow-sm"></div>
                <div>
                    <h5 class="text-sm font-bold text-slate-800 dark:text-white">${n.title}</h5>
                    <p class="text-xs text-slate-500 dark:text-slate-400 mt-1">${n.desc}</p>
                    <span class="text-[10px] text-slate-400 mt-2 block font-medium tracking-wide"><i class="fa-regular fa-clock mr-1"></i>${n.time}</span>
                </div>
            </div>
        </a>
    `).join('');

    notifModal.innerHTML = `
        <div class="bg-white dark:bg-slate-800 w-full max-w-sm rounded-2xl shadow-2xl overflow-hidden transform translate-x-8 transition-transform duration-300 flex flex-col max-h-[80vh]" id="notif-modal-content">
            <div class="p-4 border-b border-slate-100 dark:border-slate-700 flex justify-between items-center bg-slate-50 dark:bg-slate-900/50">
                <h3 class="font-bold text-slate-800 dark:text-white flex items-center gap-2"><i class="fa-solid fa-bell text-brandGold"></i> Notifications</h3>
                <button id="close-notif" class="w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-slate-700 transition">
                    <i class="fa-solid fa-xmark text-lg"></i>
                </button>
            </div>
            <div class="overflow-y-auto flex-1">
                ${notifListHtml}
            </div>
            <a href="student-corner.html" class="block p-3 text-center text-xs font-bold text-brandBlue dark:text-blue-400 hover:underline bg-slate-50 dark:bg-slate-900/50 border-t border-slate-100 dark:border-slate-700">
                View All Notices
            </a>
        </div>
    `;
    document.body.appendChild(notifModal);

    const closeModalBtn = document.getElementById('close-notif');
    const content = document.getElementById('notif-modal-content');

    const openModal = () => {
        notifModal.classList.remove('opacity-0', 'invisible');
        content.classList.remove('translate-x-8');
    };

    const closeModal = () => {
        notifModal.classList.add('opacity-0', 'invisible');
        content.classList.add('translate-x-8');
    };

    notifBtn.addEventListener('click', openModal);
    closeModalBtn.addEventListener('click', closeModal);
    notifModal.addEventListener('click', (e) => {
        if (e.target === notifModal) closeModal();
    });
}

// 6. Floating Contact (WhatsApp + AI Bot)
function injectFloatingContact() {
    const contactContainer = document.createElement('div');
    // Position: Bottom Right on Desktop, Bottom Left on Mobile to not clash with Mobile Settings FAB
    contactContainer.className = 'fixed bottom-6 z-[90] flex flex-col gap-4 ' + 
        (window.innerWidth < 1024 ? 'left-6' : 'right-6');
    
    contactContainer.innerHTML = `
        <!-- AI Assistant Bot -->
        <button id="btn-ai-bot" class="w-14 h-14 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 rounded-full shadow-[0_0_15px_rgba(0,0,0,0.2)] dark:shadow-[0_0_15px_rgba(255,255,255,0.2)] flex items-center justify-center text-2xl transition-transform hover:scale-110 active:scale-95 group relative" title="Ask AI">
            <i class="fa-solid fa-robot group-hover:animate-bounce"></i>
            <span class="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-slate-800"></span>
        </button>

        <!-- WhatsApp -->
        <a href="https://wa.me/916209303249" target="_blank" class="w-14 h-14 bg-green-500 text-white rounded-full shadow-[0_0_15px_rgba(34,197,94,0.4)] flex items-center justify-center text-3xl transition-transform hover:scale-110 active:scale-95 group" title="Chat on WhatsApp">
            <i class="fa-brands fa-whatsapp"></i>
        </a>
    `;

    document.body.appendChild(contactContainer);

    // AI Bot Modal/Chat Window
    const aiChatWindow = document.createElement('div');
    aiChatWindow.id = 'ai-chat-window';
    aiChatWindow.className = 'fixed bottom-24 z-[100] w-80 sm:w-96 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-2xl opacity-0 invisible transform translate-y-4 transition-all duration-300 flex flex-col overflow-hidden ' + 
        (window.innerWidth < 1024 ? 'left-6' : 'right-24');

    aiChatWindow.innerHTML = `
        <div class="bg-slate-900 dark:bg-slate-950 p-4 text-white flex justify-between items-center">
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
        <div class="p-4 h-72 overflow-y-auto bg-slate-50 dark:bg-slate-900/50 flex flex-col gap-4" id="ai-chat-body">
            <div class="bg-white dark:bg-slate-700 p-3 rounded-tr-xl rounded-b-xl shadow-sm self-start max-w-[85%] border border-slate-100 dark:border-slate-600">
                <p class="text-sm text-slate-700 dark:text-slate-200">Hi there! 👋 I'm Excellence AI. How can I assist you with admissions, trades, or campus information today?</p>
            </div>
        </div>
        <div class="p-3 bg-white dark:bg-slate-800 border-t border-slate-100 dark:border-slate-700 flex gap-2">
            <input type="text" id="ai-chat-input" placeholder="Type your query..." class="flex-1 bg-slate-100 dark:bg-slate-900 text-slate-800 dark:text-white text-sm rounded-full px-4 outline-none border border-transparent focus:border-brandBlue/50 transition">
            <button id="ai-chat-send" class="w-10 h-10 rounded-full bg-brandBlue text-white flex items-center justify-center shrink-0 hover:bg-blue-800 transition shadow-sm"><i class="fa-solid fa-paper-plane text-sm relative -left-0.5"></i></button>
        </div>
    `;

    document.body.appendChild(aiChatWindow);

    let isAiOpen = false;
    document.getElementById('btn-ai-bot').addEventListener('click', () => {
        isAiOpen = !isAiOpen;
        if(isAiOpen) {
            aiChatWindow.classList.remove('opacity-0', 'invisible', 'translate-y-4');
            setTimeout(() => document.getElementById('ai-chat-input').focus(), 300);
        } else {
            aiChatWindow.classList.add('opacity-0', 'invisible', 'translate-y-4');
        }
    });

    document.getElementById('close-ai-chat').addEventListener('click', () => {
        isAiOpen = false;
        aiChatWindow.classList.add('opacity-0', 'invisible', 'translate-y-4');
    });

    document.getElementById('ai-chat-send').addEventListener('click', handleAiSend);
    document.getElementById('ai-chat-input').addEventListener('keypress', (e) => {
        if(e.key === 'Enter') handleAiSend();
    });

    function handleAiSend() {
        const input = document.getElementById('ai-chat-input');
        const text = input.value.trim();
        if(!text) return;

        const chatBody = document.getElementById('ai-chat-body');
        
        // User message
        chatBody.innerHTML += \`
            <div class="bg-brandBlue text-white p-3 rounded-tl-xl rounded-b-xl shadow-sm self-end max-w-[85%]">
                <p class="text-sm">\${text}</p>
            </div>
        \`;
        input.value = '';
        chatBody.scrollTop = chatBody.scrollHeight;

        // Show typing indicator
        const typingId = 'typing-' + Date.now();
        chatBody.innerHTML += \`
            <div id="\${typingId}" class="bg-white dark:bg-slate-700 p-4 rounded-tr-xl rounded-b-xl shadow-sm self-start w-16 border border-slate-100 dark:border-slate-600 flex justify-center gap-1">
                <div class="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce"></div>
                <div class="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style="animation-delay: 0.1s"></div>
                <div class="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style="animation-delay: 0.2s"></div>
            </div>
        \`;
        chatBody.scrollTop = chatBody.scrollHeight;

        // Bot reply (mock)
        setTimeout(() => {
            const typingIndicator = document.getElementById(typingId);
            if(typingIndicator) typingIndicator.remove();

            chatBody.innerHTML += \`
                <div class="bg-white dark:bg-slate-700 p-3 rounded-tr-xl rounded-b-xl shadow-sm self-start max-w-[85%] border border-slate-100 dark:border-slate-600">
                    <p class="text-sm text-slate-700 dark:text-slate-200">Thank you for your question. A human representative will connect with you shortly, or you can use the WhatsApp button below to chat with us instantly!</p>
                </div>
            \`;
            chatBody.scrollTop = chatBody.scrollHeight;
        }, 1500);
    }
}

// 7. Custom Glowing Cursor (2035 UI)
function initCustomCursor() {
    if (window.innerWidth < 1024) return; // Only on desktop
    
    const dot = document.createElement('div');
    dot.className = 'custom-cursor-dot';
    const outline = document.createElement('div');
    outline.className = 'custom-cursor-outline';
    
    document.body.appendChild(dot);
    document.body.appendChild(outline);

    window.addEventListener('mousemove', (e) => {
        dot.style.left = e.clientX + 'px';
        dot.style.top = e.clientY + 'px';
        
        // Slight delay for the outline for a trail effect
        setTimeout(() => {
            outline.style.left = e.clientX + 'px';
            outline.style.top = e.clientY + 'px';
        }, 50);
    });

    // Hover effect on interactables
    document.querySelectorAll('a, button, input, .glass-card').forEach(el => {
        el.addEventListener('mouseenter', () => {
            dot.classList.add('hover');
            outline.classList.add('hover');
        });
        el.addEventListener('mouseleave', () => {
            dot.classList.remove('hover');
            outline.classList.remove('hover');
        });
    });
}

// 8. Particle Network Background (2035 UI)
function initParticleBackground() {
    const canvas = document.createElement('canvas');
    canvas.id = 'particle-canvas';
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100vw';
    canvas.style.height = '100vh';
    canvas.style.zIndex = '-1';
    canvas.style.pointerEvents = 'none';
    document.body.insertBefore(canvas, document.body.firstChild);

    const ctx = canvas.getContext('2d');
    let particles = [];
    let width, height;

    function resize() {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resize);
    resize();

    class Particle {
        constructor() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.vx = (Math.random() - 0.5) * 0.5;
            this.vy = (Math.random() - 0.5) * 0.5;
            this.radius = Math.random() * 2;
        }
        update() {
            this.x += this.vx;
            this.y += this.vy;
            if (this.x < 0 || this.x > width) this.vx *= -1;
            if (this.y < 0 || this.y > height) this.vy *= -1;
        }
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = document.documentElement.classList.contains('dark') ? 'rgba(0, 255, 255, 0.5)' : 'rgba(11, 60, 145, 0.2)';
            ctx.fill();
        }
    }

    for (let i = 0; i < 50; i++) particles.push(new Particle());

    function animate() {
        ctx.clearRect(0, 0, width, height);
        
        particles.forEach((p, i) => {
            p.update();
            p.draw();
            // Connect nearby particles
            for (let j = i + 1; j < particles.length; j++) {
                const p2 = particles[j];
                const dist = Math.hypot(p.x - p2.x, p.y - p2.y);
                if (dist < 150) {
                    ctx.beginPath();
                    ctx.moveTo(p.x, p.y);
                    ctx.lineTo(p2.x, p2.y);
                    ctx.strokeStyle = document.documentElement.classList.contains('dark') ? \`rgba(0, 255, 255, \${0.2 - dist/750})\` : \`rgba(11, 60, 145, \${0.1 - dist/1500})\`;
                    ctx.stroke();
                }
            }
        });
        requestAnimationFrame(animate);
    }
    animate();
}

// 9. 3D Tilt Effect for Glass Cards (2035 UI)
function init3DTilt() {
    if (window.innerWidth < 1024) return;
    const cards = document.querySelectorAll('.glass-card, .glass-dark');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = ((y - centerY) / centerY) * -10; // Max tilt 10deg
            const rotateY = ((x - centerX) / centerX) * 10;
            
            card.style.transform = \`perspective(1000px) rotateX(\${rotateX}deg) rotateY(\${rotateY}deg) scale3d(1.02, 1.02, 1.02)\`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
        });
    });
}

// 10. Scroll Reveal Animation (2035 UI)
function initScrollReveal() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal-visible');
                // Optional: stop observing once revealed
                // observer.unobserve(entry.target); 
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal-hidden').forEach(el => observer.observe(el));
}
