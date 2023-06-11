import { Form } from "formik"
import styled from "styled-components"
import Select from "../../common/Select/Select"

const selectFormType = ({ type }) => {
    switch (type) {
        case 'expense':
            return 'background-color: var(--red-100)'
        case 'income':
            return 'background-color: var(--green-100)'
        default:
            return 'background-color: var(--blue-100)'
    }
}

export const Header = styled.div`
    color: var(--light-80);
    flex-grow: 1;
    background-color: inherit;
`

export const StyledForm = styled(Form)`
    height: 100vh;
    display: flex;
    flex-direction: column;
    ${selectFormType}
`


export const Segment = styled.div`
    margin: auto 0 2em 0;
    display: flex;
    flex-direction: column;
    border-radius: 32px 32px 0 0;
    padding: 24px 16px;
    background-color: var(--light-100);
`

export const RowFields = styled.div`
    display: flex;
    flex-direction: row;
    margin-bottom: 16px;
    div:first-child {
        margin-right: 16px;
    }
`
export const BalanceRow = styled(RowFields)`
    flex-wrap: wrap;
    justify-content: space-between;
`
export const StyledSelect = styled(Select)`
    width: 50%;
`
