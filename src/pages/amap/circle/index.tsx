import React from 'react'
import Map from '@components/Map/Map'
import Circle from '@components/Map/Circle/index'

const circleOptions = {
  strokeColor: '#cd23ae',
  strokeWeight: 3,
  fillColor: '#e66fd1',
}

const eventObjects = {
  mouseover: (e: any) => {
    console.log('Markers event mouseover', e)
  },
  click: (e: any) => {
    console.log('Markers event click', e)
  },
}
function App() {
  return (
    <Map style={{ width: '100%', height: '80vh' }}>
      <Circle
        circleOptions={circleOptions}
        center={[116.368904, 39.913423]}
        radius={50}
        events={eventObjects}
      />
    </Map>
  )
}
export default App
