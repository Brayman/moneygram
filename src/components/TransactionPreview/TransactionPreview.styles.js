import { NavLink } from "react-router-dom";
import styled, { css } from "styled-components";

export const Transaction = styled(NavLink)`
    margin: 0.5em 1em;
    background-color: #FCFCFC;
    padding: 0.9375em 1.0625em;
    border-radius: 1.5em;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    text-decoration: none;
`

export const ExpenceAmount = styled.div`
    color: #FD3C4A;
`

export const IncomeAmount = styled.div`
  color: #00A86B;
`

const SelectAmountType = ({ type }) => {
    if (type === 'transfer') {
        return css`
            display: flex;
            flex-direction: column;
            text-align: end;
        `
    }
}

export const Title = styled.div`
    font-weight: 500;
    color: #292B2D;
`

export const Content = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 0.375em 0;
    flex-grow: 1;
    margin-left: 0.5625em;
`



export const StyledAmount = styled.div`
    font-weight: 500;
    ${SelectAmountType}
`