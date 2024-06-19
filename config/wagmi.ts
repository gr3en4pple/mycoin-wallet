import { http, createConfig } from 'wagmi'
import { mainnet, sepolia, bscTestnet } from 'wagmi/chains'
import { coinbaseWallet, injected, walletConnect } from 'wagmi/connectors'

export const config = createConfig({
  chains: [mainnet, sepolia, bscTestnet],
  connectors: [injected(), coinbaseWallet({ appName: 'Create Wagmi' })],
  ssr: true,
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
    [bscTestnet.id]: http()
  }
})

declare module 'wagmi' {
  interface Register {
    config: typeof config
  }
}
