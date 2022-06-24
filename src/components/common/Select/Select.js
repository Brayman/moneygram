import React, { useState } from "react";
import createClassName from "../../../utils/bemClassCreate"

import {
    MdOutlineKeyboardArrowDown,
    MdOutlineKeyboardArrowUp
} from "react-icons/md";

import "./style.css"
import classNames from "classnames";
const selectCN = createClassName();
const SelectOption = ({ placeholder = 'text', tag, children }) => {
    if (children !== '') {
        const MyOption = tag ? TagOption : Option;
        return (
            <MyOption>
                {children}
            </MyOption>
        )
    }
    return (
        <div className={selectCN('option', null, { placeholder: true })}>
            {placeholder}
        </div>
    )
}
const Option = ({ children }) => {
    return (
        <div className={selectCN('option', null, { selected: true })}>
            {children}
        </div>

    )
}
const TagOption = ({ children }) => {
    return (
        <div className={selectCN('option')}>
            <div className={selectCN('option', 'tag')}>
                <div className={selectCN('tag', 'dot')}></div>
                <div className={selectCN('tag', 'text')}>{children}</div>
            </div>
        </div>

    )
}



const Select = ({ options, up, tag = false, ...props }) => {
    const [open, setOpen] = useState(false)
    const arrowProps = {
        className: selectCN('select', 'arrow'),
        onClick: () => setOpen(!open)
    }
    return (
        <div className={classNames(selectCN('select', null, {open}), props.className)}>
            <SelectOption tag={tag} placeholder={props.placeholder}>
                {props.value}
            </SelectOption>
            {open ? <MdOutlineKeyboardArrowUp {...arrowProps} /> : <MdOutlineKeyboardArrowDown {...arrowProps} />}
            <div className={selectCN('options', '', { hidden: !open, up: up, down: !up })}>
                {options.map((option, i) => {
                    return (
                        <div
                        key={`${option}-${i}`}
                            className={selectCN('option')}
                            onClick={() => {
                                props.setValue(option)
                                setOpen(!open)
                            }}
                        >
                            {option}
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Select;