'use client'
import BiographyCard from '@/app/wallet/components/screens/Dashboard/BiographyCard'
import Title from '@/components/commons/Title'
import useBlockchain from '@/hooks/useBlockchain'
import React, { useMemo } from 'react'
import { Address, isAddressEqual } from 'viem'
import { Tabs, Tab } from '@nextui-org/tabs'

import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell
} from '@nextui-org/table'
import { renderAddress, renderTxHash } from '@/utils'
import Transaction from '@/blockchain/Transaction'
import { NULL_ADDRESS } from '@/config'
import { Snippet } from '@nextui-org/snippet'

interface IBlockExplorer {
  address: string
}

const BlockExplorer: React.FC<IBlockExplorer> = ({ address }) => {
  const blockchain = useBlockchain((state) => state.blockchain)
  const blockCreatedCount = useBlockchain((state) => state.blockCreatedCount)
  const nodes = useBlockchain((state) => state.nodes)

  const node = useMemo(
    () =>
      nodes.find(
        (node) => (node[0] + '')?.toLowerCase() === address?.toLowerCase()
      ),
    [nodes, address]
  )

  if (!node)
    return (
      <Title
        titleProps={{
          color: 'yellow',
          size: 'md'
        }}
      >
        Account not exist!
      </Title>
    )

  const addressBalance = useMemo(
    () => node && blockchain?.getBalanceOfAddress([node[0], node[1]]),
    [node, blockchain, blockCreatedCount]
  )

  const transactions = useMemo(() => {
    return blockchain?.chain
      ?.slice(1)
      ?.map((block) => block.transactions)
      .flat()
  }, [blockchain?.chain, blockCreatedCount, address])

  return (
    <div>
      <div className="mb-4">
        <BiographyCard balance={addressBalance} account={node[0] as Address} />
      </div>

      <Tabs aria-label="Options">
        <Tab key="transactions" title="Transactions">
          <Table isHeaderSticky className="max-h-[400px]">
            <TableHeader>
              <TableColumn>Method</TableColumn>
              <TableColumn>From</TableColumn>
              <TableColumn>To</TableColumn>
              <TableColumn>Date</TableColumn>
              <TableColumn>Amount</TableColumn>
            </TableHeader>
            <TableBody>
              {transactions?.length ? (
                transactions
                  ?.filter(
                    (tx: Transaction) =>
                      (tx?.fromAddress &&
                        tx?.fromAddress?.toLowerCase() ===
                          address?.toLowerCase()) ||
                      (tx?.toAddress &&
                        tx?.toAddress?.toLowerCase() === address?.toLowerCase())
                  )
                  .map((tx: Transaction, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <span>{tx.functionType}</span>
                        </div>
                      </TableCell>

                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <Snippet
                            hideSymbol
                            codeString={tx.fromAddress ?? NULL_ADDRESS}
                            variant="shadow"
                            color="default"
                          >
                            {renderAddress(tx.fromAddress ?? NULL_ADDRESS)}
                          </Snippet>
                          <span></span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <Snippet
                            hideSymbol
                            codeString={tx.toAddress ?? NULL_ADDRESS}
                            variant="shadow"
                            color="default"
                          >
                            {renderAddress(tx.toAddress ?? NULL_ADDRESS)}
                          </Snippet>
                        </div>
                      </TableCell>

                      <TableCell>
                        <div className="flex items-center space-x-3 font-semibold">
                          <span>{new Date(tx.date || 0).toLocaleString()}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-3 font-semibold">
                          <span>{tx.amount}</span>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
              ) : (
                <></>
              )}
            </TableBody>
          </Table>
        </Tab>
      </Tabs>
    </div>
  )
}

export default BlockExplorer
