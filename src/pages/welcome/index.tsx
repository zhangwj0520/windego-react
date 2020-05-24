import React from 'react'
import styles from './index.scss'

export default () => {
  return (
    <div className={styles.welcome}>
      <div className={styles.brand}>
        <h2>React Demo</h2>
        <p>让前端更简单</p>
        <p>样式后面再优化吧</p>
      </div>

      <div className={styles.background} />
    </div>
  )
}
