export type AuthRole = 'admin' | 'user'

export interface AuthSession {
  email: string
  role: AuthRole
}

const AUTH_STORAGE_KEY = 'pyg_auth'

const canUseStorage = () => typeof window !== 'undefined' && Boolean(window.localStorage)

export const getAuthSession = (): AuthSession | null => {
  if (!canUseStorage()) {
    return null
  }

  const raw = window.localStorage.getItem(AUTH_STORAGE_KEY)
  if (!raw) {
    return null
  }

  try {
    const parsed = JSON.parse(raw) as AuthSession
    if (!parsed?.email || !parsed?.role) {
      return null
    }
    return parsed
  } catch {
    return null
  }
}

export const setAuthSession = (session: AuthSession) => {
  if (!canUseStorage()) {
    return
  }
  window.localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(session))
  window.dispatchEvent(new Event('authchange'))
}

export const clearAuthSession = () => {
  if (!canUseStorage()) {
    return
  }
  window.localStorage.removeItem(AUTH_STORAGE_KEY)
  window.dispatchEvent(new Event('authchange'))
}

export const isAdminSession = (session: AuthSession | null) => session?.role === 'admin'

export const authStorageKey = AUTH_STORAGE_KEY
