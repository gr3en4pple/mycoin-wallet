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

export const keyStoreOption = { kdf: 'scrypt', n: 131072 }

interface ModalAccessKeyStore {
  isOpen: boolean
  onClose: () => void
}
const ModalAccessKeyStore = ({ isOpen, onClose }: ModalAccessKeyStore) => {
  const [showPw, setShowPw] = useState(false)

  const fileRef = useRef(null)

  const [password, setPassword] = useState('')

  const [onGenerating, setGenerating] = useState(false)

  const onGetAccount = () => {
    const [file] = fileRef?.current?.files
    const reader = new FileReader()
    if (!file) return
    reader.addEventListener(
      'load',
      async () => {
        setGenerating(true)
        try {
          const result = await Wallet.fromV3(reader.result || '', password)
          console.log('result:', result.getChecksumAddressString())
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
              <Input
                ref={fileRef}
                onChange={onInputFile}
                type="file"
                variant="flat"
              />
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
              <Button color="default">Back</Button>
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
