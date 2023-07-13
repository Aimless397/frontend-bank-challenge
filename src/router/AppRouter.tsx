import { Navigate, Route, Routes } from 'react-router-dom'

import { PublicRoute } from './PublicRoute'
import { PrivateRoute } from './PrivateRoute'
import { LoginPage } from '../components/pages/LoginPage'
import { RegisterPage } from '../components/pages/RegisterPage'
import { Sidebar } from '../components/organisms/Sidebar'
import { ProfilePage } from '../components/pages/ProfilePage'
import { CreateTransactionPage } from '../components/pages/CreateTransactionPage'
import { TransactionsPage } from '../components/pages/TransactionsPage'
import { CreateAccountPage } from '../components/pages/CreateAccountPage'
import { AccountsPage } from '../components/pages/AccountsPage'

import '../styles/login.css'
import '../styles/sidebar.css'
import '../styles/container.css'

export const AppRouter = () => {
  return (
    <>
      <Routes>
        <Route
          path='auth/*'
          element={
            <PublicRoute>
              <Routes>
                <Route path='login/*' element={<LoginPage />} />
                <Route path='register/*' element={<RegisterPage />} />
                <Route path='*' element={<Navigate to='/login' replace />} />
              </Routes>
            </PublicRoute>
          }
        />

        <Route
          path='/*'
          element={
            <PrivateRoute>
              <div className='app'>
                <div className='row g-0 appRow'>
                  <Sidebar />
                  <div className='col mainContainer ps-0'>
                    <Routes>
                      <Route path='accounts' element={<AccountsPage />} />
                      <Route
                        path='accounts/*'
                        element={<Navigate to='/accounts' replace />}
                      />

                      <Route
                        path='create-account'
                        element={<CreateAccountPage />}
                      />
                      <Route
                        path='create-account/*'
                        element={<Navigate to='/create-account' replace />}
                      />

                      <Route
                        path='transactions'
                        element={<TransactionsPage />}
                      />
                      <Route
                        path='transactions/*'
                        element={<Navigate to='/transactions' replace />}
                      />

                      <Route
                        path='create-transaction'
                        element={<CreateTransactionPage />}
                      />
                      <Route
                        path='create-transaction/*'
                        element={<Navigate to='/create-transaction' replace />}
                      />

                      <Route path='profile' element={<ProfilePage />} />
                      <Route
                        path='profile/*'
                        element={<Navigate to='/profile' replace />}
                      />

                      <Route
                        path='*'
                        element={<Navigate to='/accounts' replace />}
                      />
                    </Routes>
                  </div>
                </div>
              </div>
            </PrivateRoute>
          }
        />
      </Routes>
    </>
  )
}
