
  const tabs = document.querySelectorAll('.forecast-tabs .tab');
  const contents = document.querySelectorAll('.tab-content');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      contents.forEach(content => content.style.display = 'none');

      const tabId = tab.getAttribute('data-tab');
      document.getElementById(tabId).style.display = 'flex';
    });
  });

  