import React from 'react'
import './Map.css'
import { MapContainer, TileLayer, useMap} from 'react-leaflet'
import {showDataOnMap} from './util'


function Map({countries, casesType, center, zoom}) {
  console.log(countries)
  return (
    <div className = 'map'>
      <MapContainer center={center} zoom={zoom}> 
        {/* MapContainer props immutable */}
	      <ChangeView center={center} zoom={zoom} />
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />

         {showDataOnMap(countries, casesType)}

      </MapContainer>
    </div>
  )
}


function ChangeView({ center, zoom }) {
  const map = useMap();
  map.setView(center, zoom);
  return null;
}

export default Map


