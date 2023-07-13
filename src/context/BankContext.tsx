import { createContext } from 'react'
import {
  Account,
  CreateAccountRequestBody,
  SidebarItem,
  Transaction,
  TransactionRequestBody,
  TransactionRequestParams,
  User,
  UserRequestParams,
} from '../interfaces/interfaces'

type BankContextProps = {
  accounts: Account[] | undefined
  account: Account | undefined
  transactions: Transaction[] | undefined
  transaction: Transaction | undefined
  user: User | undefined
  errorMessage: string
  sidebarItemSelected: string
  setSidebarItem: ({ sidebarItem }: SidebarItem) => void
  clearErrorMessage: () => void
  getAccounts: () => Promise<void>
  createAccount: ({
    accountType,
    currentBalance,
  }: CreateAccountRequestBody) => Promise<void>
  getTransactionsByIdAccount: ({
    idAccount,
  }: TransactionRequestParams) => Promise<void>
  setTransactions: React.Dispatch<
    React.SetStateAction<Transaction[] | undefined>
  >
  createTransaction: ({
    transmitter,
    receiver,
    amount,
  }: TransactionRequestBody) => Promise<void>
  getUserById: ({ idUser }: UserRequestParams) => Promise<void>
}

export const BankContext = createContext({} as BankContextProps)
