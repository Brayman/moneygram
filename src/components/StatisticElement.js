import React from 'react'
import {Icon} from './Icon/Icon'
import { BiArrowFromLeft, BiArrowToRight } from 'react-icons/bi'
import CreateClasssName from '../utils/bemClassCreate'
import './StatisticElement.css'

const elemCN = CreateClasssName()

const StatisticElement = ({type, amount}) => {
  return (
    <div className={elemCN('box',null,{[type]: true})}>
      { type === 'income' ?
        <Icon
          color='#00A86B'
          backgroundColor='#FFF'
          Icon={BiArrowToRight}
          className={elemCN('box', 'icon', {[type]: true})}
        /> : 
        <Icon
          color='#FD3C4A'
          backgroundColor='#FFF'
          Icon={BiArrowFromLeft}
          className={elemCN('box', 'icon', {[type]: true})}
        /> }
        <div className={elemCN('box', 'desc')}>
            <span className={elemCN('desc', 'title')}>
                {type}
            </span>
            <span className={elemCN('desc', 'subtitle')}>
                USD {amount}
            </span>
        </div>
    </div>
  )
}
export default StatisticElement