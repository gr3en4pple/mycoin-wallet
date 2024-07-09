'use client'
import Title from '@/components/commons/Title'
import React, { useState } from 'react'
import ModalCreateMnemonic from './ModalCreateMnemonic'
import WalletCard from '../../commons/WalletCard'
import ModalCreateKeystore from './ModalCreateKeystore'

const MODAL_TYPES = {
  MNEMONIC: 'mnemonic',
  KEY_STORE: 'keyStore'
} as const

const CreateWallet = () => {
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
          Create Wallet
        </Title>
        <Title titleProps={{ size: 'xs' }} headerType="h3">
          Please select a method to create a new wallet
        </Title>
      </div>
      <div className="space-y-4">
        <div onClick={() => onToggleModal(MODAL_TYPES.KEY_STORE)}>
          <WalletCard
            titleContent="Key Store"
            subTitleContent="Create wallet by using Keystore V3 Mechanism"
          />
        </div>
        <div onClick={() => onToggleModal(MODAL_TYPES.MNEMONIC)}>
          <WalletCard
            titleContent="Mnemonic Phrase"
            subTitleContent="Create wallet by generate random 12 or 24 english words"
          />
        </div>
      </div>
      {isShowModal[MODAL_TYPES.MNEMONIC] && (
        <ModalCreateMnemonic
          onClose={() => onToggleModal(MODAL_TYPES.MNEMONIC)}
          isOpen={isShowModal[MODAL_TYPES.MNEMONIC]}
        />
      )}
      {isShowModal[MODAL_TYPES.KEY_STORE] && (
        <ModalCreateKeystore
          onClose={() => onToggleModal(MODAL_TYPES.KEY_STORE)}
          isOpen={isShowModal[MODAL_TYPES.KEY_STORE]}
        />
      )}
    </div>
  )
}

export default CreateWallet
