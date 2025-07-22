const timeLabels = ['1pm', '2pm', '3pm', '4pm', '5pm', ];

// Chart 1: Temperature
const tempChart = new Chart(document.getElementById('tempChart'), {
  type: 'line',
  data: {
    labels: timeLabels,
    datasets: [{
      label: 'Temperature (°C)',
      data: [28, 30, 32, 31, 29],
      backgroundColor: 'rgba(255, 99, 132, 0.2)',
      borderColor: 'rgba(255, 99, 132, 1)',
      borderWidth: 2,
      fill: true,
      tension: 0.4,
      pointRadius: 5
    }]
  }
});

// Chart 2: Precipitation
const precipChart = new Chart(document.getElementById('precipChart'), {
  type: 'bar',
  data: {
    labels: timeLabels,
    datasets: [{
      label: 'Precipitation (%)',
      data: [40, 55, 70, 65, 50],
      backgroundColor: 'skyblue'
    }]
  }
});

// Chart 3: Wind
const windChart = new Chart(document.getElementById('windChart'), {
  type: 'bar',
  data: {
    labels: timeLabels,
    datasets: [{
      label: 'Wind Speed (km/h)',
      data: [10, 12, 14, 11, 9],
      backgroundColor: 'lightgreen'
    }]
  }
});

// Tab functionality
document.querySelectorAll('.tab').forEach(tab => {
  tab.addEventListener('click', () => {
    // Tabs active state
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');

    // Chart containers
    document.querySelectorAll('.chart-box').forEach(box => box.classList.add('hidden'));

    const selected = tab.getAttribute('data-chart');
    if (selected === 'temp') document.getElementById('tempBox').classList.remove('hidden');
    if (selected === 'precip') document.getElementById('precipBox').classList.remove('hidden');
    if (selected === 'wind') document.getElementById('windBox').classList.remove('hidden');
    if (selectedChart === 'temp') {
      document.getElementById('tempChart').classList.remove('hidden');
    } else if (selectedChart === 'precip') {
      document.getElementById('precipChart').classList.remove('hidden');
    } else if (selectedChart === 'wind') {
      document.getElementById('windChart').classList.remove('hidden');
    }
  });
});
