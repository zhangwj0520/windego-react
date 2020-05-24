import React from 'react'
import Map from '@components/Map/Map'
import Polygon from '@components/Map/Polygon/index'

const { useReducer, useEffect } = React

function App() {
  const initialState: [number, number][] = [
    [116.382122, 39.901176],
    [116.387271, 39.912501],
    [116.398258, 39.9046],
  ]
  const reducer = (state: any, action: string) => {
    switch (action) {
      case 'updatePath':
        return [
          [116.368904, 39.913423],
          [116.382122, 39.901176],
          [116.387271, 39.912501],
          [116.398258, 39.9046],
          [116.378904, 39.913423],
          [116.357271, 39.952501],
          [116.388258, 39.9043],
        ]
      default:
        throw new Error('Unexpected action')
    }
  }

  const [path, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    setTimeout(() => {
      dispatch('updatePath')
    }, 5000)
  }, [])

  console.log('render App')
  return (
    <div className="App">
      <Map style={{ width: '100%', height: '80vh' }}>
        <Polygon
          polygonOptions={{ path }}
          events={{
            click: (e) => {
              // 这里存在很大的隐患
              const { target } = e
              target.setPath([
                [116.382122, 39.901176],
                [116.387271, 39.912501],
                [116.398258, 39.9046],
              ])
            },
          }}
        />
      </Map>
    </div>
  )
}

export default App
