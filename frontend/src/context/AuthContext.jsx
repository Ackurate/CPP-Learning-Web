import { createContext, useContext, useMemo, useState } from 'react'
import * as authService from '../services/authService.js'

const AuthContext = createContext(null)
const SESSION_KEY = 'cpp_auth_session'

function readStoredSession() {
  for (const storage of [localStorage, sessionStorage]) {
    try {
      const session = JSON.parse(storage.getItem(SESSION_KEY) || 'null')
      if (session?.user && session?.token) return session
    } catch {
      storage.removeItem(SESSION_KEY)
    }
  }

  return null
}

function saveSession(session, remember) {
  const destination = remember ? localStorage : sessionStorage
  const otherStorage = remember ? sessionStorage : localStorage
  destination.setItem(SESSION_KEY, JSON.stringify(session))
  otherStorage.removeItem(SESSION_KEY)
}

export function AuthProvider({ children }) {
  const [session, setSession] = useState(readStoredSession)
  const user = session?.user ?? null
  const isLoading = false

  async function login(credentials, remember = false) {
    const session = await authService.login(credentials)
    saveSession(session, remember)
    setSession(session)
    return session
  }

  async function register(details) {
    const session = await authService.register(details)
    // Đăng ký tự đăng nhập trong phiên hiện tại, không tự ghi nhớ trên thiết bị.
    saveSession(session, false)
    setSession(session)
    return session
  }

  async function logout() {
    await authService.logout()
    setSession(null)
  }

  const value = useMemo(() => ({
    user,
    isAuthenticated: Boolean(user),
    isLoading,
    login,
    register,
    logout,
  }), [user, isLoading])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

// oxlint-disable-next-line react/only-export-components
export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth cần được dùng bên trong AuthProvider.')
  return context
}