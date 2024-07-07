import { useMemo } from 'react'
import { english, generateMnemonic } from 'viem/accounts'

const useCreateMnemonic = ({
  numberOfWords = 12,
  resetNewMnemonic
}: {
  numberOfWords: 12 | 24
  resetNewMnemonic?: boolean
}) => {
  const mnemonic = useMemo(
    () => generateMnemonic(english, numberOfWords === 12 ? 128 : 256),
    [numberOfWords, resetNewMnemonic]
  )

  return mnemonic
}

export { useCreateMnemonic }
