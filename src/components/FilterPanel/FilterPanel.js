import React from 'react'
import "./FilterPanel.css"
export const FilterPanel = ({children}) => {
    const [leftItem, rightItem] = children
  return (
    <div className='filter-panel'>
        {leftItem}
        {rightItem}
    </div>
  )
}
