import { useState } from 'react'
import LandingPage from './components/LandingPage/LandingPage.jsx'
import Dashboard   from './components/Dashboard/Dashboard.jsx'

export default function App() {
  const [page, setPage] = useState('landing')

  if (page === 'landing')
    return <LandingPage onEnter={() => setPage('dashboard')} />

  return <Dashboard onLogoClick={() => setPage('landing')} />
}
