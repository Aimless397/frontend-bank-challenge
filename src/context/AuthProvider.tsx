import { useReducer } from 'react'
import { AuthContext } from './AuthContext'
import { AuthState, authReducer } from './authReducer'
import {
  ErrorResponse,
  HOCProps,
  LoginRequestBody,
  LoginResponse,
  RegisterRequestBody,
} from '../interfaces/interfaces'
import bankApi from '../services/api'
import { AxiosError } from 'axios'

const initialState: AuthState = {
  status:
    localStorage.getItem('user') && localStorage.getItem('auth-token')
      ? 'authenticated'
      : 'checking',
  token: null,
  errorMessage: '',
  user: null,
}

export const AuthProvider = ({ children }: HOCProps) => {
  const [authState, dispatch] = useReducer(authReducer, initialState)

  const login = async ({
    email,
    password,
  }: LoginRequestBody): Promise<void> => {
    try {
      const { data } = await bankApi.post<LoginResponse>('/auth/login', {
        email,
        password,
      })
      const { user, token } = data

      localStorage.setItem('user', JSON.stringify(user))
      localStorage.setItem('auth-token', token)

      dispatch({
        type: 'loginRegister',
        payload: {
          token,
          user,
        },
      })
    } catch (error: unknown) {
      let errorResponse: ErrorResponse
      if (error instanceof AxiosError) {
        errorResponse = error.response?.data as ErrorResponse
      } else {
        errorResponse = { msg: String(error) }
      }

      dispatch({
        type: 'addError',
        payload: String(errorResponse.msg) || 'Login failed',
      })
    }
  }

  const register = async ({
    username,
    email,
    password,
    name,
    lastname,
  }: RegisterRequestBody): Promise<void> => {
    try {
      const { data } = await bankApi.post<LoginResponse>('/auth/register', {
        username,
        email,
        password,
        name,
        lastname,
      })
      const { user, token } = data

      localStorage.setItem('user', JSON.stringify(user))
      localStorage.setItem('auth-token', token)

      dispatch({
        type: 'loginRegister',
        payload: {
          token,
          user,
        },
      })
    } catch (error: unknown) {
      let errorResponse: ErrorResponse
      if (error instanceof AxiosError) {
        errorResponse = error.response?.data as ErrorResponse
      } else {
        errorResponse = { msg: String(error) }
      }

      dispatch({
        type: 'addError',
        payload: String(errorResponse.msg) || 'Register failed',
      })
    }
  }

  const logout = () => {
    localStorage.removeItem('user')
    localStorage.removeItem('auth-token')

    dispatch({ type: 'logout' })
  }

  const removeError = () => {
    dispatch({ type: 'removeError' })
  }

  return (
    <AuthContext.Provider
      value={{ ...authState, login, register, logout, removeError }}
    >
      {children}
    </AuthContext.Provider>
  )
}
