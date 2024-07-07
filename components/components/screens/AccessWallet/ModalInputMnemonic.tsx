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

import {
  onSaveKeyStore,
  useCreateKeyStore,
  useCreateMnemonic
} from '@/hooks/useCreateWallet'
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem
} from '@nextui-org/dropdown'
import Wallet from 'ethereumjs-wallet'
import { createBlob, saveFile } from '@/utils'
import { keyStoreOption } from '@/config'
const ModalInputMnemonic = ({
  isOpen,
  onClose
}: {
  isOpen: boolean
  onClose: () => void
}) => {
  const [updateMnemonic, setUpdateMnemonic] = useState(false)
  const [selectedKeys, setSelectedKeys] = React.useState(new Set([12]))
  const selectedValue = React.useMemo(
    () => Array.from(selectedKeys).join(', ').replaceAll('_', ' '),
    [selectedKeys]
  )

  const [file, setFile] = useState(null)
  const mnemonic = useCreateMnemonic({
    numberOfWords: +selectedValue as 12 | 24,
    resetNewMnemonic: updateMnemonic
  })
  // const account = mnemonicToAccount(mnemonic)

  const onGenKeyStore = () => {
    const wallet = Wallet.generate()
    wallet.toV3('123123', keyStoreOption).then((v3Key) => {
      const blobCreated = createBlob(v3Key)
      saveFile(blobCreated, wallet.getV3Filename(new Date().getTime()))
    })
  }

  return (
    <Modal size="3xl" hideCloseButton isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-4">
              <div>Write down these words </div>
              <div className="flex items-center justify-between">
                {/* <Snippet
                  hideSymbol
                  codeString={mnemonic}
                  variant="shadow"
                  color="primary"
                >
                  Copy mnemonic
                </Snippet> */}

                <Input
                  type="file"
                  onChange={(e) => {
                    const [file] = e.target.files
                    console.log('file:', file)
                    const reader = new FileReader()
                    reader.addEventListener(
                      'load',
                      () => {
                        Wallet.fromV3(reader.result || '', '123456789').then(
                          (result) => {
                            console.log('result:', result.getAddressString())
                          }
                        )
                      },
                      false
                    )
                    if (file) {
                      reader.readAsText(file)
                    }
                  }}
                />
                <div className="flex items-center justify-end gap-4">
                  <div
                    onClick={() => setUpdateMnemonic((prev) => !prev)}
                    className="text-sm cursor-pointer text-primary"
                  >
                    Update
                  </div>
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
                      onSelectionChange={setSelectedKeys}
                    >
                      <DropdownItem key={12}>12 Words</DropdownItem>
                      <DropdownItem key={24}>24 Words</DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                </div>
              </div>
            </ModalHeader>
            <ModalBody>
              <div className="grid grid-cols-4 gap-4">
                {mnemonic.split(' ').map((key, index) => (
                  <Input
                    key={`${key}_${index}_${selectedValue}`}
                    className="w-full"
                    label={`${index + 1}.`}
                    placeholder=""
                    value={key}
                    readOnly
                  />
                ))}
              </div>
            </ModalBody>
            <ModalFooter>
              <Button color="default">Back</Button>
              <Button color="primary" onPress={onGenKeyStore}>
                I wrote them down
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  )
}

export default ModalInputMnemonic
