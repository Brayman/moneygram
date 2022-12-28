import { useField } from 'formik'
import React from 'react'
import Toggle from './toggle'

const ToggleField = (props) => {
    const [field, meta] = useField(props)
    console.log(field);
    return (
        <Toggle {...field} {...meta} {...props}/>
  )
}

export default ToggleField