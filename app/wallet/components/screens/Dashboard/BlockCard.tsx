import { Card, CardBody, CardHeader } from '@nextui-org/card'
import React from 'react'

const BlockCard = () => {
  return (
    <Card className="flex justify-start p-3 cursor-pointer w-[300px] rounded-xl ">
      <CardHeader className="flex-col items-start px-4 pt-2 pb-0">
        <p className="text-xl font-bold uppercase">Network</p>
      </CardHeader>

      <CardBody className="">
        <div className="p-4 space-y-3 rounded-xl bg-[#1c2136]">
          <div className="font-semibold"> Giangereum</div>

          <div className="text-sm text-default-500">Last Block: 12345</div>
        </div>
      </CardBody>
    </Card>
  )
}

export default BlockCard
