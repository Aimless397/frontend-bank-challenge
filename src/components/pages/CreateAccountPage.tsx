/* eslint-disable @typescript-eslint/no-misused-promises */
import { ChangeEvent, FormEvent, useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { IonIcon } from '@ionic/react'
import { chevronBack } from 'ionicons/icons'

import { BankContext } from '../../context/BankContext'
import { useForm } from '../../hooks/useForm'
import { InputForm } from '../atoms/InputForm'

const initialFormState = {
  accounttype: 'saving',
  currentbalance: '0',
}

export const CreateAccountPage = () => {
  const { setSidebarItem, createAccount, errorMessage } =
    useContext(BankContext)

  const { accounttype, currentbalance, onInputChange, onResetForm } =
    useForm(initialFormState)

  const navigate = useNavigate()

  const onCreateAccount = async (
    event: FormEvent<HTMLFormElement> | ChangeEvent<HTMLSelectElement>
  ): Promise<void> => {
    try {
      event.preventDefault()

      await createAccount({
        accountType: accounttype,
        currentBalance: Number(currentbalance),
      })
      onBackToAccounts()
    } catch (error) {
      console.log(error)
    }
  }

  const onClearForm = () => {
    onResetForm()
  }

  const onBackToAccounts = () => {
    navigate('/accounts', { replace: true })
  }

  useEffect(() => {
    setSidebarItem({ sidebarItem: 'Accounts' })
  }, [])

  return (
    <div className='container transactionsContainer'>
      <div className='returnArrow mb-4' onClick={onBackToAccounts}>
        <IonIcon icon={chevronBack} size={'medium'} className='ionicon' />
        <span className='returnText'>Return to Accounts</span>
      </div>

      <h2>Create Account</h2>
      <hr />
      <div className='row justify-content-center'>
        <div className='col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6 p-3'>
          <form onSubmit={onCreateAccount}>
            <label htmlFor='accountType' className='fw-bold'>
              Account Type
            </label>
            <select
              value={accounttype}
              id={'accountType'}
              name={'accounttype'}
              onChange={(event: ChangeEvent<HTMLSelectElement>) =>
                onInputChange(event)
              }
              className='form-control'
            >
              <option value='saving'>Saving</option>
              <option value='checking'>Checking</option>
            </select>

            <InputForm
              label={'Current Balance'}
              value={currentbalance}
              onInputChange={onInputChange}
              type={'number'}
              min={'0'}
            />

            {errorMessage && (
              <span className='text-danger'>{errorMessage}</span>
            )}

            <div className='mt-3'>
              <div>
                <button className='btn btn-success'>Create Account</button>
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
