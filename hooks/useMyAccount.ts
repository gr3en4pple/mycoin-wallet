import React from 'react'
import { useAccount } from 'wagmi'

const useMyAccount = () => {
  const { address } = useAccount()
}

export default useMyAccount
