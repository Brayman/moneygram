import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { walletThunks } from '../redux/wallets'
import WalletForm from '../components/Forms/WalletForm/WalletForm'
import { account } from '../redux/selectors'

const WalletCreate = () => {
  const dispatch = useDispatch()
  const createWallet = form => dispatch(walletThunks.createWallet(form))
  const user = useSelector(account)
  return (
    <WalletForm wallet={{ userid: user.login }} saveAction={createWallet} />
  )
}

export default WalletCreate