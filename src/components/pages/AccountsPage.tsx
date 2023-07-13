/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect } from 'react'

import { useNavigate } from 'react-router-dom'

import { NavigateTransactionParams } from '../../interfaces/interfaces'
import { BankContext } from '../../context/BankContext'

export const AccountsPage = () => {
  const { setSidebarItem, getAccounts, accounts } = useContext(BankContext)

  const navigate = useNavigate()

  const fetchAccounts = async () => {
    await getAccounts()
  }

  const onCreateAccount = () => {
    navigate('/create-account')
  }

  const onClickAccount = ({
    idAccount,
    accountType,
    accountNumber,
    currentBalance,
  }: NavigateTransactionParams) => {
    navigate('/transactions', {
      state: { idAccount, accountType, accountNumber, currentBalance },
    })
  }

  useEffect(() => {
    void fetchAccounts()
  }, [])

  useEffect(() => {
    setSidebarItem({ sidebarItem: 'Accounts' })
  }, [])

  return (
    <div className='container mt-5'>
      <h2>Your Accounts</h2>
      <hr />
      <div className='accountsContainer mt-5'>
        <button
          className='btn btn-sm btn-success mb-2'
          onClick={onCreateAccount}
        >
          Create Account
        </button>
        <table className='table table-hover text-center'>
          <thead className='table-dark'>
            <tr>
              <th>Account Number</th>
              <th>Account Type</th>
              <th>Current Balance</th>
            </tr>
          </thead>
          <tbody>
            {accounts?.map((account) => (
              <tr
                className='tableRow'
                key={account.idAccount}
                onClick={() =>
                  onClickAccount({
                    idAccount: account.idAccount,
                    accountType: account.accountType,
                    accountNumber: account.accountNumber,
                    currentBalance: account.currentBalance,
                  })
                }
              >
                <td className='border-left-success'>{account.accountNumber}</td>
                <td>
                  {account.accountType === 'saving' ? 'Saving' : 'Checking'}
                </td>
                <td>{account.currentBalance} USD</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
