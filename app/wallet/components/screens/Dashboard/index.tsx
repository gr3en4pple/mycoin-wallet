'use client'
import React from 'react'
import WalletCard from './WalletCard'
import useAccount from '@/hooks/useAccount'
import BlockCard from './BlockCard'

const Dashboard = () => {
  const account = useAccount((state) => state.account)

  if (!account) return null

  return (
    <div className="flex justify-between gap-10">
      <WalletCard account={account} />
      <BlockCard />
    </div>
  )
}

export default Dashboard
