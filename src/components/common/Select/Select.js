import React, { useState } from "react";
import {
    MdOutlineKeyboardArrowDown,
    MdOutlineKeyboardArrowUp
} from "react-icons/md";
import {
    useFormikContext,
    useField
} from "formik";
import "./style.css"
const Select = ({ up = false, tag = false, options, ...props }) => {
    const [open, setOpen] = useState(false);
    const { setFieldValue } = useFormikContext()
    const [ , meta] = useField(props);
    const direction = up ? 'options_up' : 'options_down'
    const hiddenClass = !open ? 'options_hidden' : direction;

    const item = tag ?
        <div className='tag-option tag-option__selected'>
            <div className='tag-option__dot' />
            {meta.value}
        </div> :
        <div className='tag-option__empty'>
            {meta.value}
        </div>
    return (
        <div className='select-field'>
            <div className='select field tr-add__field' onClick={() => setOpen(!open)}>

                {meta.value === "" ?
                    <div className='tag-option__empty'>
                    </div> : 
                    item}

                {open ?
                    <MdOutlineKeyboardArrowUp className='select__icon' /> :
                    <MdOutlineKeyboardArrowDown className='select__icon' />
                }
            </div>
            <div className={hiddenClass}>
                {options.map(item => {
                    return (
                        <div
                            key={item}
                            className='option'
                            onClick={e => {
                                setOpen(!open)
                                setFieldValue(props.name, item)
                            }}
                        >
                            {item}
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Select;