'use client'

import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from './supabase'

interface User {
  id: string
  email: string
  user_metadata: {
    full_name?: string
    avatar_url?: string
    plan?: string
    streak?: number
    last_check_in?: string
    goal?: string
    level?: string
  }
}

interface AuthContextType {
  user: User | null
  loading: boolean
  signIn: (email: string, pass: string) => Promise<void>
  signUp: (email: string, pass: string, name: string) => Promise<void>
  signOut: () => Promise<void>
  checkIn: () => Promise<void>
  updateMetadata: (metadata: Partial<User['user_metadata']>) => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

const mapUser = (u: any): User => ({
  id: u.id,
  email: u.email,
  user_metadata: {
    full_name: u.user_metadata?.full_name,
    avatar_url: u.user_metadata?.avatar_url,
    plan: u.user_metadata?.plan ?? 'Free',
    streak: u.user_metadata?.streak ?? 0,
    last_check_in: u.user_metadata?.last_check_in,
    goal: u.user_metadata?.goal,
    level: u.user_metadata?.level,
  },
})

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const init = async () => {
      try {
        const { data } = await supabase.auth.getUser()
        if (data.user) {
          const mapped = mapUser(data.user)
          setUser(mapped)
          localStorage.setItem('hp_user', JSON.stringify(mapped))
        }
      } finally {
        setLoading(false)
      }
    }

    init()

    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        const mapped = mapUser(session.user)
        setUser(mapped)
        localStorage.setItem('hp_user', JSON.stringify(mapped))
      } else {
        setUser(null)
        localStorage.removeItem('hp_user')
      }
    })

    return () => {
      sub.subscription.unsubscribe()
    }
  }, [])

  const signIn = async (email: string, pass: string) => {
    setLoading(true)
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password: pass,
      })

      if (error) throw new Error(error.message)

      if (data.user) {
        const mapped = mapUser(data.user)
        setUser(mapped)
        localStorage.setItem('hp_user', JSON.stringify(mapped))
        router.push('/dashboard')
      }
    } finally {
      setLoading(false)
    }
  }

  const signUp = async (email: string, pass: string, name: string) => {
    setLoading(true)
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password: pass,
        options: {
          data: {
            full_name: name,
            plan: 'Free',
            streak: 0,
          },
        },
      })

      if (error) throw new Error(error.message)

      if (data.user) {
        const mapped = mapUser(data.user)
        setUser(mapped)
        localStorage.setItem('hp_user', JSON.stringify(mapped))
        router.push('/dashboard')
      }
    } finally {
      setLoading(false)
    }
  }

  const signOut = async () => {
    setLoading(true)
    try {
      await supabase.auth.signOut()
      setUser(null)
      localStorage.removeItem('hp_user')
      router.push('/login')
    } finally {
      setLoading(false)
    }
  }

  const updateMetadata = async (metadata: Partial<User['user_metadata']>) => {
    if (!user) return

    setLoading(true)
    try {
      const merged = { ...user.user_metadata, ...metadata }
      const { data, error } = await supabase.auth.updateUser({ data: merged })

      if (error) throw new Error(error.message)

      if (data.user) {
        const mapped = mapUser(data.user)
        setUser(mapped)
        localStorage.setItem('hp_user', JSON.stringify(mapped))
      }
    } finally {
      setLoading(false)
    }
  }

  // ✅ FIXED checkIn — streak properly increment hoga
  const checkIn = async () => {
    if (!user) return

    const today = new Date()
    const todayStr = today.toDateString()

    const lastCheckIn = user.user_metadata?.last_check_in
    const lastCheckInStr = lastCheckIn
      ? new Date(lastCheckIn).toDateString()
      : null

    // Agar aaj already check-in ho chuka hai toh kuch mat karo
    if (lastCheckInStr === todayStr) return

    const currentStreak = user.user_metadata?.streak ?? 0

    // Check karo kya kal check-in tha — agar tha toh streak +1, warna reset to 1
    let newStreak = 1
    if (lastCheckIn) {
      const yesterday = new Date()
      yesterday.setDate(yesterday.getDate() - 1)
      const yesterdayStr = yesterday.toDateString()

      if (lastCheckInStr === yesterdayStr) {
        // Consecutive day — streak badha do
        newStreak = currentStreak + 1
      } else {
        // Streak break ho gayi — reset
        newStreak = 1
      }
    }

    await updateMetadata({
      last_check_in: today.toISOString(),
      streak: newStreak,
    })
  }

  return (
    <AuthContext.Provider
      value={{ user, loading, signIn, signUp, signOut, checkIn, updateMetadata }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider')
  return ctx
}