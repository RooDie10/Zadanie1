// Import z bazy leaflet
import L from 'leaflet';

// Tworzę mapę
const map = L.map('map').setView([51.505, -0.09], 13);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
}).addTo(map);

let marker;
const placeForm = document.getElementById('place-form');
const nameInput = document.getElementById('name');
const descriptionInput = document.getElementById('description');
const coordinatesInput = document.getElementById('coordinates');

function onMapDoubleClick(e) {
    // Usuwanie istniejącego markeru
    if (marker) {
        map.removeLayer(marker);
    }

    // Nowy marker
    marker = L.marker(e.latlng, { draggable: true }).addTo(map).bindPopup('Место').openPopup();

    // Aktualizacja
    coordinatesInput.value = `${e.latlng.lat}, ${e.latlng.lng}`;

    marker.on('dragend', (event) => {
        const markerLatLng = event.target.getLatLng();
        coordinatesInput.value = `${markerLatLng.lat}, ${markerLatLng.lng}`;
    });
    placeForm.style.display = 'block';
}

placeForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = nameInput.value;
    const description = descriptionInput.value;
    const coordinates = coordinatesInput.value;

    // Robię chmurę
    const popupContent = `<b>${name}</b><br>${description}<br>Координаты: ${coordinates}`;
    marker.setPopupContent(popupContent);
});
map.on('dblclick', onMapDoubleClick);