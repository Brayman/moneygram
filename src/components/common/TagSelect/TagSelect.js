import React, { useState } from "react";
import {
    MdOutlineKeyboardArrowDown,
    MdOutlineKeyboardArrowUp
} from "react-icons/md";
import {
    useFormikContext
} from "formik";

const TagSelect = ({ item, tags }) => {
    const [open, setOpen] = useState(false);
    const { setFieldValue } = useFormikContext()
    const hiddenClass = !open ? 'options__hidden' : 'options';
    return (
        <div className='select-field'>
            <div className='select field tr-add__field' onClick={() => setOpen(!open)}>
                {item !== '' ? <div className='tag-option tag-option__selected'>
                    <div className='tag-option__dot' />
                    {item}
                </div> :
                    <div className='tag-option__empty' />
                }
                {open ?
                    <MdOutlineKeyboardArrowUp className='select__icon' /> :
                    <MdOutlineKeyboardArrowDown className='select__icon' />
                }
            </div>
            <div className={hiddenClass}>
                {tags.map(item => {
                    return (
                        <div
                            key={item}
                            className='tag-option'
                            onClick={e => {
                                setOpen(!open)
                                setFieldValue('tag', e.target.outerText)
                            }
                            }
                        >
                            {item}
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
export default TagSelect;