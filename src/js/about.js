// About page functionality

// Load Guardian (Carmel Nkeshimana)
async function loadGuardian() {
    const guardianUsername = 'carmel26';
    
    try {
        const response = await fetch(`https://api.github.com/users/${guardianUsername}`);
        if (!response.ok) throw new Error('Failed to fetch guardian');
        const user = await response.json();
        
        document.getElementById('guardian-avatar').src = user.avatar_url;
        
        // Social links
        const linksContainer = document.getElementById('guardian-links');
        linksContainer.innerHTML = `
            ${user.blog ? `<a href="${user.blog}" target="_blank" class="w-10 h-10 bg-blue-light/10 rounded-full flex items-center justify-center hover:bg-blue-light hover:text-white transition-all"><i data-lucide="globe" class="w-5 h-5"></i></a>` : ''}
            ${user.twitter_username ? `<a href="https://twitter.com/${user.twitter_username}" target="_blank" class="w-10 h-10 bg-blue-light/10 rounded-full flex items-center justify-center hover:bg-blue-light hover:text-white transition-all"><i data-lucide="twitter" class="w-5 h-5"></i></a>` : ''}
            <a href="${user.html_url}" target="_blank" class="w-10 h-10 bg-blue-light/10 rounded-full flex items-center justify-center hover:bg-blue-light hover:text-white transition-all"><i data-lucide="github" class="w-5 h-5"></i></a>
        `;
        
        lucide.createIcons();
    } catch (error) {
        console.error('Error loading guardian:', error);
    }
}

// Load Project Managers
async function loadProjectManagers() {
    const managers = ['cleven12']; // Add more usernames here
    const container = document.getElementById('managers-grid');
    
    try {
        const userPromises = managers.map(username => 
            fetch(`https://api.github.com/users/${username}`).then(r => r.json())
        );
        const users = await Promise.all(userPromises);
        
        container.innerHTML = users.map((user, index) => `
            <div class="bg-white border border-gray-200 rounded-2xl p-8 text-center hover:shadow-lg transition-all" data-aos="fade-up" data-aos-delay="${(index + 1) * 100}">
                <img src="${user.avatar_url}" alt="${user.name || user.login}" class="w-24 h-24 rounded-full mx-auto mb-4">
                <h3 class="font-bold text-xl mb-2">${user.name || user.login}</h3>
                <span class="inline-block bg-orange text-white px-3 py-1 rounded-full text-xs font-mono uppercase mb-4">Project Manager</span>
                <a href="${user.html_url}" target="_blank" class="text-blue-light hover:text-orange transition-colors flex items-center justify-center gap-1">
                    <i data-lucide="github" class="w-4 h-4"></i>
                    View Profile
                </a>
            </div>
        `).join('');
        
        lucide.createIcons();
        AOS.refresh();
    } catch (error) {
        console.error('Error loading managers:', error);
        container.innerHTML = '<div class="col-span-3 text-center py-12"><p class="text-text-muted">Failed to load team.</p></div>';
    }
}

// Load GitHub Contributors
async function loadContributors() {
    const container = document.getElementById('contributors-grid');
    
    try {
        const response = await fetch('https://api.github.com/users/mwecauictclub/repos?per_page=100');
        if (!response.ok) throw new Error('Failed to fetch repos');
        const repos = await response.json();
        
        const contributorsMap = new Map();
        
        for (const repo of repos) {
            try {
                const contribResponse = await fetch(`https://api.github.com/repos/mwecauictclub/${repo.name}/contributors`);
                if (contribResponse.ok) {
                    const contributors = await contribResponse.json();
                    contributors.forEach(c => {
                        if (contributorsMap.has(c.login)) {
                            contributorsMap.get(c.login).contributions += c.contributions;
                        } else {
                            contributorsMap.set(c.login, {
                                login: c.login,
                                avatar_url: c.avatar_url,
                                html_url: c.html_url,
                                contributions: c.contributions
                            });
                        }
                    });
                }
            } catch (err) {
                console.log(`Skipping ${repo.name}:`, err.message);
            }
        }
        
        const contributors = Array.from(contributorsMap.values())
            .sort((a, b) => b.contributions - a.contributions);
        
        if (contributors.length === 0) {
            container.innerHTML = '<div class="col-span-full text-center py-12"><p class="text-text-muted">No contributors found.</p></div>';
            return;
        }
        
        container.innerHTML = contributors.map((contrib, index) => `
            <a href="${contrib.html_url}" target="_blank" class="text-center group" data-aos="fade-up" data-aos-delay="${Math.min((index + 1) * 30, 500)}">
                <img src="${contrib.avatar_url}" alt="${contrib.login}" class="w-20 h-20 rounded-full mx-auto mb-3 ring-4 ring-transparent group-hover:ring-blue-light transition-all">
                <p class="font-medium text-sm mb-1 group-hover:text-blue-light transition-colors">${contrib.login}</p>
                <p class="text-xs text-text-muted font-mono">${contrib.contributions} contributions</p>
            </a>
        `).join('');
        
        AOS.refresh();
    } catch (error) {
        console.error('Error loading contributors:', error);
        container.innerHTML = '<div class="col-span-full text-center py-12"><p class="text-text-muted">Failed to load contributors.</p></div>';
    }
}

// Initialize
if (document.getElementById('guardian-avatar')) {
    loadGuardian();
}

if (document.getElementById('managers-grid')) {
    loadProjectManagers();
}

if (document.getElementById('contributors-grid')) {
    loadContributors();
}
