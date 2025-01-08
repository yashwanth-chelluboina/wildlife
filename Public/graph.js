// graph.js
// Import Chart.js library
const Chart = require('chart.js');

// ✅ Population Chart Initialization
let populationChart;

async function loadPopulationData(filterSpecies = null) {
  // ... graph code ...
  const ctx = document.getElementById('populationChart').getContext('2d');
  populationChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      datasets: [{
        label: 'Population',
        data: [20, 10, 40, 30, 60, 50, 80, 70, 100, 90, 120, 110],
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
}

// ✅ Filter Graph on Button Click
document.getElementById('filterButton').addEventListener('click', () => {
  // ... filter graph code ...
  populationChart.destroy();
  loadPopulationData();
});

// Load initial graph with all data
loadPopulationData();