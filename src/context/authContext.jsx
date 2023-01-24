import { createContext } from 'react'
import PropTypes from 'prop-types'

import { useLocalStorage } from '../hooks/useLocalStorage'
import axios from '../api/axios'

const AuthContext = createContext()

AuthProvider.propTypes = {
  children: PropTypes.node
}

function AuthProvider ({ children }) {
  const [credential, setCredential] = useLocalStorage('credentials_token')
  const [userId, setUserId] = useLocalStorage('userInfo_userId')
  const [userInfo, setUserInfo] = useLocalStorage('userInfo_userInfo')

  const loginAction = async (email, password, error) => {
    try {
      const response = await axios.post('auth/login',
        JSON.stringify({
          email, password
        }))

      const data = response?.data.data
      setCredential(data.login_session)
      setUserId(data.id)
    } catch (err) {
      if (!err.response) {
        console.log('No server response')
      } else if (err.response?.status === 400) {
        console.log('Missing email or password')
      } else if (err.response?.status === 401) {
        console.log('Unauthorized')
      } else {
        console.log('Login failed')
      }
    }
  }

  return <AuthContext.Provider value={{
    credential,
    setCredential,
    setUserId,
    userId,
    setUserInfo,
    userInfo,
    loginAction
  }}>
    {children}
  </AuthContext.Provider>
}

export { AuthProvider, AuthContext }
