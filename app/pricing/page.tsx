import Title from '@/components/commons/Title'

import WalletCardItem from '@/components/screens/AccessWallet/WalletCardItem'
export default function PricingPage() {
  return (
    <div>
      <div className="mb-5">
        <Title titleProps={{ color: 'violet' }}>Access Wallet</Title>
      </div>

      <WalletCardItem
        title="Access Software Wallet"
        subTitle="Keystore File, Mnemonic Phase and Private Key"
      />
    </div>
  )
}
