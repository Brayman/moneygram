import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as selectors from '../redux/selectors'
import WalletForm from '../components/Forms/WalletForm/WalletForm'
import { walletThunks } from '../redux/wallets'
import { useParams } from 'react-router-dom'

const WalletEditor = () => {
  const dispatch = useDispatch()
  const wallet = useSelector(selectors.wallet)
  const { walletid } = useParams()
  const editWallet = form => dispatch(walletThunks.editWallet(walletid, form))
  useEffect(() => {
    dispatch(walletThunks.getWallet(walletid))
  }, [walletid, dispatch])
  return (
    <WalletForm wallet={wallet} saveAction={editWallet} />
  )
}

export default WalletEditor