import { Address } from 'viem'
import useBlockchain from './useBlockchain'
import { NULL_ADDRESS } from '@/config'
import { useMemo } from 'react'
import Transaction from '@/blockchain/Transaction'

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

export const useGetAccountTransactions = (address: Address) => {
  const blockchain = useBlockchain((state) => state.blockchain)
  const blockCreatedCount = useBlockchain((state) => state.blockCreatedCount)

  const transactions = useMemo(() => {
    let result: Transaction[] = []
    blockchain?.chain?.slice(1)?.forEach((block) => {
      result = [...result, ...block.transactions]
    })
    return result.filter(
      (tx) =>
        (tx?.fromAddress &&
          tx?.fromAddress?.toLowerCase() === address?.toLowerCase()) ||
        (tx?.toAddress &&
          tx?.toAddress?.toLowerCase() === address?.toLowerCase())
    )
  }, [blockchain?.chain, blockCreatedCount, address])

  return transactions
}

export default useAccount
