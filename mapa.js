// Definir atributos iniciales para el Mapa
const MAP_ZOOM = 4
const MAP_CENTER = [-38.593745547, -72.391516408]
const MAP_ARICA = [-18.490253944816949, -69.657523966675882]
const MAP_TARAPACA = [-20.1191162753, -69.4336023578]
const MAP_ANTOFAGASTA = [-23.3782313092, -69.1480070857]
const MAP_ATACAMA = [-27.2239527887, -69.8997450836]
const MAP_COQUIMBO = [-30.5261981153, -70.9329512531]
const MAP_VALPARAISO = [-32.5956678436, -70.8965991178]
const MAP_METROPOLITANA = [-33.4926533461, -70.6529922171]
const MAP_OHIGGINS = [-34.452385399, -71.1148483746]
const MAP_MAULE = [-35.226595065, -71.4255053727]
const MAP_BIOBIO = [-37.0310738688, -72.3054425598]
const MAP_ARAUCANIA = [-38.593745547, -72.391516408]
const MAP_LOSRIOS = [-39.9917850035, -72.6504343598]
const MAP_LOSLAGOS = [-41.3892876083, -72.8980199703]
const MAP_AYSEN = [-45.9492280455, -73.1791679687]
const MAP_MAGALLANES = [-51.8507046991, -72.3431685686]

const MAP_RADIUS1 = 3
const MAP_RADIUS2 = 6
const MAP_RADIUS3 = 9
const MAP_RADIUS4 = 12
const MAP_RADIUS5 = 20


// Crear instancia del Mapa
var map = L.map('myMap').setView(MAP_CENTER, MAP_ZOOM)

// Crear capa de sectores y Copyright del Mapa
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map)


// Región de Arica y Parinacota
L.circleMarker(MAP_ARICA, { radius: MAP_RADIUS2 }).addTo(map)
.bindPopup('Región de Arica y Parinacota: 1269 defunciones')

// Región de Región de Tarapacá
L.circleMarker(MAP_TARAPACA, { radius: MAP_RADIUS2 }).addTo(map)
.bindPopup('Región de Tarapacá: 1437 defunciones')

// Región de Antofagasta
L.circleMarker(MAP_ANTOFAGASTA, { radius: MAP_RADIUS1 }).addTo(map)
.bindPopup('Región de Antofagasta: 305 defunciones')

// Región de Atacama
L.circleMarker(MAP_ATACAMA, { radius: MAP_RADIUS2 }).addTo(map)
.bindPopup('Región de Atacama: 1528 defunciones')

// Región de Coquimbo
L.circleMarker(MAP_COQUIMBO, { radius: MAP_RADIUS3 }).addTo(map)
.bindPopup('Región de Coquimbo: 4297 defunciones')

// Región Metropolitana de Santiago
L.circleMarker(MAP_METROPOLITANA, { radius: MAP_RADIUS5 }).addTo(map)
.bindPopup('Región Metropolitana de Santiago: 39283 defunciones')

// Región de Valparaíso
L.circleMarker(MAP_VALPARAISO, { radius: MAP_RADIUS4 }).addTo(map)
.bindPopup('Región de Valparaíso: 12377 defunciones')

// Región de Magallanes y de la Antártica Chilena
L.circleMarker(MAP_MAGALLANES, { radius: MAP_RADIUS2 }).addTo(map)
.bindPopup('Región de Magallanes y de la Antártica Chilena: 1069 defunciones')

// Región del Libertador Bernardo O’ Higgins
L.circleMarker(MAP_OHIGGINS, { radius: MAP_RADIUS3 }).addTo(map)
.bindPopup('Región del Libertador Bernardo O’ Higgins: 5556 defunciones')

// Región de la Araucanía
L.circleMarker(MAP_ARAUCANIA, { radius: MAP_RADIUS3 }).addTo(map)
.bindPopup('Región de la Araucanía: 6563 defunciones')

// Región del Biobío
L.circleMarker(MAP_BIOBIO, { radius: MAP_RADIUS4 }).addTo(map)
.bindPopup('Región del Biobío: 12803 defunciones')

// Región del Maule
L.circleMarker(MAP_MAULE, { radius: MAP_RADIUS3 }).addTo(map)
.bindPopup('Región del Maule: 6573 defunciones')

// Región de los Lagos
L.circleMarker(MAP_LOSLAGOS, { radius: MAP_RADIUS3 }).addTo(map)
.bindPopup('Región de los Lagos: 5054 defunciones')

// Región de Aisén del General Carlos Ibáñez del campo
L.circleMarker(MAP_AYSEN, { radius: MAP_RADIUS1 }).addTo(map)
.bindPopup('Región de Aisén del General Carlos Ibáñez del campo: 477 defunciones')

// Región de los Ríos
L.circleMarker(MAP_LOSRIOS, { radius: MAP_RADIUS1 }).addTo(map)
.bindPopup('Región de los Ríos: 269 defunciones')


// Se establece una constante como referencia para mostrar "Información Adicional"
const mas_info = document.getElementById("mas_info")

function MostrarDato(feature, layer) {
  // Se valida si el objeto tiene la propiedad "properties"
  if (feature.properties) {
    let dato_a_mostrar = `<p>
      <h5>Region: ${feature.properties.region}</h5><br/>
      <span><b>Defunciones</b>: ${feature.properties.defunciones}</span><br/>
    </p>`
    layer.bindPopup(dato_a_mostrar);
    layer.on({
      click: (event)=>{
        // Se obtienen los datos desde las propiedades del JSON
        let Region = event.target.feature.properties.Region
        let Defunciones = event.target.feature.properties.Defunciones


        // Se genera el HTML para representar la acción de Click sobre un marcador
        let html_defunciones = `
          <div class="alert alert-primary" role="alert">
            <p>
              Defunciones para la región: ${Region} <br/>
              Def Arica: <span class=>${Defunciones}</span> <br/>
            </p>
          </div>
        `
        // Se "escribe" el HTML en la página
        mas_info.innerHTML = html_defunciones
      }
    })
  }
}

// Se agrega data al Mapa
d3.json=('./mapa.json')
  .then=((geojson) => {
    L.geoJSON(geojson, {
      onEachFeature: MostrarDato,
      pointToLayer: function (geoJsonPoint, latlng) {
        return L.circleMarker(latlng).bindPopup(`Region: ${geoJsonPoint.Region}`)
      },
      style: function (geoJsonPoint) {
        let color = (geoJsonPoint.Region > 20) ? 'red' : 'green'
        return { fillColor: color}
      }
    }).addTo(map)
  })