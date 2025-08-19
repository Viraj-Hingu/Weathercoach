//  mapview
 var map = L.map('map').setView([22.9734, 78.6569], 5);

    L.tileLayer('your api key', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      maxZoom: 18,
    }).addTo(map);

    L.marker([28.6139, 77.2090]).addTo(map)
      .bindPopup("New Delhi, India")
      .openPopup();

// contactpage map
      var map = L.map('map').setView([37.75, -122.44], 13); 
  L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; <a href="https://carto.com/">CARTO</a> | OpenStreetMap contributors',
    subdomains: 'abcd',
    maxZoom: 19
  }).addTo(map);

 
  L.marker([37.75, -122.44])
    .addTo(map)
    .bindPopup('This is Noe Valley, SF');


