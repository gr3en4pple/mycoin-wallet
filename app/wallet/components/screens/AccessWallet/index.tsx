'use client'
import Title from '@/components/commons/Title'
import React, { useState } from 'react'
import ModalAccessKeyStore from './ModalAccessKeyStore'
import WalletCard from '../../commons/WalletCard'

const MODAL_TYPES = {
  MNEMONIC: 'mnemonic',
  KEY_STORE: 'keyStore'
} as const

const AccessWallet = () => {
  const [isShowModal, setShowModal] = useState<{
    [MODAL_TYPES.MNEMONIC]: boolean
    [MODAL_TYPES.KEY_STORE]: boolean
  }>({
    mnemonic: false,
    keyStore: false
  })

  const onToggleModal = (
    modalType: (typeof MODAL_TYPES)[keyof typeof MODAL_TYPES]
  ) => {
    setShowModal((prev) => ({ ...prev, [modalType]: !prev?.[modalType] }))
  }

  return (
    <div>
      <div className="mb-6 space-y-3">
        <Title titleProps={{ color: 'violet' }} headerType="h1">
          Access Wallet
        </Title>
        <Title titleProps={{ size: 'xs' }} headerType="h3">
          Please select a method to access your wallet
        </Title>
      </div>

      <div className="space-y-4">
        <div onClick={() => onToggleModal(MODAL_TYPES.KEY_STORE)}>
          <WalletCard
            title="Key Store"
            subTitle="Access your wallet by using Keystore File"
          />
        </div>
      </div>
      {isShowModal[MODAL_TYPES.KEY_STORE] && (
        <ModalAccessKeyStore
          onClose={() => onToggleModal(MODAL_TYPES.KEY_STORE)}
          isOpen={isShowModal[MODAL_TYPES.KEY_STORE]}
        />
      )}
    </div>
  )
}

export default AccessWallet
