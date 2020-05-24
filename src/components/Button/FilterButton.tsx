import React from 'react'
import btnIcon from '@assets/images/btn_screen.svg'
import styles from './index.scss'

interface Props {
  onSubmit: () => void
}

const FilterButton: React.FC<Props> = ({ onSubmit }) => {
  return (
    <div className={styles.filter} onClick={onSubmit}>
      <div>
        <img src={btnIcon} className={styles.icon} alt="筛选"></img>
      </div>
      <div>筛选</div>
    </div>
  )
}

export default FilterButton
