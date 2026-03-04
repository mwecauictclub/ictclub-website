// GitHub API functions
const GITHUB_ORG = 'mwecauictclub';
const GITHUB_API_BASE = 'https://api.github.com';

async function getRepos() {
    try {
        const response = await fetch(`${GITHUB_API_BASE}/users/${GITHUB_ORG}/repos?sort=updated&per_page=100`);
        if (!response.ok) throw new Error('Failed to fetch repositories');
        const repos = await response.json();
        return repos.filter(repo => !repo.fork);
    } catch (error) {
        console.error('Error fetching repos:', error);
        return [];
    }
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

async function renderFeaturedProjects() {
    const container = document.getElementById('featured-projects');
    if (!container) return;
    
    try {
        const repos = await getRepos();
        const featured = repos.slice(0, 3);
        
        if (featured.length === 0) {
            container.innerHTML = '<div class="col-span-3 text-center py-12"><p class="text-text-muted">No projects found.</p></div>';
            return;
        }
        
        container.innerHTML = featured.map((repo, index) => `
            <div class="bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-lg transition-all" data-aos="fade-up" data-aos-delay="${(index + 1) * 100}">
                <div class="flex items-start justify-between mb-4">
                    <h3 class="font-bold text-xl">${repo.name}</h3>
                    ${repo.language ? `
                        <span class="flex items-center gap-1 text-sm">
                            <span class="w-3 h-3 rounded-full" style="background-color: ${getLanguageColor(repo.language)}"></span>
                            ${repo.language}
                        </span>
                    ` : ''}
                </div>
                <p class="text-text-muted mb-4">${repo.description || 'No description provided.'}</p>
                <div class="flex items-center justify-between">
                    <div class="flex items-center gap-4 text-sm text-text-muted">
                        <span class="flex items-center gap-1">
                            <i data-lucide="star" class="w-4 h-4"></i>
                            ${repo.stargazers_count}
                        </span>
                        <span class="flex items-center gap-1">
                            <i data-lucide="git-fork" class="w-4 h-4"></i>
                            ${repo.forks_count}
                        </span>
                    </div>
                    <a href="${repo.html_url}" target="_blank" class="text-orange hover:text-orange-warm font-medium flex items-center gap-1">
                        View
                        <i data-lucide="arrow-right" class="w-4 h-4"></i>
                    </a>
                </div>
            </div>
        `).join('');
        
        lucide.createIcons();
        AOS.refresh();
    } catch (error) {
        console.error('Error rendering featured projects:', error);
        container.innerHTML = '<div class="col-span-3 text-center py-12"><p class="text-text-muted">Failed to load projects.</p></div>';
    }
}

if (document.getElementById('featured-projects')) {
    renderFeaturedProjects();
}
