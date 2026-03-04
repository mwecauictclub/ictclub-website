// Quotes page full render

async function renderAllQuotesPage() {
    const container = document.getElementById('quotes-grid');
    if (!container) return;
    
    try {
        const response = await fetch('https://raw.githubusercontent.com/mwecauictclub/mwecauictclub/main/QUOTES.md');
        if (!response.ok) throw new Error('Failed to fetch quotes');
        const content = await response.text();
        
        // Parse quotes
        const quotes = [];
        const blocks = content.split('---').filter(block => block.trim());
        
        blocks.forEach(block => {
            const lines = block.trim().split('\n');
            const quote = {};
            
            lines.forEach(line => {
                const match = line.match(/^(\w+):\s*(.+)$/);
                if (match) {
                    const [, key, value] = match;
                    quote[key] = value.replace(/^["']|["']$/g, '');
                }
            });
            
            if (quote.quote && quote.name) {
                quotes.push(quote);
            }
        });
        
        if (quotes.length === 0) {
            container.innerHTML = '<div class="text-center py-12"><p class="text-text-muted">No quotes available yet.</p></div>';
            return;
        }
        
        container.innerHTML = quotes.map((quote, index) => `
            <div class="bg-white border border-gray-200 rounded-2xl p-8 hover:shadow-lg transition-all break-inside-avoid mb-6" data-aos="fade-up" data-aos-delay="${Math.min((index + 1) * 50, 500)}">
                <div class="text-5xl text-blue-light mb-4">"</div>
                <p class="text-text text-lg mb-6 italic leading-relaxed">${quote.quote}</p>
                <div class="flex items-start justify-between flex-wrap gap-2">
                    <div>
                        <p class="font-bold text-lg">${quote.name}</p>
                        ${quote.role ? `<p class="text-text-muted text-sm">${quote.role}</p>` : ''}
                        ${quote.year ? `<p class="text-text-muted text-sm">${quote.year}</p>` : ''}
                    </div>
                    ${quote.type === 'alumni' ? 
                        '<span class="inline-block bg-orange text-white px-3 py-1 rounded-full text-xs font-mono uppercase">Alumni</span>' : 
                        quote.type === 'current' ? 
                        '<span class="inline-block bg-blue-light text-white px-3 py-1 rounded-full text-xs font-mono uppercase">Current</span>' : 
                        ''
                    }
                </div>
            </div>
        `).join('');
        
        AOS.refresh();
    } catch (error) {
        console.error('Error rendering quotes:', error);
        container.innerHTML = '<div class="text-center py-12"><p class="text-text-muted">Failed to load quotes.</p></div>';
    }
}

if (document.getElementById('quotes-grid')) {
    renderAllQuotesPage();
}
