import { useField, useFormikContext } from 'formik'
import React from 'react';
import "./style.css";

export const SpecialField = ({ label, placeholder, ...props }) => {
    const [field, meta] = useField(props)
    const error = !!meta.error && "special-field_error"
    return (
        <div className={`special-field ${props.className} ${error}`}>
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
                    className="special-field__input"
                    id={props.name}
                />
            </div>
        </div>
    )
    return (
        <>
            <input
                {...field}
                {...props}
                className={`${props.className} field ${error}`}
            />
            {!!meta.touched && !!meta.error &&
                <div className="field__error">
                    {meta.error}
                </div>}
        </>
    )
}