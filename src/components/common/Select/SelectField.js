import { useField, useFormikContext } from 'formik';
import React from 'react'
import Select from './Select'

const SelectField = (props) => {
  const [field, meta] = useField(props);
  const { setFieldValue } = useFormikContext()
  return (
    <Select {...field} {...meta} {...props} setValue={value => setFieldValue(field.name, value)} />
  )
}

export default SelectField