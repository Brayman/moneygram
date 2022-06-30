import React from 'react';
import "./style.css";

export const SpecialInput = ({ label, placeholder,field, ...props }) => {
    return (
        <div className={`special-field ${props.className} ${props.error}`}>
            <div className="special-field__placeholder">
                {placeholder}
            </div>
            <div className='special-field__input-wrapper'>
                {!!label && <label className='special-field__label' htmlFor={props.name}>
                    {label}
                </label>}
                <input
                    {...field}
                    {...props}
                    placeholder={0}
                    className="special-field__input"
                    id={props.name}
                />
            </div>
        </div>
    )
}