/* eslint-disable react/button-has-type */
import React, { useState, useEffect } from 'react'
import redux from '@assets/images/redux.svg'
import { useStore, useActions } from '@hooks/useStore'
import useTimeout from '@hooks/useTimeout'
import useCountdown from '@hooks/useCountdown'
import styles from './styles.scss'
import { actions, name, CounterState } from './module'

function App() {
  const { count } = useStore<CounterState>(name)
  const { increment, decrement, incrementByAmount, incrementAsync } = useActions(actions)
  const [incrementAmount, setIncrementAmount] = useState('2')
  const [seconds, start, stop, pause] = useCountdown(60)

  const [num, setNum] = useState(100)

  useEffect(() => {
    start()
  }, [])

  useTimeout(() => {
    increment()
  }, 2000)

  useEffect(() => {
    setNum((state) => state + 2)
  }, [])

  useEffect(() => {
    console.log(num)
    // []===[]
    // 第二个参数不能为引用类型
  }, [[]])

  const onStart = () => {
    start()
    // console.log(num)
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <img src={redux} className={styles.logo} alt="logo" />
        <div className={styles.row}>
          <button className={styles.button} onClick={stop}>
            停止
          </button>
          <span className={styles.value}>{seconds}</span>
          <button className={styles.button} onClick={onStart}>
            开始
          </button>
          <button className={styles.button} onClick={pause}>
            暂停
          </button>
        </div>
        <div className={styles.row}>
          <button className={styles.button} onClick={() => increment()}>
            +
          </button>
          <span className={styles.value}>{count}</span>
          <button
            className={styles.button}
            aria-label="Decrement value"
            onClick={() => decrement()}
          >
            -
          </button>
        </div>
        <div className={styles.row}>
          <input
            className={styles.textbox}
            aria-label="Set increment amount"
            value={incrementAmount}
            onChange={(e) => setIncrementAmount(e.target.value)}
          />
          <button
            className={styles.button}
            onClick={() => incrementByAmount(Number(incrementAmount) || 0)}
          >
            Add Amount
          </button>
          <button
            className={styles.asyncButton}
            onClick={() => incrementAsync(Number(incrementAmount) || 0)}
          >
            Add Async
          </button>
        </div>
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <span>
          <span>Learn </span>
          <a
            className={styles.link}
            href="https://reactjs.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            React
          </a>
          <span>, </span>
          <a
            className={styles.link}
            href="https://redux.js.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Redux
          </a>
          <span>, </span>
          <a
            className={styles.link}
            href="https://redux-toolkit.js.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Redux Toolkit
          </a>
          ,<span> and </span>
          <a
            className={styles.link}
            href="https://react-redux.js.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            React Redux
          </a>
        </span>
      </header>
    </div>
  )
}

export default App
