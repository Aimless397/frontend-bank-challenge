/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from 'react'

import { AxiosError } from 'axios'

import { AuthContext } from './AuthContext'
import { BankContext } from './BankContext'
import bankApi from '../services/api'
import {
  Account,
  AccountResponse,
  AccountsResponse,
  CreateAccountRequestBody,
  ErrorResponse,
  HOCProps,
  SidebarItem,
  Transaction,
  TransactionRequestParams,
  TransactionResponse,
  TransactionsResponse,
  User,
  UserRequestParams,
  UserResponse,
} from '../interfaces/interfaces'
import { TransactionRequestBody } from '../interfaces/interfaces'

export const BankProvider = ({ children }: HOCProps) => {
  const [sidebarItemSelected, setSidebarItemSelected] =
    useState<string>('Accounts')
  const [accounts, setAccounts] = useState<Account[]>()
  const [account, setAccount] = useState<Account>()
  const [transactions, setTransactions] = useState<Transaction[]>()
  const [transaction, setTransaction] = useState<Transaction>()
  const [user, setUser] = useState<User>()
  const [errorMessage, setErrorMessage] = useState<string>('')

  const { logout } = useContext(AuthContext)

  useEffect(() => {
    if (errorMessage === 'Token expired') {
      logout()
    }
  }, [errorMessage])

  const getAccounts = async (): Promise<void> => {
    try {
      const { data } = await bankApi.get<AccountsResponse>('/accounts')

      setAccounts(data.accounts)
    } catch (error: unknown) {
      let errorResponse: ErrorResponse
      if (error instanceof AxiosError) {
        errorResponse = error.response?.data as ErrorResponse
      } else {
        errorResponse = { msg: String(error) }
      }

      setErrorMessage(errorResponse.msg)
    }
  }

  const createAccount = async ({
    accountType,
    currentBalance,
  }: CreateAccountRequestBody): Promise<void> => {
    try {
      const { data } = await bankApi.post<AccountResponse>('/accounts', {
        accountType,
        currentBalance,
      })

      setAccount(data.account)
    } catch (error: unknown) {
      let errorResponse: ErrorResponse
      if (error instanceof AxiosError) {
        errorResponse = error.response?.data as ErrorResponse
      } else {
        errorResponse = { msg: String(error) }
      }

      setErrorMessage(errorResponse.msg)
    }
  }

  const getTransactionsByIdAccount = async ({
    idAccount,
  }: TransactionRequestParams): Promise<void> => {
    try {
      const { data } = await bankApi.get<TransactionsResponse>(
        `/accounts/${idAccount}/transactions`
      )

      setTransactions(data.transactions)
    } catch (error: unknown) {
      let errorResponse: ErrorResponse
      if (error instanceof AxiosError) {
        errorResponse = error.response?.data as ErrorResponse
      } else {
        errorResponse = { msg: String(error) }
      }

      setErrorMessage(errorResponse.msg)
    }
  }

  const createTransaction = async ({
    transmitter,
    receiver,
    amount,
  }: TransactionRequestBody): Promise<void> => {
    try {
      const { data } = await bankApi.post<TransactionResponse>(
        '/accounts/transactions',
        { transmitter, receiver, amount }
      )

      setTransaction(data.transaction)
    } catch (error: unknown) {
      let errorResponse: ErrorResponse
      if (error instanceof AxiosError) {
        errorResponse = error.response?.data as ErrorResponse
      } else {
        errorResponse = { msg: String(error) }
      }

      setErrorMessage(errorResponse.msg)
      throw error
    }
  }

  const getUserById = async ({ idUser }: UserRequestParams): Promise<void> => {
    try {
      const { data } = await bankApi.get<UserResponse>(`/users/${idUser}`)

      setUser(data.user)
    } catch (error: unknown) {
      let errorResponse: ErrorResponse
      if (error instanceof AxiosError) {
        errorResponse = error.response?.data as ErrorResponse
      } else {
        errorResponse = { msg: String(error) }
      }

      setErrorMessage(errorResponse.msg)
    }
  }

  const setSidebarItem = ({ sidebarItem }: SidebarItem) => {
    setSidebarItemSelected(sidebarItem)
  }

  const clearErrorMessage = () => {
    setErrorMessage('')
  }

  return (
    <BankContext.Provider
      value={{
        accounts,
        account,
        transactions,
        transaction,
        user,
        errorMessage,
        sidebarItemSelected,
        setSidebarItem,
        clearErrorMessage,
        getAccounts,
        createAccount,
        getTransactionsByIdAccount,
        setTransactions,
        createTransaction,
        getUserById,
      }}
    >
      {children}
    </BankContext.Provider>
  )
}
