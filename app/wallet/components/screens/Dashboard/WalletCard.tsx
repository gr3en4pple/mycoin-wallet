import { renderAddress } from '@/utils'
import { Button } from '@nextui-org/button'
import { Card, CardBody, CardFooter, CardHeader } from '@nextui-org/card'
import React, { useState } from 'react'
import { Address } from 'viem'
import { CheckLinearIcon, CopyLinearIcon } from '@nextui-org/shared-icons'
import copy from 'copy-to-clipboard'

interface IWalletCard {
  account: Address
}

const WalletCard = ({ account }: IWalletCard) => {
  const [isCopied, setCopied] = useState(false)

  const onCopy = () => {
    setCopied(true)
    copy(account)
    setTimeout(() => setCopied(false), 400)
  }

  return (
    <Card className="flex justify-start p-3 cursor-pointer bg-gradient-to-br from-violet-500 to-fuchsia-500 w-[200px] rounded-xl ">
      <CardHeader className="flex-col items-start px-4 pt-2 pb-0">
        <p className="font-bold uppercase text-tiny">PORTFOLIO Value</p>
        <small className="text-default-500">{renderAddress(account)}</small>
      </CardHeader>

      <CardBody className="">
        <div className="text-2xl font-semibold gradi">0.00 ETH</div>
      </CardBody>

      <CardFooter className="flex justify-end">
        <Button onClick={onCopy} className="rounded-full" isIconOnly>
          {isCopied ? (
            <CheckLinearIcon className="text-green-500" />
          ) : (
            <CopyLinearIcon />
          )}
        </Button>
      </CardFooter>
    </Card>
  )
}

export default WalletCard
