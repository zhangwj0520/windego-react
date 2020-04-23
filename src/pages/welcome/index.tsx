import React from 'react'
import { Button } from 'antd'
import styles from './index.scss'

export default () => {
  return (
    <div className={styles.welcome}>
      <Button type="primary">Primary</Button>
      <Button>Default</Button>
      <Button type="dashed">Dashed</Button>
      <Button type="link">Link</Button>
      <header>
        <div className="brand">
          <h2>React Demo</h2>
          <p>让前端更简单</p>
        </div>
      </header>
      <div className="welcome-bg" />
      <header>
        <div className="brand">
          <h2>React Demo</h2>
          <p>让前端更简单</p>
        </div>
      </header>
      <div className="welcome-bg" />
      <header>
        <div className="brand">
          <h2>React Demo</h2>
          <p>让前端更简单</p>
        </div>
      </header>
      <div className="welcome-bg" />
    </div>
  )
}
