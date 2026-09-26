import { useState } from 'react'
import { AuthProvider, useAuth } from './context/AuthContext.jsx'
import LandingPage from './components/LandingPage/LandingPage.jsx'
import Auth        from './components/Auth/Auth.jsx'
import Dashboard   from './components/Dashboard/Dashboard.jsx'
import Admin       from './components/Admin/Admin.jsx'

function AppRoutes() {
  const { user, logout } = useAuth()
  const [page, setPage]  = useState('landing')

  const go      = (p) => setPage(p)
  const success = (role) => go(role === 'admin' ? 'admin' : 'dashboard')
  const doLogout = () => { logout(); go('landing') }

  // If already logged in, skip auth on landing tap
  const enterLanding = () => {
    if (user) go(user.role === 'admin' ? 'admin' : 'dashboard')
    else go('signin')
  }

  if (page === 'landing')
    return <LandingPage onEnter={enterLanding} />

  if (page === 'signin' || page === 'signup')
    return <Auth initialMode={page} onSuccess={success} onBack={() => go('landing')} />

  if (page === 'admin')
    return <Admin onLogout={doLogout} />

  return (
    <Dashboard
      onLogoClick={() => go('landing')}
      onSignIn={()   => go('signin')}
      onLogout={doLogout}
    />
  )
}

export default function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  )
}
