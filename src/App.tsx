import './app.css'
import { AuthProvider } from './context/AuthProvider'
import { AppRouter } from './router/AppRouter'
import { BankProvider } from './context/BankProvider'

export const App = () => {
  return (
    <AuthProvider>
      <BankProvider>
        <AppRouter />
      </BankProvider>
    </AuthProvider>
  )
}
