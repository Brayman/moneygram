import React, { useEffect } from 'react'
import { compose } from 'redux'
import { WithAuthRedirect } from "../hoc/withAuthRedirect";
import { List } from '../components/List/List'
import { useDispatch, useSelector } from 'react-redux'
import * as selectors from '../redux/selectors'
import { transactionsThunk } from '../redux/transactions-reducer'
import { useParams } from 'react-router-dom';

const WalletDetail = () => {
    const dispatch = useDispatch()
    const {cardid} = useParams()
    const transactions = useSelector(selectors.transactions)
    const isLoading = useSelector(selectors.isLoading)
    const account = useSelector(selectors.account)
    const sort = useSelector(selectors.sort)

    useEffect(() => {
        dispatch(transactionsThunk.getTransactions({login: account.login, sort, cardid}))
    },[account.login, sort, cardid, dispatch])
  return (
    <List isLoading={isLoading} transactions={transactions} />
  )
}
export default compose(WithAuthRedirect)(WalletDetail)
