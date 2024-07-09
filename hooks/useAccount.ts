import { Address } from 'viem'
import useBlockchain from './useBlockchain'
import { NULL_ADDRESS } from '@/config'
import { useMemo } from 'react'

const useAccount = () => {
  const account = useBlockchain((state) => state.account)
  const blockchain = useBlockchain((state) => state.blockchain)
  const blockCreatedCount = useBlockchain((state) => state.blockCreatedCount)

  const accountBalance = useMemo(
    () => account && blockchain?.getBalanceOfAddress([account[0], account[1]]),
    [account, blockchain, blockCreatedCount]
  )

  if (!account) {
    return { address: NULL_ADDRESS, balance: 0 }
  }

  return {
    address: account[0] as Address,
    balance: accountBalance
  }
}

export default useAccount
