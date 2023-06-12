import styled from "styled-components"
import SelectField from "../../common/Select/SelectField"

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
export const StyledSelect = styled(SelectField)`
    width: 50%;
`
