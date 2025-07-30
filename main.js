fetch('profile.json')
  .then(response => response.json())
  .then(data => {
    // Actualizar nombre y afiliación
    document.getElementById('name').textContent = data.name;
    document.getElementById('affiliation').textContent = data.affiliation;

    // Mostrar índices académicos
    const stats = document.getElementById('stats');
    stats.innerHTML = `<strong>Índice h:</strong> ${data.h_index} · <strong>Citas:</strong> ${data.citedby}`;

    // Mostrar publicaciones
    const pubList = document.getElementById('publication-list');
    data.publications.forEach(pub => {
      const li = document.createElement('li');
      const link = document.createElement('a');
      link.href = pub.url || '#';
      link.textContent = `${pub.title} (${pub.year || 's.f.'})`;
      link.target = '_blank';
      li.appendChild(link);
      pubList.appendChild(li);
    });
  })
  .catch(error => {
    console.error('Error cargando datos:', error);
  });

