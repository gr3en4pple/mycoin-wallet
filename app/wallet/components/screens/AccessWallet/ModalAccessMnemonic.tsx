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
import React, { useMemo, useState } from 'react'
import { CopyLinearIcon, CheckLinearIcon } from '@nextui-org/shared-icons'
import Wallet from 'ethereumjs-wallet'
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger
} from '@nextui-org/dropdown'
import { mnemonicToAccount } from 'viem/accounts'

import { useRouter } from 'next/navigation'
import useBlockchain from '@/hooks/useBlockchain'

interface ModalAccessMnemonic {
  isOpen: boolean
  onClose: () => void
}
const ModalAccessMnemonic = ({ isOpen, onClose }: ModalAccessMnemonic) => {
  const router = useRouter()

  const setNode = useBlockchain((state) => state.setNode)

  const [mnemonicInput, setMnemonicInput] = useState({})
  const [mnemonic, setMnemonic] = useState<null | string>(null)

  const [isPasted, setPasted] = useState(false)

  const [selectedKeys, setSelectedKeys] = useState(new Set([12]))

  const selectedValue = useMemo(
    () => Array.from(selectedKeys).join(', ').replaceAll('_', ' '),
    [selectedKeys]
  )

  const doPaste = async () => {
    try {
      const data = await navigator?.clipboard?.readText()
      if (!data) return
      setPasted(true)

      data
        .split(' ')
        .forEach((word, index) =>
          setMnemonicInput((prev) => ({ ...prev, [index]: word }))
        )

      setMnemonic(data)

      setTimeout(
        () => setPasted(false),

        200
      )
    } catch {}
  }

  const isMnenmonicValid =
    mnemonic &&
    typeof mnemonic === 'string' &&
    mnemonic.split(' ').length === +selectedValue

  const onCreateAccount = () => {
    if (isMnenmonicValid) {
      const account = mnemonicToAccount(mnemonic)
      setNode({ payload: account.address, type: 'createAccount' })

      router.push('/wallet/dashboard')
    }
  }

  return (
    <Modal size="3xl" hideCloseButton isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-2">
              <div className="text-2xl font-semibold">
                Access Wallet with Mnemonic Phrase
              </div>
              <div className="text-base font-normal">
                Enter your Mnemonic Phrase
              </div>
            </ModalHeader>
            <ModalBody>
              <div className="flex items-center justify-between gap-4 mb-6">
                <Button
                  variant="shadow"
                  color="primary"
                  className=""
                  onClick={doPaste}
                >
                  {isPasted ? <CheckLinearIcon /> : <CopyLinearIcon />} Paste
                </Button>
                <Dropdown>
                  <DropdownTrigger className="flex justify-end">
                    <Button
                      variant="bordered"
                      className="capitalize w-[fit-content]"
                    >
                      {selectedValue} Words
                    </Button>
                  </DropdownTrigger>
                  <DropdownMenu
                    aria-label="Single selection example"
                    variant="flat"
                    disallowEmptySelection
                    selectionMode="single"
                    selectedKeys={selectedKeys}
                    onSelectionChange={(keys) =>
                      setSelectedKeys(keys as Set<number>)
                    }
                  >
                    <DropdownItem key={12}>12 Words</DropdownItem>
                    <DropdownItem key={24}>24 Words</DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </div>
              <div className="grid items-center grid-cols-4 gap-6">
                {[...Array(+selectedValue).keys()].map((key) => (
                  <Input
                    key={`${key + 1}.${selectedValue}`}
                    label={`${key + 1}.`}
                    variant="flat"
                    fullWidth
                    onChange={(e) => {
                      const { value } = e.target
                      if (
                        key === 0 &&
                        value.split(' ').length === +selectedValue
                      ) {
                        setMnemonic(value)
                        value.split(' ').forEach((word, index) =>
                          setMnemonicInput((prev) => ({
                            ...prev,
                            [index]: word
                          }))
                        )
                        return
                      }
                      setMnemonicInput((prev) => ({ ...prev, [key]: value }))
                    }}
                    value={
                      mnemonicInput?.[key as keyof typeof mnemonicInput] ?? ''
                    }
                  />
                ))}
              </div>
            </ModalBody>
            <ModalFooter>
              <Button onClick={onClose} color="default">
                Back
              </Button>
              <Button
                isDisabled={!isMnenmonicValid}
                onClick={onCreateAccount}
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

export default ModalAccessMnemonic
