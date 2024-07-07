'use client'
import Title from '@/components/commons/Title'

import WalletCardItem from '@/components/screens/AccessWallet/WalletCardItem'
import useDisclosure from '@/hooks/useDisclosure'

import ModalPrivateKeyInput from './ModalPrivateKeyInput'
import useCount from '@/store/useCount'
import { Button } from '@nextui-org/button'
import { Input } from '@nextui-org/input'
import { useState, useMemo } from 'react'
import ModalInputMnemonic from './ModalInputMnemonic'

export default function AccessWallet() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const count = useCount((state) => state.count)
  const { increaseCount, decreaseCount } = useCount((state) => state)

  const [decreaseAmount, setDecreaseAmount] = useState('')

  return (
    <div>
      <div className="mb-5">
        <Title titleProps={{ color: 'violet' }}>Access Wallet {count}</Title>
      </div>
      <div className="mb-5 space-y-3">
        <div className="flex items-center space-x-4">
          <Input
            value={decreaseAmount}
            onChange={(e) => {
              if (isNaN(+e.target.value)) return
              setDecreaseAmount(e.target.value)
            }}
          />
          <Button onClick={increaseCount}>Increase</Button>

          <Button
            className="w-6"
            onClick={() =>
              decreaseCount(!decreaseAmount ? undefined : +decreaseAmount)
            }
          >
            {' '}
            -{' '}
          </Button>
        </div>
      </div>

      <div onClick={onOpen}>
        <WalletCardItem
          title="Create Mnemonic Wallet"
          subTitle="Keystore File, Mnemonic Phase and Private Key"
        />
      </div>

      {/* <ModalPrivateKeyInput isOpen={isOpen} onClose={onClose} /> */}
   {isOpen && <ModalInputMnemonic isOpen={isOpen} onClose={onClose} />}   
    </div>
  )
}
