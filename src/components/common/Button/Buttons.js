import './Buttons.css';
import classNames from 'classnames'
import { cn } from '@bem-react/classname'
import React from 'react';
import CreateClasssName from '../../../utils/bemClassCreate';
import styled from 'styled-components';

const createClassName = (primary, secondary, disabled) => {
    const buttonType = classNames({
        'primary-button': primary,
        'secondary-button': secondary,
        'ghost-button': !primary && !secondary,
    })
    return cn(buttonType);
}

export const Button = ({ active, primary, secondary, className, Icon = null, type = 'button', children, ...props }) => {

    const bcn = createClassName(primary, secondary)
    return (
        <button
            type={type}
            {...props}
            className={classNames(bcn({ active }), className)}
        >
            {!!Icon ? <Icon/> : null}
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

export const GhostButton = styled(Button)`
    border: 1px solid var(--light-60);
    background-color: inherit;
    color: var(--dark-100);
    
    svg {
        margin-right: 10px;
    }
    &:hover {
        background-color: var(--light-60);
    }
`

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