import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import { Navigate } from 'react-router-dom'
import { HOCProps } from '../interfaces/interfaces'

export const PrivateRoute = ({ children }: HOCProps) => {
  const { status } = useContext(AuthContext)

  return status === 'authenticated' ? children : <Navigate to='/auth/login' />
}
