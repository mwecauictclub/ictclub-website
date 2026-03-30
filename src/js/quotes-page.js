async function renderAllQuotesPage() {
    const container = document.getElementById('quotes-grid');
    if (!container) {
        console.error('quotes-grid element not found');
        return;
    }

    container.innerHTML = `
        <div class="text-center py-12 col-span-full">
            <div class="inline-block w-8 h-8 border-4 border-orange border-t-transparent rounded-full animate-spin"></div>
            <p class="text-text-muted mt-4">Loading quotes...</p>
        </div>`;

    try {
        const response = await fetch(
            'https://raw.githubusercontent.com/mwecauictclub/mwecauictclub/main/QUOTES.json',
            { cache: 'no-cache' }
        );

        if (!response.ok) throw new Error(`HTTP ${response.status}: ${response.statusText}`);

        const quotes = await response.json();

        if (!quotes.length) {
            container.innerHTML = `
                <div class="text-center py-12 col-span-full">
                    <p class="text-text-muted">No quotes yet. Be the first to contribute!</p>
                </div>`;
            return;
        }

        container.innerHTML = quotes.map((quote, index) => `
            <div class="bg-white border border-gray-200 rounded-2xl p-8 hover:shadow-lg transition-all break-inside-avoid mb-6"
                 data-aos="fade-up" data-aos-delay="${Math.min((index + 1) * 50, 500)}">

                <div class="text-6xl leading-none text-blue-light/30 font-serif mb-2">"</div>

                <p class="text-text text-lg italic leading-relaxed mb-6">${quote.quote}</p>

                <div class="flex items-start justify-between flex-wrap gap-2">
                    <div>
                        <p class="font-bold text-base text-text">${quote.name}</p>
                        ${quote.role ? `<p class="text-text-muted text-sm mt-0.5">${quote.role}</p>` : ''}
                        ${quote.year ? `<p class="text-text-muted text-xs mt-0.5 font-mono">${quote.year}</p>` : ''}
                    </div>
                    ${
                        quote.type === 'alumni'
                        ? '<span class="inline-block bg-orange text-white px-3 py-1 rounded-full text-xs font-mono uppercase tracking-wide">Alumni</span>'
                        : quote.type === 'current'
                        ? '<span class="inline-block bg-blue-light text-white px-3 py-1 rounded-full text-xs font-mono uppercase tracking-wide">Current</span>'
                        : ''
                    }
                </div>
            </div>
        `).join('');

        // Re-init AOS for newly rendered elements
        if (typeof AOS !== 'undefined') AOS.refresh();

        // Re-init lucide icons if any inside cards
        if (typeof lucide !== 'undefined') lucide.createIcons();

    } catch (error) {
        console.error('Quotes error:', error);
        container.innerHTML = `
            <div class="text-center py-12 col-span-full">
                <p class="text-red-500 font-bold mb-2">Failed to load quotes</p>
                <p class="text-text-muted text-sm">${error.message}</p>
            </div>`;
    }
}


// Run when DOM is ready
document.addEventListener('DOMContentLoaded', renderAllQuotesPage);