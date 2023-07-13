/* eslint-disable @typescript-eslint/no-misused-promises */
import { FormEvent, useContext } from 'react'
import { useForm } from '../../hooks/useForm'
import { AuthContext } from '../../context/AuthContext'
import { Link } from 'react-router-dom'
import { InputForm } from '../atoms/InputForm'

const initialFormState = {
  username: '',
  email: '',
  password: '',
  name: '',
  lastname: '',
}

export const RegisterPage = () => {
  const { register, errorMessage } = useContext(AuthContext)
  const {
    username,
    email,
    password,
    name,
    lastname,
    onInputChange,
    onResetForm,
  } = useForm(initialFormState)

  const onRegister = async (
    event: FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault()
    try {
      await register({ username, email, password, name, lastname })
    } catch (error) {
      console.log(error)
    }
  }

  const onClearForm = () => {
    onResetForm()
  }

  return (
    <div className='login bg-dark'>
      <div className='container'>
        <div className='row justify-content-center'>
          <div className='col-12 col-sm-10 col-md-8 col-lg-6 col-xl-6 col-xxl-6 p-3'>
            <div className='card bg-white text-dark'>
              <div className='card-body'>
                <h2 className='card-title mb-4'>Register</h2>
                <form onSubmit={onRegister}>
                  <InputForm
                    label={'Username'}
                    value={username}
                    onInputChange={onInputChange}
                  />

                  <InputForm
                    label={'Email'}
                    value={email}
                    type={'email'}
                    onInputChange={onInputChange}
                  />

                  <InputForm
                    label={'Password'}
                    value={password}
                    onInputChange={onInputChange}
                  />

                  <InputForm
                    label={'Name'}
                    value={name}
                    onInputChange={onInputChange}
                  />

                  <InputForm
                    label={'Lastname'}
                    value={lastname}
                    onInputChange={onInputChange}
                  />

                  {errorMessage && (
                    <span className='text-danger'>{errorMessage}</span>
                  )}

                  <div className='buttonContainer mt-3'>
                    <div>
                      <button className='btn btn-success'>
                        Create Account
                      </button>
                      <input
                        type='button'
                        className='btn btn-secondary ms-1'
                        onClick={onClearForm}
                        value={'Clear'}
                      />
                    </div>

                    <small>
                      <span>Have an account? </span>
                      <Link to={'/auth/login'}>Sign In</Link>
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
