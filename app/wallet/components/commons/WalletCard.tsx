import { Card, CardHeader, CardProps } from '@nextui-org/card'
import React, { HTMLAttributes } from 'react'

interface IWalletCard extends CardProps {
  titleContent: React.ReactNode
  subTitleContent: React.ReactNode
}

const WalletCard = ({
  titleContent,
  subTitleContent,
  ...props
}: IWalletCard) => {
  return (
    <Card
      className="py-4 cursor-pointer hover:opacity-70 transition-opacity"
      onClick={props.onClick}
      {...props}
    >
      <CardHeader className="text-left space-y-3 pb-0 pt-2 px-4 flex-col items-start">
        <p className="text-xl uppercase font-bold">{titleContent}</p>
        <h4 className="font-bold text-small text-default-400">
          {subTitleContent}
        </h4>
      </CardHeader>
    </Card>
  )
}

export default WalletCard
