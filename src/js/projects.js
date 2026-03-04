// Projects page functionality

let currentFilter = 'All';

// Filter button styles
function updateFilterButtons(activeLang) {
    document.querySelectorAll('.filter-btn').forEach(btn => {
        if (btn.dataset.lang === activeLang) {
            btn.classList.add('active', 'bg-orange', 'text-white');
            btn.classList.remove('bg-gray-100', 'text-text');
        } else {
            btn.classList.remove('active', 'bg-orange', 'text-white');
            btn.classList.add('bg-gray-100', 'text-text');
        }
    });
}

// Render projects with filter
async function renderProjects(filterLang = 'All') {
    const container = document.getElementById('projects-grid');
    if (!container) return;
    
    container.innerHTML = `
        <div class="col-span-full text-center py-12">
            <div class="inline-block w-8 h-8 border-4 border-orange border-t-transparent rounded-full animate-spin"></div>
            <p class="text-text-muted mt-4">Loading projects...</p>
        </div>
    `;
    
    try {
        const response = await fetch('https://api.github.com/users/mwecauictclub/repos?sort=updated&per_page=100');
        if (!response.ok) throw new Error('Failed to fetch repositories');
        let repos = await response.json();
        repos = repos.filter(repo => !repo.fork);
        
        if (filterLang !== 'All') {
            if (filterLang === 'Other') {
                repos = repos.filter(repo => 
                    !['HTML', 'Python', 'JavaScript', 'PHP'].includes(repo.language)
                );
            } else {
                repos = repos.filter(repo => repo.language === filterLang);
            }
        }
        
        if (repos.length === 0) {
            container.innerHTML = '<div class="col-span-full text-center py-12"><p class="text-text-muted">No projects found for this language.</p></div>';
            return;
        }
        
        function getLanguageColor(language) {
            const colors = {
                'JavaScript': '#f1e05a',
                'Python': '#3572A5',
                'HTML': '#e34c26',
                'CSS': '#563d7c',
                'PHP': '#4F5D95',
            };
            return colors[language] || '#888888';
        }
        
        function formatDate(dateString) {
            const date = new Date(dateString);
            const now = new Date();
            const diff = now - date;
            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            
            if (days === 0) return 'today';
            if (days === 1) return 'yesterday';
            if (days < 30) return `${days} days ago`;
            if (days < 365) return `${Math.floor(days / 30)} months ago`;
            return `${Math.floor(days / 365)} years ago`;
        }
        
        container.innerHTML = repos.map((repo, index) => `
            <div class="bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-lg transition-all" data-aos="fade-up" data-aos-delay="${Math.min((index + 1) * 50, 500)}">
                <div class="flex items-start justify-between mb-4">
                    <h3 class="font-bold text-xl">${repo.name}</h3>
                    ${repo.language ? `
                        <span class="flex items-center gap-1 text-sm">
                            <span class="w-3 h-3 rounded-full" style="background-color: ${getLanguageColor(repo.language)}"></span>
                            ${repo.language}
                        </span>
                    ` : ''}
                </div>
                <p class="text-text-muted mb-4 line-clamp-2">${repo.description || 'No description provided.'}</p>
                <div class="flex items-center gap-4 text-sm text-text-muted mb-4">
                    <span class="flex items-center gap-1">
                        <i data-lucide="star" class="w-4 h-4"></i>
                        ${repo.stargazers_count}
                    </span>
                    <span class="flex items-center gap-1">
                        <i data-lucide="git-fork" class="w-4 h-4"></i>
                        ${repo.forks_count}
                    </span>
                    <span class="flex items-center gap-1">
                        <i data-lucide="clock" class="w-4 h-4"></i>
                        ${formatDate(repo.updated_at)}
                    </span>
                </div>
                <a href="${repo.html_url}" target="_blank" class="text-orange hover:text-orange-warm font-medium flex items-center gap-1">
                    View on GitHub
                    <i data-lucide="external-link" class="w-4 h-4"></i>
                </a>
            </div>
        `).join('');
        
        lucide.createIcons();
        AOS.refresh();
    } catch (error) {
        console.error('Error rendering projects:', error);
        container.innerHTML = '<div class="col-span-full text-center py-12"><p class="text-text-muted">Failed to load projects.</p></div>';
    }
}

// Initialize filter buttons
document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const lang = btn.dataset.lang;
        currentFilter = lang;
        updateFilterButtons(lang);
        renderProjects(lang);
    });
});

// Initial load
updateFilterButtons('All');
renderProjects('All');
