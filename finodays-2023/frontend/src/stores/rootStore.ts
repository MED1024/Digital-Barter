import { createContext, useContext } from 'react'
import { UserStore } from './userStore'

export const stores = {
  userStore: new UserStore(),
}

export const StoreContext = createContext(stores)

export const useStore = () => {
  return useContext(StoreContext)
}
