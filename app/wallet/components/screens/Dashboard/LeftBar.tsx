'use client'
import React, { useEffect } from 'react'
import BiographyCard from './BiographyCard'
import { Card, CardBody, CardHeader } from '@nextui-org/card'
import {
  SendFilledIcon,
  ShieldSecurityIcon,
  AnchorIcon
} from '@nextui-org/shared-icons'
import { usePathname, useRouter } from 'next/navigation'
import classNames from '@/utils/classnames'
import Link from 'next/link'
import useAccount from '@/hooks/useAccount'
import { NULL_ADDRESS } from '@/config'
// import { useRouter } from 'next/router'
const LeftBar = () => {
  const account = useAccount()
  const pathname = usePathname()
  const router = useRouter()

  useEffect(() => {
    if (account.address === NULL_ADDRESS) {
      router.push('/wallet/access')
    }
  }, [account])

  return (
    <div className="h-full">
      <Card className="h-full">
        <CardHeader>
          <BiographyCard
            account={account.address || `0x${'0'.repeat(40)}`}
            balance={account.balance}
          />
        </CardHeader>
        <CardBody className="!px-0 ">
          <div className="pb-4 space-y-2 border-b border-default-100">
            <Link
              className={classNames(
                'flex items-center gap-2 px-4 py-2 font-medium transition duration-100 hover:bg-default-200 cursor-pointer',
                {
                  'bg-default-200': pathname === '/wallet/dashboard'
                }
              )}
              href="/wallet/dashboard"
            >
              <ShieldSecurityIcon />
              Dashboard
            </Link>

            <Link
              className={classNames(
                'flex items-center gap-2 px-4 py-2 font-medium transition duration-100 hover:bg-default-200 cursor-pointer',
                {
                  'bg-default-200': pathname === '/wallet/dashboard/send'
                }
              )}
              href="/wallet/dashboard/send"
            >
              <SendFilledIcon />
              Send
            </Link>
            <Link
              className={classNames(
                'flex items-center gap-2 px-4 py-2 font-medium transition duration-100 hover:bg-default-200 cursor-pointer',
                {
                  'bg-default-200': pathname === '/wallet/dashboard/stake'
                }
              )}
              href="/wallet/dashboard/stake"
            >
              <AnchorIcon />
              Stake
            </Link>
          </div>
        </CardBody>
      </Card>
    </div>
  )
}

export default LeftBar
