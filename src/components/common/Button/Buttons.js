import './Buttons.css';
import classNames from 'classnames'
import { cn } from '@bem-react/classname'
import React from 'react';

const createClassName = (primary, secondary) => {
    const buttonType = classNames({
        'primary-button': primary,
        'secondary-button': secondary,
        'ghost-button': !primary && !secondary,
    })
    return cn(buttonType);
}



export const Button = ({ active, primary, disabled, secondary, className, children, onClick }) => {


    const bcn = createClassName(primary, secondary)
    return (
        <button
            disabled={disabled}
            className={classNames(bcn({ active }), className)}
            onClick={onClick}
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
