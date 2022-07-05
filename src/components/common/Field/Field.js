import { useField } from 'formik'
import React from 'react';
import { Input } from './Input';
import { SpecialInput } from './SpecialInput';

export const Field = (props) => {
    const [field, meta] = useField(props)
    return (
        <Input meta={meta} field={field} {...props} className={props.className} />
    )
}
export const SpecialField = (props) => {
    const [field, meta] = useField(props)
    return (
        <SpecialInput meta={meta} field={field} {...props} className={props.className} />
    )
}
