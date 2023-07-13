import { createContext } from 'react'
import {
  IUser,
  LoginRequestBody,
  RegisterRequestBody,
} from '../interfaces/interfaces'

type AuthContextProps = {
  status: 'checking' | 'authenticated' | 'not-authenticated'
  errorMessage: string
  token: string | null
  user: IUser | null
  login: (loginInput: LoginRequestBody) => Promise<void>
  register: (registerInput: RegisterRequestBody) => Promise<void>
  logout: () => void
  removeError: () => void
}

export const AuthContext = createContext({} as AuthContextProps)
