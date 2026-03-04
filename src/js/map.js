// Leaflet Map initialization

if (document.getElementById('map')) {
    // MWECAU coordinates (approximate)
    const mwecauLat = -3.3488;
    const mwecauLng = 37.3392;
    
    // Initialize map
    const map = L.map('map').setView([mwecauLat, mwecauLng], 15);
    
    // Add OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 19
    }).addTo(map);
    
    // Add marker
    const marker = L.marker([mwecauLat, mwecauLng]).addTo(map);
    
    // Add popup
    marker.bindPopup(`
        <div class="text-center p-2">
            <strong class="font-bold">MWECAU ICT Club</strong><br>
            <span class="text-sm">Mwenge Catholic University</span><br>
            <span class="text-xs text-gray-600">Moshi, Kilimanjaro</span>
        </div>
    `).openPopup();
    
    // Custom marker icon (optional)
    const customIcon = L.icon({
        iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-orange.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
    });
    
    marker.setIcon(customIcon);
}
