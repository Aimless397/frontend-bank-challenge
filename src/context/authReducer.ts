import { IUser } from '../interfaces/interfaces'

export interface AuthState {
  status: 'checking' | 'authenticated' | 'not-authenticated'
  token: string | null
  errorMessage: string
  user: IUser | null
}

type AuthAction =
  | { type: 'loginRegister'; payload: { token: string; user: IUser } }
  | { type: 'addError'; payload: string }
  | { type: 'removeError' }
  | { type: 'notAuthenticated' }
  | { type: 'logout' }

export const authReducer = (
  state: AuthState,
  action: AuthAction
): AuthState => {
  switch (action.type) {
    case 'loginRegister':
      return {
        ...state,
        errorMessage: '',
        status: 'authenticated',
        token: action.payload.token,
        user: action.payload.user,
      }

    case 'addError':
      return {
        ...state,
        errorMessage: action.payload,
        status: 'not-authenticated',
        token: null,
        user: null,
      }

    case 'removeError':
      return {
        ...state,
        errorMessage: '',
      }

    case 'logout':
    case 'notAuthenticated':
      return {
        ...state,
        status: 'not-authenticated',
        token: null,
        user: null,
      }

    default:
      return state
  }
}
