// 自定义hook，定时器
import * as React from 'react'

const { useState, useRef, useEffect } = React

const useCountdown = (initialSeconds = 60): [number, () => void, () => void, () => void] => {
  const [seconds, setSeconds] = useState(initialSeconds)
  const [working, setWorking] = useState(false)
  const timerRef: any = useRef(null)

  function start() {
    setSeconds(seconds || 60)
    setWorking(true)
  }

  function stop() {
    setSeconds(60)
    setWorking(false)
  }
  function pause() {
    setWorking(false)
  }

  useEffect(() => {
    if (working) {
      if (seconds > 0 && !timerRef.current) {
        timerRef.current = setInterval(() => {
          setSeconds((x) => x - 1)
        }, 1000)
      } else if (seconds <= 0 && timerRef.current) {
        clearInterval(timerRef.current)
        timerRef.current = null
        setWorking(false)
      }
    } else {
      clearInterval(timerRef.current)
      timerRef.current = null
      setWorking(false)
    }
  }, [seconds, working])

  useEffect(() => {
    return () => {
      clearInterval(timerRef.current)
      timerRef.current = null
    }
  }, [])

  return [seconds, start, stop, pause]
}
export default useCountdown
