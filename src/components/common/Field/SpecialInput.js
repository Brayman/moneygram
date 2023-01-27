import React from 'react';
import styled from 'styled-components';
import "./style.css";

const StyledBalanceInput = styled.div`
    background-color: inherit;
    color: inherit;
`

const Label = styled.label`
    font-size: 18px;
    color: var(--light-80);
    opacity: 0.64;
    font-weight: 600;
    display: block;
`
const CurrencyLabel = styled.label`
display: flex;
flex: row;
flex-wrap: nowrap;

    color: var(--light-80);
    font-size: 64px;
    font-weight: 600;
    line-height: 77px;
`
const Input = styled.input`
    color: inherit;
    background-color: inherit;
    font-size: 1em;
    font-weight: 600;
    max-width: 40vw;
    line-height: inherit;
    padding: 5px 0 0 0;
    &::placeholder {
        color: var(--light-80);
        opacity: 0.64;
    }
`


export const SpecialInput = ({ label, placeholder, field, currency = 'USD', size = '3', ...props }) => {
    if (currency === 'USD') {
        currency = '$'
    }
    return (
        <StyledBalanceInput className={props.className}>
            <Label htmlFor={props.name}>
                {label}
            </Label>
            <CurrencyLabel>
                {currency}
                <Input
                    {...field}
                    {...props}
                    placeholder={placeholder}
                    id={props.name}
                    size={size}
                />
            </CurrencyLabel>
        </StyledBalanceInput>
    )
}