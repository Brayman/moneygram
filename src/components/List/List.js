import classNames from 'classnames'
import React from 'react'
import TransactionMini from '../Transaction/TransactionPreview'
import Loader from '../common/Loader/Loader'
import styled from 'styled-components'

const TitleStyled = styled.div`
    font-size: 18px;
    font-weight: 600;
    line-height: 21.8px;
`

const DateTitle = ({ children }) => {
    return <TitleStyled>
        {children}
    </TitleStyled>
}

export const List = ({ isLoading, transactions, className }) => {
    function selectTitle() {
        let localDate = new Date(0)
        return (dayDate) => {
            if (localDate.getDate() !== new Date(dayDate).getDate()) {
                localDate = new Date(dayDate)
                const dayAgo = new Date().getDate() - localDate.getDate()
                switch (dayAgo) {
                    case 0:
                        return <DateTitle key={localDate.getTime()}>
                            Today
                        </DateTitle>
                    case 1:
                        return <DateTitle key={localDate.getTime()}>
                            Yerstaday
                        </DateTitle>
                    default:
                        return <DateTitle key={localDate.getTime()}>
                            {new Date(localDate).toLocaleDateString()}
                        </DateTitle>
                }
            }
            else return false
        }

    }
    const getTitle = selectTitle()
    return (
        <section className={classNames("day-section transactions__item", className)}>
            {!isLoading ? transactions.map((item) => {
                return (<>
                    {getTitle(new Date(item.date))}
                    <TransactionMini
                        key={item._id}
                        body={item}
                    />
                </>)
            }) : <Loader />}
        </section>
    )
}
