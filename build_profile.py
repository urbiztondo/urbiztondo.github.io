from scholarly import scholarly
import json
from time import sleep

scholar_id = '9H5lyR4AAAAJ'

# Cargar datos del autor
author = scholarly.search_author_id(scholar_id)
author = scholarly.fill(author, sections=['basics', 'indices','publications'])

output = {
    'name': author.get('name'),
    'affiliation': author.get('affiliation'),
    'h_index': author.get('hindex'),
    'citedby': author.get('citedby'),
    'publications': []
}

# Rellenar publicaciones y ordenarlas por año
print("📚 Obteniendo publicaciones...")

for pub in author['publications']:
    try:
        pub_filled = scholarly.fill(pub)
        title = pub_filled.get('bib', {}).get('title')
        year = pub_filled.get('bib', {}).get('pub_year')
        url = pub_filled.get('pub_url') or ''
        
        if title:
            output['publications'].append({
                'title': title,
                'year': int(year) if year else None,
                'url': url
            })
        
        sleep(1)  # Para evitar bloqueo por parte de Google Scholar

    except Exception as e:
        print(f"⚠️ Error al procesar una publicación: {e}")
        continue

# Ordenamos por año descendente
output['publications'].sort(key=lambda x: x['year'] if x['year'] else 0, reverse=True)

# Guardar en archivo JSON
with open('profile.json', 'w', encoding='utf-8') as f:
    json.dump(output, f, indent=2, ensure_ascii=False)

print("✅ Archivo profile.json actualizado con todas las publicaciones.")

