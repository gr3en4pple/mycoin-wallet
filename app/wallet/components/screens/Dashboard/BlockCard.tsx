'use client'
import useBlockchain from '@/hooks/useBlockchain'
import { Card, CardBody, CardHeader } from '@nextui-org/card'
import React from 'react'

const BlockCard = () => {
  const { blockCreatedCount } = useBlockchain()
  return (
    <Card className="flex justify-start p-3 cursor-pointer w-[300px] rounded-xl ">
      <CardHeader className="flex-col items-start px-4 pt-2 pb-0">
        <p className="text-xl font-bold uppercase">Network</p>
      </CardHeader>

      <CardBody className="">
        <div className="p-4 rounded-xl flex items-center justify-between w-full bg-black">
          <div className="space-y-3 ">
            <div className="font-semibold text-white"> Giangereum</div>

            <div className="text-sm text-default-500">
              Block number: {blockCreatedCount}
            </div>
          </div>
          <div className="bg-white rounded-xl">
            <img
              width={42}
              height={42}
              src="https://www.myetherwallet.com/img/eth.a30b3d6f.svg"
            />
          </div>
        </div>
      </CardBody>
    </Card>
  )
}

export default BlockCard
