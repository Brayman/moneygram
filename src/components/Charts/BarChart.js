import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import CreateClasssName from '../../utils/bemClassCreate'
import Tag, { Icons } from '../Tag'

const ProgressLineStyle = styled.div`
z-index: 4;
border-radius: 0.5em;
height: inherit;
background-color: ${({icon}) => icon.color};
width: ${({width}) => width};
`
const ProgressLine = (props) => <ProgressLineStyle {...props} />

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
            {catigories.map(({ category, amount }) => {
                return (
                    <div key={category} className={progressCN('bar-chart', 'item')}>
                        <div className={progressCN('bar-chart', 'title')}>
                            <Tag.Text>
                                {category}
                            </Tag.Text>
                            <span className={progressCN('title', 'cost')}>{amount} USD</span>
                        </div>

                        <div className={progressCN('progress-bar')}>
                            <ProgressLine width={`${amount / sum}%`} icon={new Icons(category)} />
                        </div>
                    </div>
                )
            })}
        </div>
    )
}
