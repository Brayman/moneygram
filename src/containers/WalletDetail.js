import React, { useEffect } from 'react'
import { compose } from 'redux'
import { WithAuthRedirect } from "../hoc/withAuthRedirect";
import { List } from '../components/List/List'
import { useDispatch, useSelector } from 'react-redux'
import * as selectors from '../redux/selectors'
import { MdEdit } from 'react-icons/md'
import { transactionsThunk } from '../redux/transactions-reducer'
import { useNavigate, useParams } from 'react-router-dom';
import { walletThunks } from '../redux/wallets';
import Account from '../components/Account/Account';
import Loader from '../components/common/Loader/Loader';
import { Navigation } from '../components/common/Navigation/Navigation';

const WalletDetail = () => {
  const dispatch = useDispatch()
  const { cardid } = useParams()
  const navigate = useNavigate()
  const transactions = useSelector(selectors.transactions)
  const isLoading = useSelector(selectors.isLoading)
  const account = useSelector(selectors.account)
  const sort = useSelector(selectors.sort)
  const wallet = useSelector(selectors.wallet)
  useEffect(() => {
    dispatch(transactionsThunk.getTransactions({ login: account.login, sort, cardid }))
  }, [account.login, sort, cardid, dispatch])
  useEffect(() => {
    dispatch(walletThunks.getWallet(cardid))
  }, [cardid, dispatch])
  if (wallet === null) {
    return <Loader />
  }
  return (
    <div>
      <Navigation title='Account detail'>
        <Navigation.Button Icon={MdEdit} onClick={() => navigate(`/wallet/edit/${cardid}`)} />
      </Navigation>
      <Account balance={wallet.balance} />
      <List isLoading={isLoading} transactions={transactions} />
    </div>

  )
}
export default compose(WithAuthRedirect)(WalletDetail)
