import React, { useState } from 'react'
import { useAuth } from '../../contexts/AuthContext'

export default function LoginForm() {
  const { signIn } = useAuth()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)

    const form = e.target as HTMLFormElement
    const email = (form.elements.namedItem('email') as HTMLInputElement).value
    const password = (form.elements.namedItem('password') as HTMLInputElement).value

    if (!email || !password) {
      setError('Please provide email and password')
      setLoading(false)
      return
    }

    const res = await signIn(email, password)
    setLoading(false)
    if (res.error) setError(res.error)
    else window.location.replace('/dashboard')
  }

  return (
    <form onSubmit={handleSubmit}>
      <input name="email" type="email" placeholder="Email" required />
      <input name="password" type="password" placeholder="Password" required minLength={8} />
      {error && <div style={{color:'red'}}>{error}</div>}
      <button type="submit" disabled={loading}>{loading ? 'Signing In...' : 'Login'}</button>
    </form>
  )
}