const QUOTES_URL = 'https://raw.githubusercontent.com/mwecauictclub/mwecauictclub/main/QUOTES.json';

async function getQuotes() {
    try {
        const response = await fetch(QUOTES_URL, { cache: 'no-cache' });
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        return await response.json();
    } catch (error) {
        console.error('Error fetching quotes:', error);
        return [];
    }
}

async function renderQuotesCarousel() {
    const list = document.getElementById('quotes-list');
    if (!list) return;

    const quotes = await getQuotes();

    if (quotes.length === 0) {
        list.innerHTML = `
            <li class="splide__slide">
                <div class="bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-center max-w-3xl mx-auto">
                    <p class="text-white text-xl">No quotes available yet.</p>
                </div>
            </li>`;
        return;
    }

    const picked = quotes.sort(() => 0.5 - Math.random()).slice(0, Math.min(3, quotes.length));

    list.innerHTML = picked.map(quote => `
        <li class="splide__slide">
            <div class="bg-white/10 backdrop-blur-sm rounded-2xl p-8 md:p-12 text-center max-w-3xl mx-auto">
                <div class="text-6xl text-orange mb-4">"</div>
                <p class="text-white text-xl md:text-2xl mb-6 italic leading-relaxed">${quote.quote}</p>
                <div class="flex flex-col items-center gap-2">
                    <p class="text-white font-bold text-lg">${quote.name}</p>
                    ${quote.role || quote.year ? `
                        <div class="flex items-center gap-2">
                            ${quote.role ? `<p class="text-white/70">${quote.role}</p>` : ''}
                            ${quote.role && quote.year ? `<span class="text-white/50">·</span>` : ''}
                            ${quote.year ? `<p class="text-white/70">${quote.year}</p>` : ''}
                        </div>` : ''}
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
}

if (document.getElementById('quotes-list')) {
    renderQuotesCarousel();
}