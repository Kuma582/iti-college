/**
 * Excellence ITI - Global Interactive Scripts
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Handle all empty links (href="#") so they don't jump to the top abruptly
    const emptyLinks = document.querySelectorAll('a[href="#"]');
    emptyLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            // If it's a social link, show a small alert
            if(link.querySelector('.fa-brands')) {
                alert('This will open our official social media page.');
            } else if(link.querySelector('.fa-download')) {
                // Handled specifically in student corner, but a fallback here
                alert('File download initiated.');
            } else {
                console.log('Empty link clicked');
            }
        });
    });

    // 2. Mobile Menu Toggle
    // The design currently has a desktop nav (<nav class="hidden lg:flex...">)
    // We will clone it and create a mobile sidebar if a mobile button exists.
    const mobileBtn = document.querySelector('button .fa-bars')?.parentElement;
    const desktopNav = document.querySelector('nav.hidden.lg\\:flex');
    
    if (mobileBtn && desktopNav) {
        // Create mobile menu container
        const mobileMenu = document.createElement('div');
        mobileMenu.className = 'fixed inset-0 z-[100] bg-slate-900/95 backdrop-blur-sm transform translate-x-full transition-transform duration-300 flex flex-col pt-24 px-8';
        
        // Close button
        const closeBtn = document.createElement('button');
        closeBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>';
        closeBtn.className = 'absolute top-6 right-6 text-white text-3xl hover:text-brandGold transition-colors';
        mobileMenu.appendChild(closeBtn);
        
        // Links
        const links = desktopNav.querySelectorAll('a');
        links.forEach(l => {
            const mLink = document.createElement('a');
            mLink.href = l.href;
            mLink.textContent = l.textContent;
            mLink.className = 'text-white text-2xl font-poppins font-bold py-4 border-b border-white/10 hover:text-brandGold transition-colors';
            mobileMenu.appendChild(mLink);
        });

        document.body.appendChild(mobileMenu);

        mobileBtn.addEventListener('click', () => {
            mobileMenu.classList.remove('translate-x-full');
            document.body.style.overflow = 'hidden';
        });

        closeBtn.addEventListener('click', () => {
            mobileMenu.classList.add('translate-x-full');
            document.body.style.overflow = '';
        });
    }

    // 3. Gallery Filtering and Lightbox
    const gallerySection = document.querySelector('.masonry-grid');
    if (gallerySection) {
        const filterBtns = document.querySelectorAll('button:contains("Workshops"), button:contains("Campus"), button:contains("Events"), button:contains("Videos"), button:contains("All Media")');
        // Using a simpler approach since :contains is jQuery
        
        const gBtns = Array.from(document.querySelectorAll('button')).filter(b => 
            ['All Media', 'Workshops', 'Campus', 'Events', 'Videos'].some(t => b.textContent.includes(t))
        );
        
        const items = document.querySelectorAll('.masonry-item');
        
        gBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                // Update active state
                gBtns.forEach(b => {
                    b.classList.remove('bg-brandBlue', 'text-white');
                    b.classList.add('bg-white', 'text-slate-600');
                });
                btn.classList.add('bg-brandBlue', 'text-white');
                btn.classList.remove('bg-white', 'text-slate-600');

                const filter = btn.textContent.trim().toLowerCase();
                
                items.forEach(item => {
                    if (filter.includes('all')) {
                        item.style.display = 'block';
                    } else if (item.dataset.category && item.dataset.category.includes(filter)) {
                        item.style.display = 'block';
                    } else {
                        item.style.display = 'none';
                    }
                });
            });
        });

        // Lightbox
        const expands = document.querySelectorAll('.fa-expand');
        const playBtns = document.querySelectorAll('.masonry-item .fa-play');
        
        const createLightbox = (src, isVideo) => {
            const overlay = document.createElement('div');
            overlay.className = 'fixed inset-0 z-[200] bg-black/90 backdrop-blur-md flex items-center justify-center cursor-pointer p-4';
            
            const content = isVideo 
                ? `<div class="text-white text-center"><i class="fa-solid fa-play text-6xl text-brandGold mb-4"></i><p>Video playback simulated.</p></div>` 
                : `<img src="${src}" class="max-w-full max-h-full rounded-2xl shadow-2xl cursor-default" />`;
            
            overlay.innerHTML = `
                <button class="absolute top-6 right-6 text-white text-3xl hover:text-brandGold transition-colors"><i class="fa-solid fa-xmark"></i></button>
                ${content}
            `;
            
            document.body.appendChild(overlay);
            document.body.style.overflow = 'hidden';
            
            overlay.addEventListener('click', (e) => {
                if (e.target === overlay || e.target.closest('button')) {
                    overlay.remove();
                    document.body.style.overflow = '';
                }
            });
        };

        expands.forEach(ex => {
            ex.closest('.w-10').addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                const img = ex.closest('.masonry-item').querySelector('img');
                if (img) createLightbox(img.src, false);
            });
        });
        
        playBtns.forEach(pb => {
            pb.closest('.w-16, .masonry-item').addEventListener('click', (e) => {
                e.preventDefault();
                createLightbox('', true);
            });
        });

        // Load More
        const loadMore = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('Load More Images'));
        if (loadMore) {
            loadMore.addEventListener('click', () => {
                loadMore.innerHTML = '<i class="fa-solid fa-spinner fa-spin mr-2"></i> Loading...';
                setTimeout(() => {
                    loadMore.innerHTML = '<i class="fa-solid fa-check mr-2"></i> All Images Loaded';
                    loadMore.disabled = true;
                }, 1500);
            });
        }
    }

    // 4. Courses Filtering and Search
    const searchInput = document.querySelector('input[placeholder*="Search trades"]');
    if (searchInput) {
        const cBtns = Array.from(document.querySelectorAll('button')).filter(b => 
            ['All Trades', 'Engineering', 'Non-Engineering', 'Short-term'].some(t => b.textContent.includes(t))
        );
        const courseCards = document.querySelectorAll('.grid > .bg-white.rounded-\\[2rem\\]'); // Selects the cards
        
        const filterCourses = () => {
            const query = searchInput.value.toLowerCase();
            const activeFilterBtn = cBtns.find(b => b.classList.contains('bg-brandBlue'))?.textContent.trim().toLowerCase() || 'all trades';
            
            courseCards.forEach(card => {
                const title = card.querySelector('h3').textContent.toLowerCase();
                const category = card.dataset.category || '';
                
                const matchesSearch = title.includes(query);
                const matchesCategory = activeFilterBtn.includes('all') || category.includes(activeFilterBtn);
                
                if (matchesSearch && matchesCategory) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        };

        searchInput.addEventListener('input', filterCourses);

        cBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                cBtns.forEach(b => {
                    b.classList.remove('bg-brandBlue', 'text-white');
                    b.classList.add('bg-slate-100', 'text-slate-600');
                });
                btn.classList.add('bg-brandBlue', 'text-white');
                btn.classList.remove('bg-slate-100', 'text-slate-600');
                filterCourses();
            });
        });
    }

    // 5. Student Corner specific interactions
    const loadOlderNotices = document.querySelector('a:contains("Load Older Notices")');
    if (loadOlderNotices) {
        // Wait, :contains doesn't work in querySelector.
    }
    const loadOlder = Array.from(document.querySelectorAll('a')).find(a => a.textContent.includes('Load Older Notices'));
    if(loadOlder) {
        loadOlder.addEventListener('click', (e) => {
            e.preventDefault();
            loadOlder.innerHTML = '<i class="fa-solid fa-spinner fa-spin mr-2"></i> Fetching...';
            setTimeout(() => {
                alert('No more older notices available in the archives.');
                loadOlder.innerHTML = 'Load Older Notices <i class="fa-solid fa-chevron-down ml-1"></i>';
            }, 1000);
        });
    }

    // 6. User Login State Management
    const userEmail = localStorage.getItem('userEmail');
    if (userEmail) {
        // Change Desktop Login CTA
        const loginCta = document.querySelector('.hidden.lg\\:block a[href="login.html"]');
        if (loginCta) {
            // Extract the username part from email if possible to keep it short
            const displayName = userEmail.split('@')[0];
            
            loginCta.innerHTML = `<i class="fa-solid fa-user-circle"></i> <span class="max-w-[100px] truncate" title="${userEmail}">${displayName}</span>`;
            loginCta.href = "#";
            loginCta.addEventListener('click', (e) => e.preventDefault());
            loginCta.classList.remove('hover:-translate-y-1', 'hover:bg-blue-800');
            loginCta.classList.add('cursor-default', 'hover:bg-brandBlue');
            
            // Add a logout button next to it
            const logoutBtn = document.createElement('button');
            logoutBtn.innerHTML = '<i class="fa-solid fa-sign-out-alt"></i>';
            logoutBtn.className = 'ml-3 bg-white text-red-600 text-sm font-semibold w-10 h-10 rounded-full hover:bg-red-50 transition-all shadow-soft border border-slate-200 flex items-center justify-center';
            logoutBtn.title = 'Logout';
            logoutBtn.addEventListener('click', (e) => {
                e.preventDefault();
                localStorage.removeItem('userEmail');
                localStorage.removeItem('adminToken');
                window.location.reload();
            });
            loginCta.parentElement.classList.add('flex', 'items-center');
            loginCta.parentElement.appendChild(logoutBtn);
        }

        // Change Mobile Login Link
        const mobileLogin = document.querySelector('nav a[href="login.html"]');
        if (mobileLogin) {
            const displayName = userEmail.split('@')[0];
            mobileLogin.innerHTML = `<i class="fa-solid fa-user-circle"></i> ${displayName}`;
            mobileLogin.href = "#";
            mobileLogin.addEventListener('click', (e) => e.preventDefault());
            mobileLogin.classList.remove('hover:text-brandBlue', 'lg:hidden');
            mobileLogin.classList.add('text-brandBlue', 'font-bold', 'lg:hidden');
            
            const mobileLogout = document.createElement('a');
            mobileLogout.href = "#";
            mobileLogout.className = "lg:hidden text-red-500 hover:text-red-700 transition-colors pb-1 border-b-2 border-transparent mt-2 block";
            mobileLogout.innerHTML = '<i class="fa-solid fa-sign-out-alt"></i> Logout';
            mobileLogout.addEventListener('click', (e) => {
                e.preventDefault();
                localStorage.removeItem('userEmail');
                localStorage.removeItem('adminToken');
                window.location.reload();
            });
            mobileLogin.parentElement.appendChild(mobileLogout);
        }
    }

});
