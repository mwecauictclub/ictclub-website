// Quotes functionality
const QUOTES_URL = 'https://raw.githubusercontent.com/mwecauictclub/mwecauictclub/main/QUOTES.md';

function parseQuotes(content) {
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
    
    return quotes;
}

async function getQuotes() {
    try {
        const response = await fetch(QUOTES_URL);
        if (!response.ok) throw new Error('Failed to fetch quotes');
        const content = await response.text();
        return parseQuotes(content);
    } catch (error) {
        console.error('Error fetching quotes:', error);
        return [];
    }
}

async function renderQuotesCarousel() {
    const list = document.getElementById('quotes-list');
    if (!list) return;
    
    try {
        const quotes = await getQuotes();
        
        if (quotes.length === 0) {
            list.innerHTML = `
                <li class="splide__slide">
                    <div class="bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-center max-w-3xl mx-auto">
                        <p class="text-white text-xl">No quotes available yet.</p>
                    </div>
                </li>
            `;
            return;
        }
        
        const randomQuotes = quotes.sort(() => 0.5 - Math.random()).slice(0, Math.min(3, quotes.length));
        
        list.innerHTML = randomQuotes.map(quote => `
            <li class="splide__slide">
                <div class="bg-white/10 backdrop-blur-sm rounded-2xl p-8 md:p-12 text-center max-w-3xl mx-auto">
                    <div class="text-6xl text-orange mb-4">"</div>
                    <p class="text-white text-xl md:text-2xl mb-6 italic leading-relaxed">${quote.quote}</p>
                    <div class="flex flex-col items-center gap-2">
                        <p class="text-white font-bold text-lg">${quote.name}</p>
                        ${quote.role || quote.year ? `
                            <div class="flex items-center gap-2">
                                ${quote.role ? `<p class="text-white/70">${quote.role}</p>` : ''}
                                ${quote.year && quote.role ? `<span class="text-white/50">·</span>` : ''}
                                ${quote.year ? `<p class="text-white/70">${quote.year}</p>` : ''}
                            </div>
                        ` : ''}
                    </div>
                </div>
            </li>
        `).join('');
        
        if (window.Splide) {
            new Splide('#quotes-carousel', {
                type: 'loop',
                perPage: 1,
                autoplay: true,
                interval: 5000,
                arrows: false,
                pagination: true,
            }).mount();
        }
    } catch (error) {
        console.error('Error rendering quotes carousel:', error);
    }
}

if (document.getElementById('quotes-list')) {
    renderQuotesCarousel();
}
