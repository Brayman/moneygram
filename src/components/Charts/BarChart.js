import React, { useEffect, useState } from 'react'
import CreateClasssName from '../../utils/bemClassCreate'
import { NamedTag } from '../common/NamedTag'


export const BarChart = ({ catigories, className }) => {
    const [sum, setSum] = useState(0)
   
    const progressCN = CreateClasssName()
    useEffect(() => {
        setSum((catigories.reduce((sum, {amount}) => {
            return sum + amount
        },0)) * 0.01)
    },[catigories])

    return (
        <div className={className}>
            {catigories.map(({ name, amount }) => {
                return (
                    <div key={name} className={progressCN('bar-chart', 'item')}>
                        <div className={progressCN('bar-chart', 'title')}>
                            <NamedTag>
                                {name}
                            </NamedTag>
                            <span className={progressCN('title', 'cost')}>{amount} USD</span>
                        </div>

                        <div className={progressCN('progress-bar')}>
                            <div className={progressCN('progress-bar', 'bar')} style={{ width: `${amount / sum}%` }}></div>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}
