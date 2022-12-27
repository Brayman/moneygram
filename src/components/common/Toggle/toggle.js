import React, { useState } from 'react'
import { MdToggleOff, MdToggleOn } from 'react-icons/md';
import styled from 'styled-components';

const ToggleOn = styled(MdToggleOn)`
    color: var(--violet-100);
    width: 4em;
    height: 2.625em;
`
const ToggleOff = styled(MdToggleOff)`
    color: var(--light-20);
    width: 4em;
    height: 2.625em;
`

const ToggleComponent = styled.label`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    font-size: 16px;
    line-height: 2em;
    position: relative;
`
const HideInput = styled.input`
    position: absolute;
    opacity: 0;
`

const Toggle = ({ label, value, className, ...props }) => {

    const [check, setCheck] = useState(value)
    return (
        <ToggleComponent className={className} >
            {label}
            <HideInput {...props} type='checkbox' onChange={() => setCheck(prev => !prev)} value={check} />
            {check ? <ToggleOn /> : <ToggleOff />}
        </ToggleComponent>
    )
}

export default Toggle