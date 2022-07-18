import React, { useState } from 'react'

import {
    MdKeyboardArrowDown,
    MdKeyboardArrowUp
} from "react-icons/md";
import CreateClasssName from '../../../utils/bemClassCreate';
import "./Dropdown.css"
export const Dropdown = ({ children, items, onClick }) => {
    const classNames = CreateClasssName()
    const [open, setOpen] = useState(false)
    const itemClick = event => {
        onClick(event.target.innerText)
        setOpen(false)
    }
    const Arrow = ({ open, ...props }) => {
        if (open) {
            return <MdKeyboardArrowUp {...props} />
        } else {
            return <MdKeyboardArrowDown {...props} />
        }
    }
    return (
        <div className={classNames('dropdown')}>
            <button
                className={classNames('dropdown', 'button', { open: open })}
                onClick={() => setOpen(!open)}
            >
                <Arrow open={open} className={classNames('button', 'icon')} />
                {children}
            </button>
            <div className={classNames('dropdown', 'items', { open: open })}>
                {items.map((item) => {
                    return (
                        <div key={item} className={classNames('dropdown', 'item')} onClick={itemClick}>
                            {item}
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
