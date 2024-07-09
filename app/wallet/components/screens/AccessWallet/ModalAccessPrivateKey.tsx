'use client'
import { Button } from '@nextui-org/button'
import { Input } from '@nextui-org/input'
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader
} from '@nextui-org/modal'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import { toast } from 'sonner'

import { EyeSlashFilledIcon, EyeFilledIcon } from '@nextui-org/shared-icons'
import useBlockchain from '@/hooks/useBlockchain'
import {
  Address,
  privateKeyToAccount,
  privateKeyToAddress
} from 'viem/accounts'
import { Hex, isAddress, isHex } from 'viem'
import { useRouter } from 'next/navigation'
import { sleep } from '@/utils'

interface ModalAccessPrivateKey {
  isOpen: boolean
  onClose: () => void
}
const ModalAccessPrivateKey = ({ isOpen, onClose }: ModalAccessPrivateKey) => {
  const router = useRouter()
  const setNode = useBlockchain((state) => state.setNode)

  const [showPw, setShowPw] = useState(false)
  const [password, setPassword] = useState('')

  const [onGenerating, setGenerating] = useState(false)

  const onGetAccount = async () => {
    setGenerating(true)
    try {
      await sleep(300)
      const account = privateKeyToAddress(`0x${password}`)
      setNode({ payload: account, type: 'createAccount' })
      router.push('/wallet/dashboard')
    } catch (error) {
      console.log('error:', error)
    }
    setGenerating(false)
  }

  return (
    <Modal size="xl" hideCloseButton isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-2">
              <div className="text-2xl font-semibold">
                Access Wallet with Private Key
              </div>
              <div className="text-base font-normal">
                Enter your private key
              </div>
            </ModalHeader>
            <ModalBody>
              <Input
                label="Private key"
                variant="bordered"
                placeholder="Enter your private key"
                value={password}
                fullWidth
                onChange={(e) => setPassword(e.target.value)}
                isClearable
                endContent={
                  <button
                    className="focus:outline-none"
                    type="button"
                    onClick={() => setShowPw((prev) => !prev)}
                  >
                    {showPw ? (
                      <EyeFilledIcon className="text-2xl pointer-events-none text-default-400" />
                    ) : (
                      <EyeSlashFilledIcon className="text-2xl pointer-events-none text-default-400" />
                    )}
                  </button>
                }
                type={showPw ? 'text' : 'password'}
              />
            </ModalBody>
            <ModalFooter>
              <Button onClick={onClose} color="default">
                Back
              </Button>
              <Button
                isDisabled={!password}
                isLoading={onGenerating}
                onClick={onGetAccount}
                color="primary"
              >
                Access Wallet
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  )
}

export default ModalAccessPrivateKey
