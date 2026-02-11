showMap();

function showMap() {
  const map = L.map("map").setView([43.63847, 1.39312], 10);
  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 15,
    attribution:
      '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  }).addTo(map);
  const marker = L.marker([43.63847, 1.39312]).bindPopup('Bienvenue chez oCoffee!').addTo(map);
}
