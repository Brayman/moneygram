import React, { useEffect } from 'react'
import { compose } from 'redux'
import { WithAuthRedirect } from "../hoc/withAuthRedirect";
import { List } from '../components/List/List'
import { useDispatch, useSelector } from 'react-redux'
import * as selectors from '../redux/selectors'
import { transactionsThunk } from '../redux/transactions-reducer'
import Account from '../components/Account/Account';
import { accounThunks } from '../redux/account';

const HomePage = () => {
    const dispatch = useDispatch()
    const transactions = useSelector(selectors.transactions)
    const isLoading = useSelector(selectors.isLoading)
    const account = useSelector(selectors.account)
    const sort = useSelector(selectors.sort)
  useEffect(() => {
    dispatch(accounThunks.getBalanse(account.login))
  }, [account, dispatch])
    useEffect(() => {
        dispatch(transactionsThunk.getTransactions({login: account.login, sort}))
    },[account.login, sort, dispatch])
  return (
    <div>
      <Account balance={account.balance} />
      <List isLoading={isLoading} transactions={transactions} />
    </div>
  )
}
export default compose(WithAuthRedirect)(HomePage)
