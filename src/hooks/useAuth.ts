import { useState, useEffect } from 'react'
import { blink } from '../blink/client'
import type { User } from '@blinkdotnew/sdk'

export function useAuth() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = blink.auth.onAuthStateChanged((state) => {
      setUser(state.user)
      setLoading(state.isLoading)
    })
    return unsubscribe
  }, [])

  return { user, loading, isAuthenticated: !!user }
}
