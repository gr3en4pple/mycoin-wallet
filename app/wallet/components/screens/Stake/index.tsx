'use client'
import useBlockchain, { Node } from '@/hooks/useBlockchain'
import { Button } from '@nextui-org/button'
import React, { useState } from 'react'
import { Card, CardBody, CardHeader } from '@nextui-org/card'
import Title from '@/components/commons/Title'
import useAccount from '@/hooks/useAccount'
import { Input } from '@nextui-org/input'
import { renderAddress, renderTxHash, sleep } from '@/utils'
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell
} from '@nextui-org/table'
import Transaction from '@/blockchain/Transaction'
import { CheckIcon } from '@nextui-org/shared-icons'
import { Address } from 'viem'
const Stake = () => {
  const account = useAccount()

  const [amount, setAmount] = useState('')
  const [loading, setLoading] = useState(false)

  const algorithm = useBlockchain((state) => state.algorithm)
  const setNode = useBlockchain((state) => state.setNode)
  const nodes = useBlockchain((state) => state.nodes)

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

        <Table className="mt-8">
          <TableHeader>
            <TableColumn>Address</TableColumn>
            <TableColumn>Staked</TableColumn>
          </TableHeader>
          <TableBody>
            {nodes ? (
              nodes?.map((node) => {
                const address = node[0] as Address
                const isMaxStaker =
                  algorithm?.getValidatorWithMaxStake()[0] === node[0]
                return (
                  <TableRow key={address}>
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <span>{renderAddress(address)}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <span>{algorithm?.getStakedAmount(address)}</span>

                        {isMaxStaker ? (
                          <div className=" flex items-center space-x-2">
                            <span>Validator</span>
                            <CheckIcon color="teal" />
                          </div>
                        ) : null}
                      </div>
                    </TableCell>
                  </TableRow>
                )
              })
            ) : (
              <></>
            )}
          </TableBody>
        </Table>
      </CardBody>
    </Card>
  )
}

export default Stake
