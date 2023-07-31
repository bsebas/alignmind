import { useApp } from '@/hooks/useApp'
import { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'

export function SignLayoutPage(): JSX.Element {
  const navigate = useNavigate()
  const { credential, userId } = useApp()

  useEffect(() => {
    if (credential != null && userId != null) {
      navigate('/', { replace: true })
    }
  }, [])

  return <Outlet />
}
