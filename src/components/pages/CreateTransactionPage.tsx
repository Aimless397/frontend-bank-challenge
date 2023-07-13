/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-misused-promises */
import { ChangeEvent, FormEvent, useContext, useEffect } from 'react'
import { BankContext } from '../../context/BankContext'
import { useForm } from '../../hooks/useForm'
import { InputForm } from '../atoms/InputForm'
import { useNavigate } from 'react-router-dom'

const initialFormState = {
  transmitter: '',
  receiver: '',
  amount: '0',
}

export const CreateTransactionPage = () => {
  const {
    setSidebarItem,
    getAccounts,
    accounts,
    createTransaction,
    errorMessage,
    clearErrorMessage,
  } = useContext(BankContext)

  const { transmitter, receiver, amount, onInputChange, onResetForm } =
    useForm(initialFormState)

  const navigate = useNavigate()

  const onCreateTransaction = async (
    event: FormEvent<HTMLFormElement> | ChangeEvent<HTMLSelectElement>
  ): Promise<void> => {
    try {
      event.preventDefault()

      await createTransaction({
        transmitter,
        receiver,
        amount: Number(amount),
      })

      onCreateTransfer()
    } catch (error) {
      setTimeout(() => {
        clearErrorMessage()
      }, 2000)
    }
  }

  const fetchAccounts = async () => {
    await getAccounts()
  }

  const onClearForm = () => {
    onResetForm()
  }

  const onCreateTransfer = () => {
    if (!errorMessage) navigate('/accounts', { replace: true })
  }

  useEffect(() => {
    void fetchAccounts()
  }, [])

  useEffect(() => {
    setSidebarItem({ sidebarItem: 'Transfers' })
  }, [])

  return (
    <div className='container mt-5'>
      <h2>Create Transfer</h2>
      <hr />
      <div className='row justify-content-center'>
        <div className='col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6 p-3'>
          <form onSubmit={onCreateTransaction}>
            <label htmlFor='transmitter' className='fw-bold'>
              From
            </label>
            <select
              value={transmitter}
              id={'transmitter'}
              name={'transmitter'}
              onChange={(event: ChangeEvent<HTMLSelectElement>) =>
                onInputChange(event)
              }
              className='form-control'
              required
            >
              <option value={''} disabled className='weight-bolder'>
                - Select an account -
              </option>
              {accounts?.map((account) => {
                if (+account.currentBalance > 0) {
                  return (
                    <option
                      key={account.idAccount}
                      value={account.accountNumber}
                    >
                      {account.accountNumber} - {account.accountType} - (
                      {account.currentBalance} USD)
                    </option>
                  )
                }
              })}
            </select>

            <InputForm
              label={'Receiver'}
              value={receiver}
              onInputChange={onInputChange}
            />

            <InputForm
              label={'Amount'}
              value={amount}
              onInputChange={onInputChange}
              type={'number'}
              min={'0'}
            />

            {errorMessage && (
              <span className='text-danger'>{errorMessage}</span>
            )}

            <div className='mt-3'>
              <div>
                <button className='btn btn-success'>Confirm</button>
                <input
                  type='button'
                  className='btn btn-secondary ms-1'
                  onClick={onClearForm}
                  value={'Clear'}
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
