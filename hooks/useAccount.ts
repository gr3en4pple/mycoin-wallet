import { Address } from 'viem'
import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
interface Account {
  account: null | Address
  setAccount: (account: null | Address) => void
}

const useAccount = create<Account>()(
  persist(
    (set, get) => ({
      account: null,
      setAccount: (account) => set({ account })
    }),
    {
      name: 'account-storage', // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => localStorage) // (
    }
  )
)

export default useAccount
