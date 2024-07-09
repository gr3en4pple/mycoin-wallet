'use client'
import useBlockchain, { Node } from '@/hooks/useBlockchain'
import { Button } from '@nextui-org/button'
import React, { useState } from 'react'
import { Card, CardBody, CardHeader } from '@nextui-org/card'
import Title from '@/components/commons/Title'
import useAccount from '@/hooks/useAccount'
import { Input } from '@nextui-org/input'
import { sleep } from '@/utils'

const Stake = () => {
  const account = useAccount()

  const [amount, setAmount] = useState('')
  const [loading, setLoading] = useState(false)

  const algorithm = useBlockchain((state) => state.algorithm)
  const setNode = useBlockchain((state) => state.setNode)

  const onStake = async () => {
    if (!+amount) return
    setLoading(true)
    await sleep(300)
    setLoading(false)

    const stakeResponse: Node =
      algorithm?.stake([account.address, account.balance], +amount) || []
    setNode({
      payload: {
        address: account.address,
        newBalance: stakeResponse?.[1]
      },
      type: 'updateBalance'
    })

    setAmount('')
  }

  return (
    <Card className="flex-grow p-6">
      <CardHeader className="flex justify-center">
        <Title titleProps={{ size: 'sm', color: 'violet', fullWidth: true }}>
          Stake Ethereum and become validator
        </Title>
      </CardHeader>

      <CardBody>
        <div className="flex justify-end mb-1">Balance: {account.balance}</div>
        <div className="mb-6">
          <Input
            label="Stake Amount"
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

        <Button onClick={onStake} isLoading={loading} color="secondary">
          Stake
        </Button>

        {/* <Table className="mt-8">
          <TableHeader>
            <TableColumn>Address</TableColumn>
            <TableColumn>Staked</TableColumn>
            <TableColumn>Current Balance</TableColumn>
          </TableHeader>
          <TableBody>
            {blockchain
              ? blockchain?.chain?.map((block) => {
                  const transaction = block.transactions

                  return (
                    <TableRow key={block.hash}>
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <span>{renderTxHash(block.hash)}</span>
                        </div>
                      </TableCell>
                      <TableCell>"haha</TableCell>
                      <TableCell>
                        {transaction === 'GenesisBlock'
                          ? ''
                          : transaction.map((tx: Transaction) => (
                              <div>
                                From: {renderAddress(tx?.fromAddress || '')}{' '}
                                {'\n'}
                                To: {renderAddress(tx?.toAddress || '')} {'\n'}
                                Amount: {tx?.amount} {'\n'}
                              </div>
                            ))}
                      </TableCell>
                    </TableRow>
                  )
                })
              : null}
          </TableBody>
        </Table> */}
      </CardBody>
    </Card>
  )
}

export default Stake
