import React, {useState} from 'react'

import {
    MdKeyboardArrowDown,
    MdKeyboardArrowUp
} from "react-icons/md";
import CreateClasssName from '../../../utils/bemClassCreate';
import "./Dropdown.css"
export const Dropdown = ({children, items, onClick}) => {
    const classNames = CreateClasssName()
    const [open, setOpen] = useState(false)
    const itemClick = event => {
        onClick(event.target.innerText)
        setOpen(false)
    }
    return (
        <div className={classNames('dropdown')}>


            <button
                className={classNames('dropdown', 'button', {open: open})}
                onClick={() => setOpen(!open)}
                >
                <MdKeyboardArrowDown className={classNames('button', 'icon')} />
                {children}
            </button>
            <div className={classNames('dropdown', 'items', {open: open})}>
                {items.map((item) => {
                    return (
                        <div className={classNames('dropdown', 'item')} onClick={itemClick}>
                            {item}
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
