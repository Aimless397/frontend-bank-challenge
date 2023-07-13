/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { useLocation, useNavigate } from 'react-router-dom'
import { useContext, useEffect } from 'react'
import { BankContext } from '../../context/BankContext'
import { IonIcon } from '@ionic/react'
import { chevronBack } from 'ionicons/icons'
import { NavigateTransactionParams } from '../../interfaces/interfaces'

export const TransactionsPage = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const { transactions, getTransactionsByIdAccount, setTransactions } =
    useContext(BankContext)

  const { idAccount, accountType, accountNumber, currentBalance } =
    location.state as NavigateTransactionParams

  const getTransactions = async () => {
    if (location.state?.idAccount) {
      await getTransactionsByIdAccount({
        idAccount,
      })
    }
  }

  const onBackToAccounts = () => {
    navigate('/accounts', { replace: true })
  }

  useEffect(() => {
    void getTransactions()

    return () => {
      setTransactions(undefined) // Clear transactions array from context at cleanup
    }
  }, [])

  return (
    <div className='container transactionsContainer'>
      <div className='returnArrow mb-4' onClick={onBackToAccounts}>
        <IonIcon icon={chevronBack} size={'medium'} className='ionicon' />
        <span className='returnText'>Return to Accounts</span>
      </div>

      <h2>Transactions</h2>
      <hr />
      <div className='accountsContainer mt-4'>
        <>
          <h5>
            {accountType === 'saving' ? 'SAVING' : 'CHECKING'} ACCOUNT TRANSFERS
          </h5>
          <span>
            <b>Account Number:</b> {accountNumber}
          </span>
          <br />

          <span>
            <b>Current balance:</b> {currentBalance} USD
          </span>
        </>

        <table className='table table-hover text-center mt-3'>
          <thead className='table-dark'>
            <tr>
              <th>Receiver</th>
              <th>Amount</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {transactions && transactions.length > 0 ? (
              transactions.map((transaction) => (
                <tr className='tableRow' key={transaction.idTransaction}>
                  <td>{transaction.receiver}</td>
                  <td>{transaction.amount} USD</td>
                  <td>
                    {new Date(transaction.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))
            ) : transactions && transactions.length === 0 ? (
              <tr className='tableRow' onClick={onBackToAccounts}>
                <td colSpan={4}>The selected account has no transactions</td>
              </tr>
            ) : (
              <tr className='tableRow' onClick={onBackToAccounts}>
                <td colSpan={4}>Please select an account</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
