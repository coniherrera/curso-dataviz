// Definir atributos iniciales para el Mapa
const MAP_ZOOM = 4
const MAP_CENTER = [-38.593745547, -72.391516408]

// Crear instancia del Mapa
var map = L.map('myMap').setView(MAP_CENTER, MAP_ZOOM)

// Crear capa de sectores y Copyright del Mapa
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map)


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
        let Region = event.target.feature.properties.region
        let Defunciones = event.target.feature.properties.defunciones


        // Se genera el HTML para representar la acción de Click sobre un marcador
        let html_defunciones = `
          <div class="alert alert-primary" role="alert">
            <p>
              Defunciones para la región: ${Region} <br/>
              Numero de defunciones: <span class=>${Defunciones}</span> <br/>
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
d3.json('./mapa.json')
  .then((geojson) => {
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