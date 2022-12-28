import React from 'react'
import { MdToggleOff, MdToggleOn } from 'react-icons/md';
import styled from 'styled-components';

const ToggleOn = styled(MdToggleOn)`
    color: var(--violet-100);
    width: 2.5em;
    height: 2.625em;
`
const ToggleOff = styled(MdToggleOff)`
    color: var(--violet-20);
    width: 2.5em;
    height: 2.625em;
`

const ToggleComponent = styled.label`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    font-size: 16px;
    line-height: 2em;
    position: relative;
    padding: 0.5em 1em;
`
const HideInput = styled.input`
    position: absolute;
    opacity: 0;
`

const Toggle = ({ label, className, ...props }) => {
    return (
        <ToggleComponent className={className} >
            {label}
            <HideInput {...props} type='checkbox'  />
            {props.value ? <ToggleOn /> : <ToggleOff />}
        </ToggleComponent>
    )
}

export default Toggle