import "./Icon.css"
import classNames from 'classnames'
import React from 'react'


export const Icon = (props) => {
    const cn = classNames("icon", props.className)
    return (
            <props.icon className={cn}/>
    )
}
