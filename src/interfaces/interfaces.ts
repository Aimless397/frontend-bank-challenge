// Generated by https://quicktype.io
import { ReactNode } from 'react'

export interface SidebarItem {
  sidebarItem: string
}

export interface HOCProps {
  children: ReactNode
}

export interface ErrorResponse {
  msg: string
}

export interface IUser {
  idUser: string
  username: string
  email: string
  password: string
  name: string
  lastname: string
  active: boolean
  createdAt: string
  updatedAt: string | null
}

export interface LoginRequestBody {
  email: string
  password: string
}

export interface RegisterRequestBody {
  username: string
  email: string
  password: string
  name: string
  lastname: string
}

export interface LoginResponse {
  user: IUser
  token: string
}

// GET ACCOUNTS
export interface AccountsResponse {
  accounts: Account[]
}

export interface Account {
  idAccount: string
  owner: string
  accountNumber: string
  accountType: string
  currentBalance: string
  active: boolean
  createdAt: string
  updatedAt: string | null
}

// CREATE ACCOUNT
export interface CreateAccountRequestBody {
  accountType: string
  currentBalance: number
}

export interface AccountResponse {
  account: Account
}

// GET TRANSACTIONS BY ID ACCOUNT
export interface TransactionRequestParams {
  idAccount: string
}

export interface TransactionsResponse {
  transactions: Transaction[]
}

export interface Transaction {
  idTransaction: string
  transmitter: string
  receiver: string
  amount: string
  createdAt: string
  updatedAt: string | null
  account: AccountTransactionResponse
}

export interface AccountTransactionResponse {
  owner: string
  accountNumber: string
  accountType: string
  currentBalance: string
}

// CREATE TRANSACTION
export interface TransactionRequestBody {
  transmitter: string
  receiver: string
  amount: number
}

export interface TransactionResponse {
  transaction: Transaction
}

// GET PROFILE
export interface UserRequestParams {
  idUser: string
}

export interface UserResponse {
  user: User
}

export interface User {
  idUser: string
  username: string
  email: string
  password: string
  name: string
  lastname: string
  active: boolean
  createdAt: string
  updatedAt: string | null
}

export interface NavigateTransactionParams {
  idAccount: string
  accountType: string
  accountNumber: string
  currentBalance: string
}