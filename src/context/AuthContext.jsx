import { createContext, useContext, useState } from 'react'

const AuthContext = createContext(null)

// Mock admin credentials
const ADMIN_EMAIL    = 'admin@beavertown.in'
const ADMIN_PASSWORD = 'admin123'

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try { return JSON.parse(localStorage.getItem('bt_user')) } catch { return null }
  })

  const login = (email, password) => {
    // Admin check
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      const u = { email, name: 'Admin', role: 'admin' }
      localStorage.setItem('bt_user', JSON.stringify(u))
      setUser(u)
      return { ok: true, role: 'admin' }
    }
    // Mock user login — accept any email with password ≥ 6 chars
    const saved = JSON.parse(localStorage.getItem('bt_users') || '[]')
    const found = saved.find(u => u.email === email && u.password === password)
    if (found) {
      const u = { email: found.email, name: found.name, role: 'user' }
      localStorage.setItem('bt_user', JSON.stringify(u))
      setUser(u)
      return { ok: true, role: 'user' }
    }
    return { ok: false, error: 'Invalid email or password.' }
  }

  const signup = (name, email, password) => {
    const saved = JSON.parse(localStorage.getItem('bt_users') || '[]')
    if (saved.find(u => u.email === email)) {
      return { ok: false, error: 'Email already registered.' }
    }
    const newUser = { name, email, password }
    localStorage.setItem('bt_users', JSON.stringify([...saved, newUser]))
    const u = { email, name, role: 'user' }
    localStorage.setItem('bt_user', JSON.stringify(u))
    setUser(u)
    return { ok: true, role: 'user' }
  }

  const logout = () => {
    localStorage.removeItem('bt_user')
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
