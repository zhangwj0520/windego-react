import * as React from 'react'
import useBindEvents from '@hooks/useBindEvents'
import { MapContext } from '../Map'

export interface IEvents {
  [event: string]: (e: any) => any
}

const { useContext, useEffect, useState } = React

export interface ICircleProps {
  center: any
  radius: any
  circleOptions?: {
    // path: any; // AMap.LocationValue[] | AMap.LocationValue[][] | undefined;
    [option: string]: any
  }
  events?: IEvents
}

function Circle(props: ICircleProps): any {
  const { center, radius, circleOptions, events } = props
  const map = useContext(MapContext)
  const [circle, setCircle]: [any, any] = useState(null)

  useBindEvents(circle, events)

  useEffect(() => {
    if (!map) {
      return
    }
    const newCircle = new AMap.Circle({
      center: new AMap.LngLat(center[0], center[1]),
      radius,
      ...props.circleOptions,
    })
    ;((map as unknown) as AMap.Map).add(newCircle)
    ;((map as unknown) as AMap.Map).setFitView()

    setCircle(newCircle)

    return () => {
      ;((map as unknown) as AMap.Map).remove(newCircle)
    }
  }, [map, circleOptions])

  return null
}

export default Circle
