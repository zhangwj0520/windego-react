import { useMemo } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { bindActionCreators, ActionCreatorsMapObject } from '@reduxjs/toolkit'

type name = string | Array<string>

export function useActions<A, M extends ActionCreatorsMapObject<A>>(action: M) {
  const dispatch = useDispatch()
  return useMemo(() => {
    return bindActionCreators(action, dispatch)
  }, [action, dispatch])
}

export function useStore<T>(name: name): T {
  return useSelector((state) => {
    if (!name) {
      return state
    }
    if (Array.isArray(name)) {
      return name.reduce((pre, item) => {
        return { ...pre, [item]: state[item] }
      }, {})
    }
    return state[name]
  })
}
