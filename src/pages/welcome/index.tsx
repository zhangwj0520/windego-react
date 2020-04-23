import React from 'react'
import { Button } from 'antd'
import styles from './index.scss'

export default () => {
  return (
    <div className={styles.welcome}>
      <div className={styles.brand}>
        <h2>React Demo</h2>
        <p>让前端更简单</p>
      </div>

      <div className={styles.background} />
    </div>
  )
}
