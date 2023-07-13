/* eslint-disable @typescript-eslint/no-misused-promises */
import { FormEvent, useContext } from 'react'
import { Link } from 'react-router-dom'

import { useForm } from '../../hooks/useForm'
import { AuthContext } from '../../context/AuthContext'
import { InputForm } from '../atoms/InputForm'

export const LoginPage = () => {
  const { login, errorMessage } = useContext(AuthContext)
  const { email, password, onInputChange } = useForm({
    email: '',
    password: '',
  })

  const onLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    try {
      await login({ email, password })
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='login bg-dark'>
      <div className='container'>
        <div className='row justify-content-center'>
          <div className='col-12 col-sm-7 col-md-6 col-lg-5 col-xl-4 col-xxl-4 p-3'>
            <div className='card bg-white text-dark'>
              <div className='card-body'>
                <h2 className='card-title mb-4'>Login</h2>
                <form
                  onSubmit={(event: FormEvent<HTMLFormElement>) =>
                    onLogin(event)
                  }
                >
                  <InputForm
                    label={'Email'}
                    value={email}
                    type={'email'}
                    onInputChange={onInputChange}
                  />

                  <InputForm
                    label={'Password'}
                    value={password}
                    type={'password'}
                    onInputChange={onInputChange}
                  />

                  {errorMessage && (
                    <span className='text-danger'>{errorMessage}</span>
                  )}

                  <div className='buttonContainer mt-3'>
                    <button className='btn btn-primary'>Login</button>

                    <small>
                      <span>Don't have an account yet? </span>
                      <Link to={'/auth/register'}>Sign Up</Link>
                    </small>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
