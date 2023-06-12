import React from 'react'
import { useDispatch } from 'react-redux'
import { walletThunks } from '../redux/wallets'
import WalletForm from '../components/Forms/WalletForm/WalletForm'
const WalletCreate = () => {
  const dispatch = useDispatch()
  const createWallet = form => dispatch(walletThunks.createWallet(form))
  return (
    <WalletForm wallet={{}} saveAction={createWallet} />
  )
}

export default WalletCreate