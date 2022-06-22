import classNames from 'classnames'
import {cn} from '@bem-react/classname'
import React from 'react';
import './Button.css';
export const Button = ({active, primary, secondary, className, children, onClick }) => {
    
    
    const buttonType = classNames({
        'primary-button': primary,
        'secondary-button': secondary,
        'ghost-button': !primary && !secondary,
    })
    const bcn = cn(buttonType);
    return (
        <div
            className={classNames(bcn({active}), className)}
            onClick={onClick}
        >
            {children}
        </div>
    )
}
