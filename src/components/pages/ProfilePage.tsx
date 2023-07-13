/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { useContext, useEffect } from 'react'

import { BankContext } from '../../context/BankContext'
import { User } from '../../interfaces/interfaces'

export const ProfilePage = () => {
  const { setSidebarItem, getUserById, user } = useContext(BankContext)

  const fetchAccount = async () => {
    const user = localStorage.getItem('user')

    if (user) {
      const userParsed: User = JSON.parse(user)
      await getUserById({ idUser: userParsed.idUser })
    }
  }

  useEffect(() => {
    void fetchAccount()
  }, [])

  useEffect(() => {
    setSidebarItem({ sidebarItem: 'Profile' })
  }, [])

  return (
    <div className='container mt-5'>
      <h2>Your Profile</h2>
      <hr />

      <div className='mt-5'>
        {user && (
          <div className='row d-flex align-items-center justify-content-center'>
            <div className='col-12 col-sm-10 col-md-8 col-lg-7 col-xl-6 col-xxl-6'>
              <table className='table table-hover profileTable'>
                <tbody>
                  <tr>
                    <th>Username</th>
                    <td className='text-end'>{user.username}</td>
                  </tr>
                  <tr>
                    <th>Email</th>
                    <td className='text-end'>{user.email}</td>
                  </tr>
                  <tr>
                    <th>Name</th>
                    <td className='text-end'>{user.name}</td>
                  </tr>
                  <tr>
                    <th>Lastname</th>
                    <td className='text-end'>{user.lastname}</td>
                  </tr>
                  <tr>
                    <th>Active since</th>
                    <td className='text-end'>
                      {new Date(user.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
