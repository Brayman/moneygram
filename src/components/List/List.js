import classNames from 'classnames'
import React from 'react'
import TransactionMini from '../Transaction/TransactionPreview'
import Loader from '../common/Loader/Loader'

export const List = ({isLoading, transactions, className}) => {
    return (
        <section className={classNames("day-section transactions__item", className)}>
            {!isLoading ? transactions.map((item, i) => {
                return (<TransactionMini
                    key={item._id}
                    
                    body={item}
                />)
            }) : <Loader />}
        </section>
    )
}
