import { useField } from 'formik'
import React from 'react';
import { Input } from './Input';


export const Field = (props) => {
    const [field, meta] = useField(props)
    return (
        <Input meta={meta} field={field} {...props} className={props.className} />
    )
}
