import { useField } from 'formik'
import React from 'react';
import CreateClasssName from '../../../utils/bemClassCreate';
import { Input } from './Input';

const fcn = CreateClasssName()


export const Field = (props) => {
    const [field, meta] = useField(props)
    return (
        <Input meta={meta} field={field} {...props} className={props.className} />
    )
}
