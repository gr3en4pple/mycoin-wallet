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
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem
} from '@nextui-org/dropdown'
import { Snippet } from '@nextui-org/snippet'
import { useCreateMnemonic } from '@/hooks/useCreateWallet'

interface iModalCreateMnemonic {
  isOpen: boolean
  onClose: () => void
}
const ModalCreateMnemonic = ({ isOpen, onClose }: iModalCreateMnemonic) => {
  const [selectedKeys, setSelectedKeys] = useState(new Set([12]))
  const [updateMnemonic, setUpdateMnemonic] = useState(false)

  const selectedValue = useMemo(
    () => Array.from(selectedKeys).join(', ').replaceAll('_', ' '),
    [selectedKeys]
  )

  const mnemonic = useCreateMnemonic({
    numberOfWords: +selectedValue as 12 | 24,
    resetNewMnemonic: updateMnemonic
  })

  return (
    <Modal size="3xl" hideCloseButton isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-4">
              <div className="text-2xl">Write down these words </div>
              <div className="flex items-center justify-between">
                <Snippet
                  hideSymbol
                  codeString={mnemonic}
                  variant="shadow"
                  color="primary"
                >
                  Copy mnemonic
                </Snippet>

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
                      onSelectionChange={(keys) =>
                        setSelectedKeys(keys as Set<number>)
                      }
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
              <Button color="default" onPress={onClose}>
                Back
              </Button>
              <Button color="primary" onPress={onClose}>
                I wrote them down
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  )
}

export default ModalCreateMnemonic
