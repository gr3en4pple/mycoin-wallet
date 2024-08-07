import { create } from 'zustand'
import Blockchain from '@/blockchain/Blockchain'
import ProofOfStake from '@/blockchain/consensus/proof-of-stake'
import { Address } from 'viem'
import { immer } from 'zustand/middleware/immer'

export type Node = (number | Address)[]
export type Nodes = Node[]
export type SetNodeAction = 'accessWallet' | 'updateBalance' | 'updateAll'

interface IBlockChain {
  blockchain: null | Blockchain
  algorithm: null | ProofOfStake
  blockCreatedCount: number
  inCreaseBlock: () => void
  nodes: Nodes
  setNode: ({ payload, type }: { payload: any; type: SetNodeAction }) => void
  account: Node | null
}

const defaultNodes: Nodes = [
  ['0x1111111111111111111111111111111111111111', 1000],
  ['0x2222222222222222222222222222222222222222', 1000]
]

const useBlockchain = create<IBlockChain>()(
  immer((set, get) => ({
    blockchain: new Blockchain(),
    algorithm: new ProofOfStake(),
    nodes: defaultNodes,
    blockCreatedCount: 0,
    account: null,
    setNode: ({ payload, type }) =>
      set((state) => {
        if (type === 'accessWallet') {
          const isExistNode = state.nodes.find(
            (node) =>
              (node[0] as string)?.toLowerCase() === payload?.toLowerCase()
          )
          if (!isExistNode) {
            const newNode = [payload, 1000] as Node
            state.account = newNode
            state.nodes.push(newNode)
          } else {
            state.account = isExistNode
          }
        }
        if (type === 'updateBalance') {
          const index = state.nodes.findIndex(
            (node) =>
              (node[0] as string)?.toLowerCase() ===
              payload?.address?.toLowerCase()
          )
          if (index === -1) return
          state.nodes[index][1] = payload?.newBalance
          state.account = [state.account?.[0], payload?.newBalance]
        }
        if (type === 'updateAll') {
          state.nodes = payload
        }
      }),

    inCreaseBlock: () =>
      set((state) => ({ blockCreatedCount: state.blockCreatedCount + 1 }))
  }))
)

export default useBlockchain
