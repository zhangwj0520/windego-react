/* eslint-disable prefer-destructuring */
import * as React from 'react'
// import { Icon } from 'antd'
import { CaretRightOutlined, PauseCircleOutlined } from '@ant-design/icons'

import { secondToDatetime } from './utils'
import styles from './index.scss'

const { useState, useRef, useEffect } = React

export interface PlayerProps {
  range: number[] // 毫秒级时间戳
  frequency: number // 十二秒内渲染次数
  loading?: boolean
  onPlay?: (time: number) => any
  onPause?: (time: number) => any
  onStop?: (time: number) => any
}

function PlayController(props: PlayerProps) {
  const { range, frequency, onPlay, onPause, onStop, loading } = props
  const currentTime: any = useRef(0)

  const [left, setLeft] = useState(0)

  const [playState, setPlayState] = useState('stop')
  const [speed, setSpeed] = useState(1)
  const [timer, setTimer]: [number | null, any] = useState(null)
  const interval = Math.floor(12000 / frequency)

  const stopRun = () => {
    clearInterval(timer as any)
    setTimer(null)
  }

  const reset = () => {
    currentTime.current = range[0]
    setLeft(0)
  }

  function getLeftByCurrentTime(current: number): number {
    if (range && range.length === 2) {
      return ((current - range[0]) / (range[1] - range[0])) * 100
    }
    return 0
  }

  useEffect(() => {
    if (range && range[0]) {
      currentTime.current = range[0]
    }
  }, [range.join()])

  useEffect(() => {
    if (loading) {
      stopRun()
    } else {
      if (playState === 'playing') {
        stopRun()

        const playTimer = setInterval(() => {
          const nextTime = currentTime.current + speed * interval
          currentTime.current = nextTime
          setLeft(getLeftByCurrentTime(nextTime))
          if (onPlay) {
            onPlay(nextTime)
          }
        }, interval)

        setTimer(playTimer)
      }

      if (playState === 'pause') {
        stopRun()
        if (onPause) {
          onPause(currentTime.current)
        }
      }
      if (playState === 'stop') {
        stopRun()
        reset()
        if (onStop) {
          onStop(currentTime.current)
        }
      }
    }
    return stopRun
  }, [playState, speed, loading])

  return (
    <div className={styles.box}>
      <div className={styles.toolbar}>
        {(playState === 'stop' || playState === 'pause') && (
          <CaretRightOutlined style={{ fontSize: 30 }} onClick={() => setPlayState('playing')} />
        )}
        {playState === 'playing' && (
          <PauseCircleOutlined style={{ fontSize: 30 }} onClick={() => setPlayState('pause')} />
        )}
        {(playState === 'playing' || playState === 'pause') && (
          <div
            style={{ width: 15, height: 15, background: '#ccc' }}
            onClick={() => setPlayState('stop')}
          />
        )}
      </div>
      <div className={styles.timeline}>
        <div className="controller__timeline--passed" />
        <div className={styles.ball} style={{ left }}>
          <div className="current-time">{secondToDatetime(currentTime.current)}</div>
        </div>
      </div>
      <div style={{ position: 'absolute', top: -70 }}>
        <div>开始时间：{secondToDatetime(range[0])}</div>
        <div>结束时间：{secondToDatetime(range[1])}</div>
        <div>{loading ? 'loading' : 'ready'}</div>
      </div>
      <div>
        <span onClick={() => setSpeed(1)}>1.x</span>
        <span onClick={() => setSpeed(2)}>2.x</span>
        <span onClick={() => setSpeed(4)}>4.x</span>
      </div>
    </div>
  )
}

export default PlayController
