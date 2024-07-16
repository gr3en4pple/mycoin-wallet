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

import Wallet from 'ethereumjs-wallet'
import { EyeSlashFilledIcon, EyeFilledIcon } from '@nextui-org/shared-icons'
import useBlockchain from '@/hooks/useBlockchain'

export const keyStoreOption = { kdf: 'scrypt', n: 131072 }

interface ModalAccessKeyStore {
  isOpen: boolean
  onClose: () => void
}
const ModalAccessKeyStore = ({ isOpen, onClose }: ModalAccessKeyStore) => {
  const [showPw, setShowPw] = useState(false)

  const fileRef = useRef<HTMLInputElement | null>(null)

  const setNode = useBlockchain((state) => state.setNode)
  const [password, setPassword] = useState('')

  const [onGenerating, setGenerating] = useState(false)

  const onGetAccount = () => {
    if (!fileRef) return
    const file = fileRef?.current?.files?.[0]

    const reader = new FileReader()
    if (!file) return
    reader.addEventListener(
      'load',
      async () => {
        setGenerating(true)
        try {
          const result = await Wallet.fromV3(reader.result as string, password)
          setNode({
            payload: result.getChecksumAddressString(),
            type: 'accessWallet'
          })
        } catch (error) {
          const errString = error?.toString()
          toast.warning(errString)
        } finally {
          setGenerating(false)
        }
      },
      false
    )
    if (file) {
      reader.readAsText(file)
    }
  }

  const onInputFile = (e: React.ChangeEvent<HTMLInputElement>) => {}

  return (
    <Modal size="xl" hideCloseButton isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-2">
              <div className="text-2xl font-semibold">
                Select your Keystore File
              </div>
              <div className="text-base font-normal">
                Please select keystore file that unlocks your wallet.
              </div>
            </ModalHeader>
            <ModalBody>
              <div className="relative w-full inline-flex tap-highlight-transparent flex-row items-center shadow-sm px-3 gap-3 bg-default-100 data-[hover=true]:bg-default-200 group-data-[focus=true]:bg-default-100 h-10 min-h-10 rounded-medium transition-background motion-reduce:transition-none !duration-150 outline-none group-data-[focus-visible=true]:z-10 group-data-[focus-visible=true]:ring-2 group-data-[focus-visible=true]:ring-focus group-data-[focus-visible=true]:ring-offset-2 group-data-[focus-visible=true]:ring-offset-background">
                <input
                  ref={fileRef}
                  onChange={onInputFile}
                  className="w-full font-normal bg-transparent !outline-none placeholder:text-foreground-500 focus-visible:outline-none data-[has-start-content=true]:ps-1.5 data-[has-end-content=true]:pe-1.5 text-small group-data-[has-value=true]:text-default-foreground "
                  type="file"
                  placeholder="Your Keystore File"
                />
              </div>

              <Input
                label="Password"
                variant="bordered"
                placeholder="Enter your Keystore password"
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

export default ModalAccessKeyStore
