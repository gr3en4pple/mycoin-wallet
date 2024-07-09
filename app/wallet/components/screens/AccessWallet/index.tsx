'use client'
import Title from '@/components/commons/Title'
import React, { useState } from 'react'
import ModalAccessKeyStore from './ModalAccessKeyStore'
import WalletCard from '../../commons/WalletCard'
import ModalAccessMnemonic from './ModalAccessMnemonic'
import ModalAccessPrivateKey from './ModalAccessPrivateKey'

const MODAL_TYPES = {
  MNEMONIC: 'mnemonic',
  KEY_STORE: 'keyStore',
  PRIVATE_KEY: 'privateKey'
} as const

const AccessWallet = () => {
  const [isShowModal, setShowModal] = useState<{
    [MODAL_TYPES.MNEMONIC]: boolean
    [MODAL_TYPES.KEY_STORE]: boolean
    [MODAL_TYPES.PRIVATE_KEY]: boolean
  }>({
    mnemonic: false,
    keyStore: false,
    privateKey: false
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
            titleContent="Key Store"
            subTitleContent="Access your wallet by using Keystore File"
          />
        </div>

        <div onClick={() => onToggleModal(MODAL_TYPES.MNEMONIC)}>
          <WalletCard
            titleContent="MNEMONIC"
            subTitleContent="Access your wallet by using Mnemonic Phrase "
          />
        </div>

        <div onClick={() => onToggleModal(MODAL_TYPES.PRIVATE_KEY)}>
          <WalletCard
            titleContent="Private key"
            subTitleContent="Access your wallet by using Private key"
          />
        </div>
      </div>
      {isShowModal[MODAL_TYPES.KEY_STORE] && (
        <ModalAccessKeyStore
          onClose={() => onToggleModal(MODAL_TYPES.KEY_STORE)}
          isOpen={isShowModal[MODAL_TYPES.KEY_STORE]}
        />
      )}

      {isShowModal[MODAL_TYPES.MNEMONIC] && (
        <ModalAccessMnemonic
          onClose={() => onToggleModal(MODAL_TYPES.MNEMONIC)}
          isOpen={isShowModal[MODAL_TYPES.MNEMONIC]}
        />
      )}

      {isShowModal[MODAL_TYPES.PRIVATE_KEY] && (
        <ModalAccessPrivateKey
          onClose={() => onToggleModal(MODAL_TYPES.PRIVATE_KEY)}
          isOpen={isShowModal[MODAL_TYPES.PRIVATE_KEY]}
        />
      )}
    </div>
  )
}

export default AccessWallet
