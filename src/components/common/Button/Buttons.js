import './Buttons.css';
import classNames from 'classnames'
import { cn } from '@bem-react/classname'
import React from 'react';
import CreateClasssName from '../../../utils/bemClassCreate';

const createClassName = (primary, secondary) => {
    const buttonType = classNames({
        'primary-button': primary,
        'secondary-button': secondary,
        'ghost-button': !primary && !secondary,
    })
    return cn(buttonType);
}



export const Button = ({ active, primary, secondary, className, children, ...props }) => {


    const bcn = createClassName(primary, secondary)
    return (
        <button
            {...props}
            className={classNames(bcn({ active }), className)}

        >
            {children}
        </button>
    )
}

export const IconButton = ({ className, onClick, ...props }) => {
    const bcn = createClassName()
    return (
        <button
            className={classNames('icon-button', bcn(), className)}
            onClick={onClick}
        >
            <props.icon className="icon-button__icon" />
        </button>
    )
}
export const GroupedButton = ({ className, onClick, value, ...props }) => {
    const groupCN = CreateClasssName()
    return (
        <div className={classNames(groupCN('group-buttons'), className)}>
            {props.buttons.map((button, i) => (
                <button
                    key={`name-${i}-${button}`}
                    {...props}
                    className={groupCN('group-button', null, { active: value === button.toLowerCase() })}
                    onClick={() => onClick(button.toLowerCase())}
                >
                    {button}
                </button>
            ))}

        </div>

    )
}