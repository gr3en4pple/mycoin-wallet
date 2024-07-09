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
import React, { useEffect, useMemo, useState } from 'react'

import Wallet from 'ethereumjs-wallet'
import { createBlob, saveFile } from '@/utils'
import { EyeSlashFilledIcon, EyeFilledIcon } from '@nextui-org/shared-icons'

export const keyStoreOption = { kdf: 'scrypt', n: 131072 }

interface iModalCreateKeystore {
  isOpen: boolean
  onClose: () => void
}
const ModalCreateKeystore = ({ isOpen, onClose }: iModalCreateKeystore) => {
  const [showPw, setShowPw] = useState(false)

  const [password, setPassword] = useState('')

  const [onGenerating, setGenerating] = useState(false)

  const onGenKeyStore = async () => {
    const wallet = Wallet.generate()
    setGenerating(true)
    try {
      const v3Key = await wallet.toV3(password, keyStoreOption)
      const blobCreated = createBlob(v3Key)
      saveFile(blobCreated, wallet.getV3Filename(new Date().getTime()))
      onClose()
    } catch (error) {}
    setGenerating(false)
  }

  const error = useMemo(() => {
    if (!password.trim())
      return {
        isError: true,
        msg: ''
      }
    if (password.length < 8)
      return {
        isError: true,
        msg: 'Password length must be greater or equal 8'
      }
    return {
      isError: false,
      msg: ''
    }
  }, [password])

  return (
    <Modal size="xl" hideCloseButton isDismissable={onGenerating} isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-4">
              <div className="text-2xl font-semibold">Create Keystore</div>
            </ModalHeader>
            <ModalBody>
              <Input
                label="Password"
                variant="bordered"
                placeholder="Input your Keystore file password"
                value={password}
                fullWidth
                onChange={(e) => setPassword(e.target.value)}
                errorMessage={error?.msg}
                isClearable
                isInvalid={Boolean(error?.msg)}
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
              <Button color="default" isDisabled={onGenerating} onPress={onClose}>
                Back
              </Button>
              <Button
                color="primary"
                isDisabled={error.isError}
                onPress={onGenKeyStore}
                isLoading={onGenerating}
              >
                {onGenerating
                  ? 'Generating Keystore file'
                  : ' Download Keystore File'}
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  )
}

export default ModalCreateKeystore
