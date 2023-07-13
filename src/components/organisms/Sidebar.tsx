/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { AuthContext } from '../../context/AuthContext'
import { SidebarItem } from '../molecules/SidebarItem'
import { useContext } from 'react'

export const Sidebar = () => {
  const { logout } = useContext(AuthContext)

  const onLogout = () => {
    logout()
  }

  return (
    <div className='col-4 col-sm-4 col-md-3 col-lg-3 col-xl-3 col-xxl-2 pe-0'>
      <div className='sidebar bg-dark text-white'>
        <div className='contentSidebar'>
          <div className='sidebarTopSection'>
            <div className='d-flex align-items-center justify-content-center'>
              <h3 className='text-center'>Tekbees Bank</h3>
            </div>
            <hr />
            <br />

            <SidebarItem textItem={'Accounts'} route={'/accounts'} />
            <SidebarItem textItem={'Transfers'} route={'/create-transaction'} />
            <SidebarItem textItem={'Profile'} route={'/profile'} />
          </div>
          <div className='sidebarBottomSection'>
            <SidebarItem textItem={'Logout'} onLogout={onLogout} />
          </div>
        </div>
      </div>
    </div>
  )
}
