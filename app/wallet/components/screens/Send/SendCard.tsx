import Transaction from '@/blockchain/Transaction'
import Title from '@/components/commons/Title'
import useAccount from '@/hooks/useAccount'
import useBlockchain from '@/hooks/useBlockchain'
import { renderAddress, renderTxHash, sleep } from '@/utils'
import { Button } from '@nextui-org/button'
import { Card, CardBody, CardHeader } from '@nextui-org/card'
import { Input } from '@nextui-org/input'
import React, { useEffect, useMemo, useState } from 'react'

import { isAddress, isAddressEqual } from 'viem'

const SendCard = () => {
  const account = useAccount()

  const [loading, setLoading] = useState(false)

  const [amount, setAmount] = useState('')
  const [receiver, setReceiver] = useState('')

  const blockchain = useBlockchain((state) => state.blockchain)

  const onSend = async () => {
    if (!+amount) return
    setLoading(true)
    await sleep(300)

    blockchain?.createTransaction(
      new Transaction(account.address, receiver, 'transfer', +amount)
    )
    setAmount('')
    setReceiver('')

    setLoading(false)
  }

  const isReceiverEqualAccount = useMemo(
    () =>
      isAddress(receiver) ? isAddressEqual(receiver, account.address) : false,
    [receiver, account.address]
  )

  const errorMessage = useMemo(() => {
    if (!receiver) return ''
    if (isReceiverEqualAccount) {
      return 'You cannot send to your address'
    }
    if (!isAddress(receiver)) {
      return 'Address invalid'
    }
  }, [isReceiverEqualAccount, receiver])

  const isInvalid = useMemo(() => {
    return (
      (Boolean(receiver) && (isReceiverEqualAccount || !isAddress(receiver))) ||
      +amount > +account.balance
    )
  }, [isReceiverEqualAccount, receiver, amount, account.balance])

  return (
    <Card className="flex-grow p-6">
      <CardHeader>
        <Title titleProps={{ size: 'sm', color: 'violet' }}>
          {' '}
          Send Ethereum (ETH)
        </Title>
      </CardHeader>

      <CardBody>
        <div className="flex justify-end mb-1">Balance: {account.balance}</div>
        <div className="flex gap-4 mb-6">
          <Input
            label="Receiver address"
            variant="bordered"
            placeholder="Enter receiver address "
            isClearable
            value={receiver}
            onValueChange={(value) => {
              setReceiver(value)
            }}
            isInvalid={isInvalid}
            errorMessage={errorMessage}
          />
          <Input
            label="Amount"
            variant="bordered"
            placeholder="Enter your amount"
            value={amount}
            onValueChange={(value) => {
              setAmount(value)
            }}
            endContent={
              <Button
                onClick={() => setAmount(account?.balance + '')}
                className="w-6 h-8"
                color="default"
              >
                Max
              </Button>
            }
          />
        </div>

        <Button
          isDisabled={isInvalid || !Boolean(receiver)}
          isLoading={loading}
          onClick={onSend}
          color="secondary"
        >
          Send
        </Button>
      </CardBody>
    </Card>
  )
}

export default SendCard
