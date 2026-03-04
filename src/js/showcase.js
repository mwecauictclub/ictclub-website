// Showcase page functionality

let currentCategory = 'All';

// Render project cards
function renderProjects(category = 'All') {
    const container = document.getElementById('projects-showcase');
    if (!container) return;
    
    const filteredProjects = category === 'All' 
        ? clubProjects 
        : clubProjects.filter(p => p.category === category);
    
    if (filteredProjects.length === 0) {
        container.innerHTML = '<div class="col-span-full text-center py-12"><p class="text-text-muted">No projects in this category yet.</p></div>';
        return;
    }
    
    container.innerHTML = filteredProjects.map((project, index) => `
        <div class="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all cursor-pointer group" 
             data-aos="fade-up" 
             data-aos-delay="${index * 100}"
             onclick="openProjectModal(${project.id})">
            <div class="h-48 bg-gradient-to-br from-blue-light to-blue-deep flex items-center justify-center">
                <i data-lucide="folder-open" class="w-16 h-16 text-white/50"></i>
            </div>
            <div class="p-6">
                <div class="flex items-center justify-between mb-3">
                    <span class="text-xs font-mono uppercase tracking-wider text-orange">${project.category}</span>
                    <span class="text-xs px-2 py-1 rounded-full ${project.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}">${project.status}</span>
                </div>
                <h3 class="font-serif text-xl font-bold mb-2 group-hover:text-blue-light transition-colors">${project.title}</h3>
                <p class="text-text-muted text-sm mb-4 line-clamp-2">${project.shortDesc}</p>
                <div class="flex flex-wrap gap-2 mb-4">
                    ${project.techStack.slice(0, 3).map(tech => `
                        <span class="text-xs px-2 py-1 bg-blue-light/10 text-blue-light rounded-full">${tech}</span>
                    `).join('')}
                    ${project.techStack.length > 3 ? `<span class="text-xs px-2 py-1 bg-gray-100 text-text-muted rounded-full">+${project.techStack.length - 3}</span>` : ''}
                </div>
                <div class="flex items-center justify-between">
                    <div class="flex items-center gap-2">
                        ${project.githubUrl ? '<i data-lucide="github" class="w-4 h-4 text-text-muted"></i>' : ''}
                        ${project.liveUrl ? '<i data-lucide="external-link" class="w-4 h-4 text-text-muted"></i>' : ''}
                        <span class="text-xs text-text-muted font-mono">${project.year}</span>
                    </div>
                    <span class="text-blue-light font-medium text-sm flex items-center gap-1">
                        Learn more
                        <i data-lucide="arrow-right" class="w-4 h-4"></i>
                    </span>
                </div>
            </div>
        </div>
    `).join('');
    
    lucide.createIcons();
    AOS.refresh();
}

// Open project modal
function openProjectModal(projectId) {
    const project = clubProjects.find(p => p.id === projectId);
    if (!project) return;
    
    const modal = document.getElementById('project-modal');
    const modalContent = document.getElementById('modal-content');
    
    modalContent.innerHTML = `
        <div class="relative">
            <button onclick="closeProjectModal()" class="absolute top-4 right-4 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-100 transition-all z-10">
                <i data-lucide="x" class="w-5 h-5"></i>
            </button>
            
            <div class="h-64 bg-gradient-to-br from-blue-light to-blue-deep flex items-center justify-center">
                <i data-lucide="folder-open" class="w-24 h-24 text-white/50"></i>
            </div>
            
            <div class="p-8">
                <div class="flex items-center gap-3 mb-4">
                    <span class="text-sm font-mono uppercase tracking-wider text-orange">${project.category}</span>
                    <span class="text-xs px-3 py-1 rounded-full ${project.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}">${project.status}</span>
                </div>
                
                <h2 class="font-serif text-4xl font-bold mb-3">${project.title}</h2>
                <p class="text-text-muted mb-6">${project.shortDesc}</p>
                
                <div class="mb-6">
                    <h3 class="font-bold text-sm uppercase tracking-wider text-text-muted mb-3">About This Project</h3>
                    <p class="text-text leading-relaxed">${project.fullDesc}</p>
                </div>
                
                <div class="mb-6">
                    <h3 class="font-bold text-sm uppercase tracking-wider text-text-muted mb-3">Tech Stack</h3>
                    <div class="flex flex-wrap gap-2">
                        ${project.techStack.map(tech => `
                            <span class="px-3 py-2 bg-blue-light/10 text-blue-light rounded-lg font-mono text-sm">${tech}</span>
                        `).join('')}
                    </div>
                </div>
                
                ${project.githubUrl || project.liveUrl ? `
                <div class="mb-6">
                    <h3 class="font-bold text-sm uppercase tracking-wider text-text-muted mb-3">Links</h3>
                    <div class="flex flex-wrap gap-3">
                        ${project.githubUrl ? `
                        <a href="${project.githubUrl}" target="_blank" class="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-all">
                            <i data-lucide="github" class="w-4 h-4"></i>
                            View on GitHub
                        </a>
                        ` : ''}
                        ${project.liveUrl ? `
                        <a href="${project.liveUrl}" target="_blank" class="inline-flex items-center gap-2 px-4 py-2 bg-blue-light text-white rounded-lg hover:bg-blue-main transition-all">
                            <i data-lucide="external-link" class="w-4 h-4"></i>
                            Live Demo
                        </a>
                        ` : ''}
                    </div>
                </div>
                ` : ''}
                
                <div class="border-t pt-6">
                    <div class="flex items-center justify-between">
                        <span class="text-sm text-text-muted">
                            <i data-lucide="calendar" class="w-4 h-4 inline mr-1"></i>
                            ${project.year}
                        </span>
                        <button onclick="closeProjectModal()" class="bg-orange hover:bg-orange-warm text-white px-6 py-2 rounded-full font-medium transition-all">
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    lucide.createIcons();
    modal.classList.remove('hidden');
    modal.classList.add('flex');
    document.body.style.overflow = 'hidden';
}

// Close project modal
function closeProjectModal() {
    const modal = document.getElementById('project-modal');
    modal.classList.add('hidden');
    modal.classList.remove('flex');
    document.body.style.overflow = 'auto';
}

// Category filter functionality
function updateCategoryButtons(activeCategory) {
    document.querySelectorAll('.category-btn').forEach(btn => {
        if (btn.dataset.category === activeCategory) {
            btn.classList.add('active', 'bg-orange', 'text-white');
            btn.classList.remove('bg-gray-100', 'text-text');
        } else {
            btn.classList.remove('active', 'bg-orange', 'text-white');
            btn.classList.add('bg-gray-100', 'text-text');
        }
    });
}

// Initialize category buttons
document.querySelectorAll('.category-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const category = btn.dataset.category;
        currentCategory = category;
        updateCategoryButtons(category);
        renderProjects(category);
    });
});

// Close modal on outside click
document.getElementById('project-modal')?.addEventListener('click', (e) => {
    if (e.target.id === 'project-modal') {
        closeProjectModal();
    }
});

// Close modal on Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeProjectModal();
    }
});

// Initial load
updateCategoryButtons('All');
renderProjects('All');
