fetch('profile.json')
  .then(response => response.json())
  .then(data => {
    // Nombre y afiliación
    document.getElementById('name').textContent = data.name;
    document.getElementById('affiliation').textContent = data.affiliation;

    // Índices
    const stats = document.getElementById('stats');
    stats.innerHTML = `<strong>Índice h:</strong> ${data.h_index} · <strong>Citas:</strong> ${data.citedby}`;

    // Publicaciones
    const pubList = document.getElementById('publication-list');
    pubList.innerHTML = '';
    data.publications.forEach(pub => {
      const div = document.createElement('div');
      div.className = 'pub-card';
      const enlace = pub.url ? `<a href="${pub.url}" target="_blank">${pub.title}</a>` : pub.title;
      div.innerHTML = `<strong>${pub.year || 's.f.'}</strong><br>${enlace}`;
      pubList.appendChild(div);
    });
  })
  .catch(error => {
    console.error('Error cargando datos:', error);
  });
