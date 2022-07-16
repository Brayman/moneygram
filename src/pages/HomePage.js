import React, { useEffect } from 'react'
import { compose } from 'redux'
import { WithAuthRedirect } from "../hoc/withAuthRedirect";
import { List } from '../components/List/List'
import { useDispatch, useSelector } from 'react-redux'
import * as selectors from '../redux/selectors'
import { transactionsThunk } from '../redux/transactions-reducer'

const HomePage = () => {
    const dispatch = useDispatch()
    const transactions = useSelector(selectors.transactions)
    const isLoading = useSelector(selectors.isLoading)
    const account = useSelector(selectors.account)
    const sort = useSelector(selectors.sort)

    useEffect(() => {
        dispatch(transactionsThunk.getTransactions({login: account.login, sort}))
    },[account.login, sort, dispatch])
  return (
    <List isLoading={isLoading} transactions={transactions} />
  )
}
export default compose(WithAuthRedirect)(HomePage)
