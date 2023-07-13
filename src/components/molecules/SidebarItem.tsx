import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { BankContext } from '../../context/BankContext'

interface SidebarItemProps {
  textItem: string
  onLogout?: () => void
  route?: string
}

export const SidebarItem = ({
  textItem,
  onLogout,
  route,
}: SidebarItemProps) => {
  const { sidebarItemSelected, setSidebarItem } = useContext(BankContext)

  const navigate = useNavigate()
  const onClickSidebarItem = (sidebarItem: string) => {
    setSidebarItem({ sidebarItem })
    if (route) navigate(route)
  }

  return (
    <>
      <div
        className={`buttonSidebarItem ${
          sidebarItemSelected === textItem && textItem !== 'Logout'
            ? 'buttonSidebarItemActive'
            : ''
        }
          ${textItem === 'Logout' ? 'logoutItem' : ''}`}
        onClick={() => {
          textItem === 'Logout' && onLogout
            ? onLogout()
            : onClickSidebarItem(textItem)
        }}
      >
        <span className='itemText'>{textItem}</span>
      </div>
    </>
  )
}
