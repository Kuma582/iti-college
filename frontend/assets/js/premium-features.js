/**
 * Premium Features: Dark Mode, i18n, Search, Voice, Notifications
 */

document.addEventListener('DOMContentLoaded', () => {
    injectPremiumControls();
    initDarkMode();
    initi18n();
    initSearchAndVoice();
    initNotifications();
});

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
        const fab = document.createElement('div');
        fab.className = 'fixed bottom-6 right-6 z-50 flex flex-col gap-3 lg:hidden';
        fab.innerHTML = `
            <button id="mob-dark-mode" class="w-12 h-12 bg-slate-800 dark:bg-white text-white dark:text-slate-800 rounded-full shadow-xl flex items-center justify-center text-xl transition-transform active:scale-95">
                <i class="fa-solid fa-moon dark:hidden"></i>
                <i class="fa-solid fa-sun hidden dark:block"></i>
            </button>
            <button id="mob-search" class="w-12 h-12 bg-brandBlue text-white rounded-full shadow-xl flex items-center justify-center text-xl transition-transform active:scale-95">
                <i class="fa-solid fa-magnifying-glass"></i>
            </button>
        `;
        document.body.appendChild(fab);
        
        document.getElementById('mob-dark-mode').addEventListener('click', toggleDarkMode);
        document.getElementById('mob-search').addEventListener('click', openSearchModal);
    }
}

// 2. Dark Mode Logic
function initDarkMode() {
    const toggleBtn = document.getElementById('btn-dark-mode');
    
    // Check local storage or system preference
    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        document.documentElement.classList.add('dark');
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
