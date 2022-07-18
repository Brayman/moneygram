import React from 'react'
import { useDispatch } from 'react-redux'
import WalletForm from '../components/WalletForm/WalletForm'
import { walletThunks } from '../redux/card'

const WalletCreate = () => {
    const dispatch = useDispatch()
    const createWallet = form => dispatch(walletThunks.createWallet(form))
  return (
    <WalletForm wallet={{}} saveAction={createWallet} />
  )
}

export default WalletCreate