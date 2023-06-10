import React from 'react'
import { StyledAmount, IncomeAmount, ExpenceAmount } from './TransactionPreview.styles'


const Amount = ({ type, income, outcome, currency }) => {
    switch (type) {
        case 'transfer':
            return (
                <StyledAmount type={type}>
                    <ExpenceAmount>
                        {`- ${outcome} ${currency}`}
                    </ExpenceAmount>
                    <IncomeAmount>
                        {`+ ${income} ${currency}`}
                    </IncomeAmount>

                </StyledAmount>
            )
        case 'income':
            return (<IncomeAmount>
                {`+ ${income} ${currency}`}
            </IncomeAmount>)
        case 'expense':
            return (<ExpenceAmount>
                {`- ${outcome} ${currency}`}
            </ExpenceAmount>)
        default:
            console.warn('strange type: ', type);
            return <div>{type}</div>
    }
}

export default Amount