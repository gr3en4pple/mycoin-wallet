'use client'
import {
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarItem,
  NavbarMenuItem
} from '@nextui-org/navbar'

import { Link } from '@nextui-org/link'
import { link as linkStyles } from '@nextui-org/theme'
import NextLink from 'next/link'
import clsx from 'clsx'

import { siteConfig } from '@/config/site'
import { ThemeSwitch } from '@/components/theme-switch'
import { Logo } from '@/components/icons'
import { usePathname } from 'next/navigation'
import { toast, Toaster } from 'sonner'
import { useEffect } from 'react'
import useBlockchain from '@/hooks/useBlockchain'
import { renderAddress, renderTxHash } from '@/utils'
export const Navbar = () => {
  const pathname = usePathname()

  const { blockchain, blockCreatedCount, algorithm } = useBlockchain(
    (state) => ({
      blockchain: state.blockchain,
      blockCreatedCount: state.blockCreatedCount,
      algorithm: state.algorithm
    })
  )

  useEffect(() => {
    if (blockchain && blockCreatedCount > 0 && algorithm) {
      const blockHash = blockchain.getLatestBlock().hash
      const validator = algorithm.getValidatorWithMaxStake()[0]
      toast(
        <div>
          <div>Block has created.</div>
          <div>Block hash: {renderTxHash(blockHash)}</div>
          <div>Validator: {renderAddress(validator + '')}</div>
        </div>,
        {
          duration: 2000,
          position: 'bottom-right'
        }
      )
    }
  }, [blockCreatedCount, blockchain, algorithm])

  return (
    <>
      <Toaster />
      <NextUINavbar maxWidth="xl" position="sticky">
        <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
          <NavbarBrand as="li" className="gap-3 max-w-fit">
            <NextLink
              className="flex items-center justify-start gap-1"
              href="/"
            >
              <Logo />
              <p className="font-bold text-inherit">MyCoinWallet</p>
            </NextLink>
          </NavbarBrand>
          <ul className="justify-start hidden gap-4 ml-2 lg:flex">
            {siteConfig.navItems.map((item) => (
              <NavbarItem key={item.href}>
                <NextLink
                  className={clsx(
                    linkStyles({ color: 'foreground' }),
                    'data-[active=true]:text-primary data-[active=true]:font-medium'
                  )}
                  data-active={item.href === pathname}
                  color="foreground"
                  href={item.href}
                >
                  {item.label}
                </NextLink>
              </NavbarItem>
            ))}
          </ul>
        </NavbarContent>

        <NavbarContent
          className="hidden sm:flex basis-1/5 sm:basis-full"
          justify="end"
        >
          <NavbarItem className="hidden gap-2 sm:flex">
            <ThemeSwitch />
          </NavbarItem>
        </NavbarContent>

        <NavbarContent className="pl-4 sm:hidden basis-1" justify="end">
          <ThemeSwitch />
          <NavbarMenuToggle />
        </NavbarContent>

        <NavbarMenu>
          <div className="flex flex-col gap-2 mx-4 mt-2">
            {siteConfig.navMenuItems.map((item, index) => (
              <NavbarMenuItem key={`${item}-${index}`}>
                <Link
                  color={
                    index === 2
                      ? 'primary'
                      : index === siteConfig.navMenuItems.length - 1
                      ? 'danger'
                      : 'foreground'
                  }
                  href="#"
                  size="lg"
                >
                  {item.label}
                </Link>
              </NavbarMenuItem>
            ))}
          </div>
        </NavbarMenu>
      </NextUINavbar>
    </>
  )
}
