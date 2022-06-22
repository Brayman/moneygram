import { useField } from 'formik'
import React from 'react';
import "./style.css";

export const Field = (props) => {
    const [field, meta] = useField(props)
    const error = !!meta.error && "field__error field_error" 
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
