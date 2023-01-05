import React, { useEffect } from 'react'
import { compose } from 'redux'
import { WithAuthRedirect } from "../hoc/withAuthRedirect";
import { List } from '../components/List/List'
import { useDispatch, useSelector } from 'react-redux'
import * as selectors from '../redux/selectors'
import { MdCreditCard, MdEdit } from 'react-icons/md'
import { transactionsThunk } from '../redux/transactions-reducer'
import { useNavigate, useParams } from 'react-router-dom';
import { walletThunks } from '../redux/wallets';
import Loader from '../components/common/Loader/Loader';
import { Navigation } from '../components/common/Navigation/Navigation';
import { Icon } from '../components/Icon/Icon';
import styled from 'styled-components';

const WalletTitle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 31px 0 42px 0;
`

const Balance = styled.div`
  font-size: 2em;
  font-weight: 700;
  line-height: 39px;
`

const WalletName = styled.div`
  font-size: 24px;
  line-height: 29px;
  font-weight: 600;
  padding: 8px 0 16px 0;
`

const WalletIcon = styled(Icon)`
  font-size: 2em;
  padding: 0.25em;
`

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
      <WalletTitle>
        <WalletIcon Icon={MdCreditCard} />
        <WalletName>
          {wallet.name}
        </WalletName>
        <Balance>
          {wallet.currency} {wallet.balance}
        </Balance>
      </WalletTitle>
      <List isLoading={isLoading} transactions={transactions} />
    </div>

  )
}
export default compose(WithAuthRedirect)(WalletDetail)
