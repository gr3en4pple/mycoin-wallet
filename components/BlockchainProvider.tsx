'use client'
import { BLOCK_TIME } from '@/config'
import useBlockchain from '@/hooks/useBlockchain'
import React from 'react'

interface IBlockchainProvider extends React.PropsWithChildren {}

const BlockchainProvider: React.FC<IBlockchainProvider> = ({ children }) => {
  const { blockchain, algorithm, inCreaseBlock, nodes, setNode } =
    useBlockchain()
  React.useEffect(() => {
    let interval: any
    if (blockchain && algorithm) {
      const nodesStaked = algorithm.createValidators(nodes, [300, 200])
      setNode({ payload: nodesStaked, type: 'updateAll' })

      interval = setInterval(() => {
        const validator = algorithm.getValidatorWithMaxStake()[0]
        blockchain.generateBlock(validator)
        inCreaseBlock()
      }, BLOCK_TIME)
    }

    return () => interval && clearInterval(interval)
  }, [blockchain, algorithm])

  return children
}

export default BlockchainProvider
