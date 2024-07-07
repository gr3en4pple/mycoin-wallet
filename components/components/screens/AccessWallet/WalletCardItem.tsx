import { Card, CardHeader } from '@nextui-org/card'
import React, { HTMLAttributes } from 'react'

interface WalletCardItem extends React.ComponentProps<'div'> {
  title: React.ReactNode
  subTitle: React.ReactNode
}

const WalletCardItem = ({ title, subTitle, ...props }: WalletCardItem) => {
  return (
    <Card
      className="py-4 cursor-pointer hover:opacity-70 transition-opacity"
      {...props}
    >
      <CardHeader className="space-y-3 pb-0 pt-2 px-4 flex-col items-start">
        <p className="text-lg uppercase font-bold">{title}</p>
        <h4 className="font-bold text-small text-default-400">{subTitle}</h4>
      </CardHeader>
    </Card>
  )
}

export default WalletCardItem
