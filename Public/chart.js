mapboxgl.accessToken = 'pk.eyJ1IjoieWFzaHdhbnRoMjUyMiIsImEiOiJjbTVuaHNndWowYWRyMmtzODE2MWo1ODczIn0.YBHuX5JRw-O4qqj-T-lzoQ';

async function loadMigrationData() {
  const response = await fetch('/migration-data');
  const data = await response.json();

  // Map Initialization
  const map = new mapboxgl.Map({
    container: 'migration-map',
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [0, 0],
    zoom: 2,
  });

  data.forEach(point => {
    new mapboxgl.Marker()
      .setLngLat([parseFloat(point.longitude), parseFloat(point.latitude)])
      .setPopup(new mapboxgl.Popup().setText(`${point.species} - ${point.datetime}`))
      .addTo(map);
  });

  // Population Chart
  const speciesCount = {};
  data.forEach(point => {
    speciesCount[point.species] = (speciesCount[point.species] || 0) + 1;
  });

  const ctx = document.getElementById('populationchart').getContext('2d');
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: Object.keys(speciesCount),
      datasets: [{
        label: 'Population Count by Species',
        data: Object.values(speciesCount),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgb(75, 192, 91)',
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      scales: {
        y: { beginAtZero: true }
      }
    }
  });
}

loadMigrationData();
